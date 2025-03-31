use actix_web::web;
use crate::handlers::auth::{login, logout, register};

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/api/auth")
            .route("/login", web::post().to(login))
            .route("/logout", web::post().to(logout))
            .route("/register", web::post().to(register))
    );
}