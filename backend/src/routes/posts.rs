use actix_web::{web, HttpResponse, Responder};
use crate::models::posts::{Post, PostCreate, PostUpdate};
use crate::models::categories::{Category, Tag};
use crate::models::auth::User;
use crate::db::DbPool;

use serde::Deserialize;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg
        .service(
            web::resource("/")
                .route(web::get().to(get_posts))
                .route(web::post().to(create_post))
        )
        .service(
            web::resource("/{id}")
                .route(web::get().to(get_post))
                .route(web::put().to(update_post))
                .route(web::delete().to(delete_post))
        )
        .service(
            web::resource("/categories")
                .route(web::get().to(get_categories))
        )
        .service(
            web::resource("/tags")
                .route(web::get().to(get_tags))
        )
        .service(
            web::resource("/{id}/like")
                .route(web::post().to(like_post))
        )
        .service(
            web::resource("/{id}/save")
                .route(web::post().to(save_post))
        );
}

async fn get_categories() -> impl Responder {
    // Implementar la lógica para obtener categorías
    HttpResponse::Ok().json(Vec::<Category>::new())
}

async fn get_tags() -> impl Responder {
    // Implementar la lógica para obtener tags
    HttpResponse::Ok().json(Vec::<Tag>::new())
}

async fn get_posts(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _query: web::Query<GetPostsQuery>,
) -> impl Responder {
    // Implementar la lógica para obtener posts
    HttpResponse::Ok().json(Vec::<Post>::new())
}

async fn create_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _post: web::Json<PostCreate>,
) -> impl Responder {
    // Implementar la lógica para crear un post
    HttpResponse::Created().json(Post::default())
}

async fn get_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para obtener un post por ID
    HttpResponse::Ok().json(Post::default())
}

async fn update_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
    _post: web::Json<PostUpdate>,
) -> impl Responder {
    // Implementar la lógica para actualizar un post
    HttpResponse::Ok().json(Post::default())
}

async fn delete_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para eliminar un post
    HttpResponse::NoContent().finish()
}

async fn like_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para dar like a un post
    HttpResponse::NoContent().finish()
}

async fn save_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para guardar un post
    HttpResponse::NoContent().finish()
}

#[derive(Deserialize)]
pub struct GetPostsQuery {
    pub category: Option<String>,
    pub tag: Option<String>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
    pub search: Option<String>,
}
