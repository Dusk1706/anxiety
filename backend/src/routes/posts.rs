use actix_web::{web, HttpResponse, Responder};
use crate::models::posts::{Post, PostCreate, PostUpdate};
use crate::models::categories::{Category, Tag};
use crate::models::User;
use crate::db::DbPool;
use crate::utils::datetime::{datetime_to_utc, datetime_opt_to_utc, now_utc};
use chrono::{DateTime, Utc};
use log::error;
use serde::Deserialize;
use serde_json::json;
use sqlx::Row;

pub fn configure(cfg: &mut web::ServiceConfig) {
    // Definimos rutas explícitamente para el endpoint de posts
    cfg.route("", web::get().to(get_posts))
       .route("", web::post().to(create_post))
       .route("{id}", web::get().to(get_post))
       .route("{id}", web::put().to(update_post))
       .route("{id}", web::delete().to(delete_post))
       .route("categories", web::get().to(get_categories))
       .route("tags", web::get().to(get_tags))
       .route("{id}/like", web::post().to(like_post))
       .route("{id}/save", web::post().to(save_post));
}

pub async fn get_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>
) -> impl Responder {
    // Obtener post por ID con información de si el usuario lo ha dado like o guardado
    match sqlx::query!(r#"
        SELECT 
            p.id, p.title, p.content, p.category, p.created_at, p.updated_at,
            p.likes_count, p.comments_count,
            u.id as user_id, u.name, u.avatar,
            CASE WHEN pl.user_id IS NOT NULL THEN true ELSE false END as is_liked,
            CASE WHEN ps.user_id IS NOT NULL THEN true ELSE false END as is_saved
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN post_likes pl ON p.id = pl.post_id AND pl.user_id = $1
        LEFT JOIN post_saves ps ON p.id = ps.post_id AND ps.user_id = $1
        WHERE p.id = $2 AND u.is_active = true
        "#,
        user.id,
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(post)) => {
            // La created_at es ya un DateTime<Utc> (con zona horaria)
            let created_at_utc = match post.created_at {
                Some(dt) => datetime_to_utc(dt),
                None => now_utc() // Si es None, usamos la fecha actual
            };
            
            // La updated_at también es DateTime<Utc>
            let updated_at = datetime_opt_to_utc(post.updated_at);
            
            // Construir respuesta JSON
            // Obtener etiquetas (tags) asociadas con este post
            let tags = match sqlx::query!(r#"
                SELECT t.name
                FROM tags t
                JOIN post_tags pt ON t.id = pt.tag_id
                WHERE pt.post_id = $1
                "#,
                post.id
            )
            .fetch_all(pool.get_ref())
            .await {
                Ok(tags) => tags.into_iter().map(|t| t.name).collect::<Vec<String>>(),
                Err(_) => vec![] // Si hay error, devolver lista vacía
            };
            
            let post_json = json!({
                "id": post.id,
                "title": post.title,
                "content": post.content,
                "category": post.category,
                "author": {
                    "id": post.user_id,
                    "name": post.name,
                    "avatar": post.avatar,
                },
                "date": created_at_utc.to_rfc3339(),
                "updated_at": updated_at.map(|dt| dt.to_rfc3339()),
                "likes": post.likes_count,
                "comments": post.comments_count,
                "isLiked": post.is_liked,
                "isSaved": post.is_saved,
                "tags": tags,
            });
            
            HttpResponse::Ok().json(post_json)
        },
        Ok(None) => {
            HttpResponse::NotFound().json(json!({
                "error": "Post no encontrado"
            }))
        },
        Err(e) => {
            error!("Error al obtener el post: {}", e);
            HttpResponse::InternalServerError().json(json!({
                "error": "Error al obtener el post"
            }))
        }
    }
}

pub async fn get_categories() -> impl Responder {
    // Return some default categories for now
    let now = Utc::now();
    let categories = vec![
        Category { 
            id: 1, 
            name: String::from("Ansiedad"),
            description: Some(String::from("Categoría para temas relacionados con la ansiedad")),
            created_at: now,
            updated_at: now
        },
        Category { 
            id: 2, 
            name: String::from("Depresión"),
            description: Some(String::from("Categoría para temas relacionados con la depresión")),
            created_at: now,
            updated_at: now
        },
        Category { 
            id: 3, 
            name: String::from("Estrés"),
            description: Some(String::from("Categoría para temas relacionados con el estrés")),
            created_at: now,
            updated_at: now
        },
    ];
    HttpResponse::Ok().json(categories)
}

