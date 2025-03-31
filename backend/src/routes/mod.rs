pub mod auth;

use actix_web::web;

pub fn configure(cfg: &mut web::ServiceConfig) {
    auth::configure(cfg);
}