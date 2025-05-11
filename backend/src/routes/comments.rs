use actix_web::{web, HttpResponse, Responder};
use crate::models::comments::*;
use crate::models::auth::User;
use crate::db::DbPool;

use serde::Deserialize;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/comments")
            .service(web::resource("/")
                .route(web::get().to(get_comments))
                .route(web::post().to(create_comment))
            )
            .service(web::resource("/{id}")
                .route(web::get().to(get_comment))
                .route(web::put().to(update_comment))
                .route(web::delete().to(delete_comment))
            )
            .service(web::resource("/{id}/like").route(web::post().to(like_comment)))
    );
}

async fn get_comments(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _query: web::Query<GetCommentsQuery>,
) -> impl Responder {
    // Implementar la lógica para obtener comentarios
    HttpResponse::Ok().json(Vec::<Comment>::new())
}

async fn create_comment(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _comment: web::Json<CommentCreate>,
) -> impl Responder {
    // Implementar la lógica para crear un comentario
    HttpResponse::Created().json(Comment::default())
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
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para dar like a un comentario
    HttpResponse::NoContent().finish()
}

#[derive(Deserialize)]
pub struct GetCommentsQuery {
    pub post_id: Option<i32>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
}
