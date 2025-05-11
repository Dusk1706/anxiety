pub mod auth;
pub mod posts;
pub mod comments;
pub mod groups;
pub mod mood;

use actix_web::web;

pub fn configure(cfg: &mut web::ServiceConfig) {
    auth::configure(cfg);
    posts::configure(cfg);
    comments::configure(cfg);
    groups::configure(cfg);
    mood::configure(cfg);
}