pub async fn get_tags() -> impl Responder {
    // Return some default tags for now
    let now = Utc::now();
    let tags = vec![
        Tag { 
            id: 1, 
            name: String::from("autoayuda"),
            description: Some(String::from("Etiqueta para contenido de autoayuda")),
            created_at: now,
            updated_at: now
        },
        Tag { 
            id: 2, 
            name: String::from("consejos"),
            description: Some(String::from("Etiqueta para consejos útiles")),
            created_at: now,
            updated_at: now
        },
        Tag { 
            id: 3, 
            name: String::from("experiencia"),
            description: Some(String::from("Etiqueta para experiencias personales")),
            created_at: now,
            updated_at: now
        },
    ];
    HttpResponse::Ok().json(tags)
}

#[derive(serde::Serialize)]
pub struct PostsResponse {
    posts: Vec<Post>,
}

pub async fn get_posts(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    _query: web::Query<GetPostsQuery>,
) -> impl Responder {
    // Consultar los posts con información del autor e información personalizada para el usuario actual
    match sqlx::query!(
        r#"
        SELECT 
            p.id, p.title, p.content, p.category, p.created_at, p.updated_at,
            p.likes_count, p.comments_count,
            u.id as user_id, u.name, u.avatar,
            CASE WHEN pl.user_id IS NOT NULL THEN true ELSE false END as is_liked,
            CASE WHEN ps.user_id IS NOT NULL THEN true ELSE false END as is_saved
        FROM posts p
        JOIN users u ON p.user_id = u.id
        LEFT JOIN post_likes pl ON p.id = pl.post_id AND pl.user_id = $1
        LEFT JOIN post_saves ps ON p.id = ps.post_id AND ps.user_id = $1
        WHERE u.is_active = true
        ORDER BY p.created_at DESC
        "#,
        user.id
    )
    .fetch_all(pool.get_ref())
    .await {
        Ok(records) => {
            // Mapear los resultados al formato que espera el frontend
            let posts: Vec<serde_json::Value> = records.into_iter().map(|record| {
                // Formatear la fecha correctamente
                let date_str = record.created_at
                    .map(|dt| dt.format("%Y-%m-%dT%H:%M:%S%.3fZ").to_string())
                    .unwrap_or_else(|| chrono::Utc::now().to_rfc3339());
                
                json!({
                    "id": record.id,
                    "title": record.title,
                    "content": record.content,
                    "author": {
                        "id": record.user_id,
                        "name": record.name,
                        "avatar": record.avatar
                    },
                    "date": date_str,
                    "likes": record.likes_count,
                    "comments": record.comments_count,
                    "category": record.category,
                    "tags": [], // Por ahora vacío, se puede poblar con otra consulta si es necesario
                    "isLiked": record.is_liked,
                    "isSaved": record.is_saved
                })
            }).collect();

            // Crear la respuesta con paginación
            let response = json!({
                "posts": posts,
                "total": posts.len(),
                "page": 1,
                "per_page": 10
            });

            HttpResponse::Ok()
                .content_type("application/json")
                .json(response)
        },
        Err(e) => {
            error!("Error al obtener los posts: {}", e);
            HttpResponse::InternalServerError()
                .json(json!({ "error": "Error al obtener los posts" }))
        }
    }
}

