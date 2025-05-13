use actix_web::{web, HttpResponse, Responder};
use crate::models::comments::*;
use crate::models::auth::User;
use crate::db::DbPool;

use serde::Deserialize;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.route("", web::get().to(get_comments))
       .route("", web::post().to(create_comment))
       .route("/{id}", web::get().to(get_comment))
       .route("/{id}", web::put().to(update_comment))
       .route("/{id}", web::delete().to(delete_comment))
       .route("/{id}/like", web::post().to(like_comment));
}

async fn get_comments(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    query: web::Query<GetCommentsQuery>,
) -> impl Responder {
    // Validar que se proporciona un post_id
    let post_id = match query.post_id {
        Some(id) => id,
        None => return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "Debe proporcionar un post_id"
        }))
    };
    
    // Consultar comentarios con información del autor y si el usuario actual ha dado like
    match sqlx::query!(
        r#"
        SELECT 
            c.id, c.content, c.created_at,
            c.likes_count,
            u.id as user_id, u.name, u.avatar,
            CASE WHEN cl.user_id IS NOT NULL THEN true ELSE false END as is_liked
        FROM comments c
        JOIN users u ON c.user_id = u.id
        LEFT JOIN comment_likes cl ON c.id = cl.comment_id AND cl.user_id = $1
        WHERE c.post_id = $2
        ORDER BY c.created_at DESC
        "#,
        user.id,
        post_id
    )
    .fetch_all(pool.get_ref())
    .await {
        Ok(records) => {
            // Mapear los resultados al formato que espera el frontend
            let comments: Vec<serde_json::Value> = records.into_iter().map(|record| {
                // Formatear la fecha correctamente
                let date_str = record.created_at
                    .map(|dt| dt.format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string())
                    .unwrap_or_else(|| chrono::Utc::now().to_rfc3339());
                
                serde_json::json!({
                    "id": record.id,
                    "content": record.content,
                    "author": {
                        "id": record.user_id,
                        "name": record.name,
                        "avatar": record.avatar
                    },
                    "date": date_str,
                    "likes": record.likes_count,
                    "isLiked": record.is_liked
                })
            }).collect();

            HttpResponse::Ok().json(serde_json::json!({
                "comments": comments,
                "total": comments.len()
            }))
        },
        Err(e) => {
            log::error!("Error al obtener comentarios: {}", e);
            HttpResponse::InternalServerError()
                .json(serde_json::json!({ "error": "Error al obtener comentarios" }))
        }
    }
}

async fn create_comment(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    comment: web::Json<CommentCreate>,
) -> impl Responder {
    // Validar que el contenido no esté vacío
    if comment.content.trim().is_empty() {
        return HttpResponse::BadRequest().json(serde_json::json!({
            "error": "El contenido del comentario no puede estar vacío"
        }));
    }
    
    // Validar que el post_id existe
    match sqlx::query!("SELECT 1 as exists FROM posts WHERE id = $1", comment.post_id)
        .fetch_optional(pool.get_ref())
        .await {
        Ok(Some(_)) => {},
        Ok(None) => {
            return HttpResponse::NotFound().json(serde_json::json!({
                "error": "El post no existe"
            }));
        },
        Err(e) => {
            log::error!("Error verificando post: {}", e);
            return HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Error al verificar el post"
            }));
        }
    }
    
    // Insertar el comentario
    match sqlx::query!(
        r#"
        INSERT INTO comments (post_id, user_id, content, created_at, likes_count)
        VALUES ($1, $2, $3, $4, 0)
        RETURNING id, content, created_at, likes_count
        "#,
        comment.post_id,
        user.id,
        comment.content,
        chrono::Utc::now().naive_utc()
    )
    .fetch_one(pool.get_ref())
    .await {
        Ok(record) => {
            // Actualizar el contador de comentarios en el post
            let _ = sqlx::query!(
                "UPDATE posts SET comments_count = comments_count + 1 WHERE id = $1",
                comment.post_id
            )
            .execute(pool.get_ref())
            .await;
            
            // Formatear la fecha
            let date_str = record.created_at
                .map(|dt| dt.format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string())
                .unwrap_or_else(|| chrono::Utc::now().to_rfc3339());
            
            // Devolver el comentario creado
            HttpResponse::Created().json(serde_json::json!({
                "id": record.id,
                "content": record.content,
                "author": {
                    "id": user.id,
                    "name": user.name,
                    "avatar": user.avatar
                },
                "date": date_str,
                "likes": record.likes_count,
                "isLiked": false
            }))
        },
        Err(e) => {
            log::error!("Error al crear comentario: {}", e);
            HttpResponse::InternalServerError().json(serde_json::json!({
                "error": "Error al crear el comentario"
            }))
        }
    }
}

async fn get_comment(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para obtener un comentario por ID
    HttpResponse::Ok().json(Comment::default())
}

async fn update_comment(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
    _comment: web::Json<CommentUpdate>,
) -> impl Responder {
    // Implementar la lógica para actualizar un comentario
    HttpResponse::Ok().json(Comment::default())
}

async fn delete_comment(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para eliminar un comentario
    HttpResponse::NoContent().finish()
}

async fn like_comment(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>,
) -> impl Responder {
    // Verificar si el comentario ya tiene like del usuario
    match sqlx::query!(
        "SELECT 1 as exists FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
        user.id,
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(_)) => {
            // El comentario ya tiene like, quitarlo
            match sqlx::query!(
                "DELETE FROM comment_likes WHERE user_id = $1 AND comment_id = $2",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Actualizar el contador de likes del comentario
                    let _ = sqlx::query!(
                        "UPDATE comments SET likes_count = likes_count - 1 WHERE id = $1",
                        *id
                    )
                    .execute(pool.get_ref())
                    .await;
                    
                    // Respuesta exitosa
                    HttpResponse::Ok().json(serde_json::json!({
                        "liked": false
                    }))
                },
                Err(e) => {
                    log::error!("Error al quitar like: {}", e);
                    HttpResponse::InternalServerError()
                        .json(serde_json::json!({ "error": "Error al quitar like" }))
                }
            }
        },
        Ok(None) => {
            // El comentario no tiene like, agregarlo
            match sqlx::query!(
                "INSERT INTO comment_likes (user_id, comment_id) VALUES ($1, $2)",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Actualizar el contador de likes del comentario
                    let _ = sqlx::query!(
                        "UPDATE comments SET likes_count = likes_count + 1 WHERE id = $1",
                        *id
                    )
                    .execute(pool.get_ref())
                    .await;
                    
                    // Respuesta exitosa
                    HttpResponse::Ok().json(serde_json::json!({
                        "liked": true
                    }))
                },
                Err(e) => {
                    log::error!("Error al dar like: {}", e);
                    HttpResponse::InternalServerError()
                        .json(serde_json::json!({ "error": "Error al dar like" }))
                }
            }
        },
        Err(e) => {
            log::error!("Error verificando like: {}", e);
            HttpResponse::InternalServerError()
                .json(serde_json::json!({ "error": "Error al verificar like" }))
        }
    }
}

#[derive(Deserialize)]
pub struct GetCommentsQuery {
    pub post_id: Option<i32>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
}
