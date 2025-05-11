use actix_web::{web, HttpResponse, Responder};
use crate::models::groups::*;
use crate::models::auth::User;
use crate::db::DbPool;

use serde::Deserialize;

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/groups")
            .service(web::resource("/")
                .route(web::get().to(get_groups))
                .route(web::post().to(create_group))
            )
            .service(web::resource("/{id}")
                .route(web::get().to(get_group))
                .route(web::put().to(update_group))
                .route(web::delete().to(delete_group))
            )
            .service(web::resource("/{id}/join").route(web::post().to(join_group)))
            .service(web::resource("/{id}/leave").route(web::post().to(leave_group)))
            .service(web::resource("/{id}/posts").route(web::post().to(create_group_post)))
    );
}

async fn get_groups(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _query: web::Query<GetGroupsQuery>,
) -> impl Responder {
    // Implementar la lógica para obtener grupos
    HttpResponse::Ok().json(Vec::<Group>::new())
}

async fn create_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _group: web::Json<GroupCreate>,
) -> impl Responder {
    // Implementar la lógica para crear un grupo
    HttpResponse::Created().json(Group::default())
}

async fn get_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para obtener un grupo por ID
    HttpResponse::Ok().json(Group::default())
}

async fn update_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
    _group: web::Json<GroupUpdate>,
) -> impl Responder {
    // Implementar la lógica para actualizar un grupo
    HttpResponse::Ok().json(Group::default())
}

async fn delete_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para eliminar un grupo
    HttpResponse::NoContent().finish()
}

async fn join_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para unirse a un grupo
    HttpResponse::NoContent().finish()
}

async fn leave_group(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
) -> impl Responder {
    // Implementar la lógica para abandonar un grupo
    HttpResponse::NoContent().finish()
}

async fn create_group_post(
    _pool: web::Data<DbPool>,
    _user: web::ReqData<User>,
    _id: web::Path<i32>,
    _post: web::Json<GroupPostCreate>,
) -> impl Responder {
    // Implementar la lógica para crear un post en un grupo
    HttpResponse::Created().json(GroupPost::default())
}

#[derive(Deserialize)]
pub struct GetGroupsQuery {
    pub category: Option<String>,
    pub search: Option<String>,
    pub page: Option<i32>,
    pub limit: Option<i32>,
}