pub async fn create_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    post: web::Json<PostCreate>,
) -> impl Responder {

    //Log
    log::info!("Creating post: {:?}", post);

    // Obtener el ID del usuario autenticado
    let user_id = user.id;
    
    // Insertar el nuevo post en la base de datos
    match sqlx::query(
        r#"
        INSERT INTO posts (user_id, title, content, category)
        VALUES ($1, $2, $3, $4)
        RETURNING id, created_at, updated_at, likes_count, comments_count
        "#)
        .bind(user_id)
        .bind(&post.0.post_title)
        .bind(&post.0.content)
        .bind(&post.0.category)
        .fetch_one(pool.get_ref())
        .await {
        Ok(record) => {
            let id: i32 = record.get("id");
            let created_at: DateTime<Utc> = record.get("created_at");
            let updated_at: Option<DateTime<Utc>> = record.get("updated_at");
            let likes_count: i32 = record.get("likes_count");
            let comments_count: i32 = record.get("comments_count");
            
            // Crear la respuesta con el post creado
            let created_post = Post {
                id,
                user_id,
                title: post.0.post_title, // Usar el título del post que se está creando
                content: post.0.content, // Usar el contenido del post que se está creando
                category: post.0.category, // Usar la categoría del post que se está creando
                created_at,
                updated_at,
                likes_count,
                comments_count,
            };
            
            HttpResponse::Created()
                .content_type("application/json")
                .json(created_post)
        },
        Err(e) => {
            error!("Error al crear el post: {}", e);
            HttpResponse::InternalServerError()
                .json(json!({ "error": "Error al crear el post" }))
        }
    }
}

// Esta función fue eliminada por estar duplicada, se mantiene la primera implementación

pub async fn update_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>,
    post: web::Json<PostUpdate>,
) -> impl Responder {
    // Verificar que el usuario sea el propietario del post
    match sqlx::query_scalar!(
        "SELECT user_id FROM posts WHERE id = $1",
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(Some(post_user_id))) if post_user_id == user.id => {
            // El usuario es el propietario, proceder con la actualización
            match sqlx::query!(
                r#"
                UPDATE posts
                SET title = $1, content = $2, category = $3, updated_at = NOW()
                WHERE id = $4
                RETURNING id, user_id, title, content, category, created_at, updated_at, likes_count, comments_count
                "#,
                post.0.title,  // Cambiado de post.0.post_title a post.0.title
                post.0.content,
                post.0.category,
                *id
            )
            .fetch_optional(pool.get_ref())
            .await {
                Ok(Some(record)) => {
                    let created_at = match record.created_at {
                        Some(dt) => dt, // Ya es DateTime<Utc>
                        None => {
                            error!("Post {} has no created_at timestamp", record.id);
                            return HttpResponse::InternalServerError()
                                .json(json!({ "error": "Post has invalid creation date" }));
                        }
                    };
                    
                    // El campo updated_at ya es Option<DateTime<Utc>>
                    let updated_at = record.updated_at;
                    
                    let updated_post = Post {
                        id: record.id,
                        user_id: record.user_id.unwrap_or_default(),
                        title: record.title.unwrap_or_else(|| String::from("Untitled")),
                        content: record.content.unwrap_or_default(),
                        category: record.category.unwrap_or_else(|| String::from("general")),
                        created_at,
                        updated_at,
                        likes_count: record.likes_count.unwrap_or(0),
                        comments_count: record.comments_count.unwrap_or(0),
                    };
                    HttpResponse::Ok().json(updated_post)
                },
                Ok(None) => {
                    error!("Post not found after update");
                    HttpResponse::NotFound().json(json!({ "error": "Post not found" }))
                },
                Err(e) => {
                    error!("Error updating post: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to update post" }))
                }
            }
        },
        Ok(Some(Some(_))) => {
            // Usuario no autorizado
            HttpResponse::Forbidden().json(json!({ "error": "Not authorized to update this post" }))
        },
        Ok(Some(None)) | Ok(None) => {
            // Post no encontrado
            HttpResponse::NotFound().json(json!({ "error": "Post not found" }))
        },
        Err(e) => {
            error!("Error checking post ownership: {}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Internal server error" }))
        }
    }
}

pub async fn delete_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>,
) -> impl Responder {
    // Verificar que el usuario sea el propietario del post
    match sqlx::query_scalar!(
        "SELECT user_id FROM posts WHERE id = $1",
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(Some(post_user_id))) if post_user_id == user.id => {
            // El usuario es el propietario, proceder con la eliminación
            match sqlx::query!(
                "DELETE FROM posts WHERE id = $1 RETURNING id",
                *id
            )
            .fetch_optional(pool.get_ref())
            .await {
                Ok(Some(_)) => {
                    HttpResponse::Ok().json(json!({ "message": "Post deleted successfully" }))
                },
                Ok(None) => {
                    error!("Post not found during deletion");
                    HttpResponse::NotFound().json(json!({ "error": "Post not found" }))
                },
                Err(e) => {
                    error!("Error deleting post: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to delete post" }))
                }
            }
        },
        Ok(Some(Some(_))) => {
            // Usuario no autorizado
            HttpResponse::Forbidden().json(json!({ "error": "Not authorized to delete this post" }))
        },
        Ok(Some(None)) | Ok(None) => {
            // Post no encontrado
            HttpResponse::NotFound().json(json!({ "error": "Post not found" }))
        },
        Err(e) => {
            error!("Error checking post ownership: {}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Internal server error" }))
        }
    }
}


pub async fn like_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>,
) -> impl Responder {
    // Verificar si el like ya existe
    match sqlx::query!(
        "SELECT 1 as exists FROM post_likes WHERE user_id = $1 AND post_id = $2",
        user.id,
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(_)) => {
            // El like ya existe, eliminarlo
            match sqlx::query!(
                "DELETE FROM post_likes WHERE user_id = $1 AND post_id = $2",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Actualizar el contador de likes
                    match sqlx::query!(
                        "UPDATE posts SET likes_count = likes_count - 1 WHERE id = $1",
                        *id
                    )
                    .execute(pool.get_ref())
                    .await {
                        Ok(_) => HttpResponse::Ok().json(json!({ "liked": false })),
                        Err(e) => {
                            error!("Error updating like count: {}", e);
                            HttpResponse::InternalServerError().json(json!({ "error": "Failed to update like count" }))
                        }
                    }
                },
                Err(e) => {
                    error!("Error removing like: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to remove like" }))
                }
            }
        },
        Ok(None) => {
            // El like no existe, agregarlo
            match sqlx::query!(
                "INSERT INTO post_likes (user_id, post_id) VALUES ($1, $2)",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Actualizar el contador de likes
                    match sqlx::query!(
                        "UPDATE posts SET likes_count = likes_count + 1 WHERE id = $1",
                        *id
                    )
                    .execute(pool.get_ref())
                    .await {
                        Ok(_) => HttpResponse::Ok().json(json!({ "liked": true })),
                        Err(e) => {
                            error!("Error updating like count: {}", e);
                            HttpResponse::InternalServerError().json(json!({ "error": "Failed to update like count" }))
                        }
                    }
                },
                Err(e) => {
                    error!("Error adding like: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to add like" }))
                }
            }
        },
        Err(e) => {
            error!("Error checking like status: {}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Internal server error" }))
        }
    }
}

pub async fn save_post(
    pool: web::Data<DbPool>,
    user: web::ReqData<User>,
    id: web::Path<i32>,
) -> impl Responder {
    // Verificar si el post ya está guardado
    match sqlx::query!(
        "SELECT 1 as exists FROM post_saves WHERE user_id = $1 AND post_id = $2",
        user.id,
        *id
    )
    .fetch_optional(pool.get_ref())
    .await {
        Ok(Some(_)) => {
            // El post ya está guardado, quitarlo de guardados
            match sqlx::query!(
                "DELETE FROM post_saves WHERE user_id = $1 AND post_id = $2",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Return success response
                    HttpResponse::Ok().json(json!({ "saved": false }))
                },
                Err(e) => {
                    error!("Error removing saved post: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to remove saved post" }))
                }
            }
        },
        Ok(None) => {
            // El post no está guardado, guardarlo
            match sqlx::query!(
                "INSERT INTO post_saves (user_id, post_id) VALUES ($1, $2)",
                user.id,
                *id
            )
            .execute(pool.get_ref())
            .await {
                Ok(_) => {
                    // Return success response
                    HttpResponse::Ok().json(json!({ "saved": true }))
                },
                Err(e) => {
                    error!("Error saving post: {}", e);
                    HttpResponse::InternalServerError().json(json!({ "error": "Failed to save post" }))
                }
            }
        },
        Err(e) => {
            error!("Error checking saved status: {}", e);
            HttpResponse::InternalServerError().json(json!({ "error": "Internal server error" }))
        }
    }
}

#[derive(Deserialize)]
pub struct GetPostsQuery {
    pub category: Option<String>,
    pub tag: Option<String>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
    pub search: Option<String>,
}
