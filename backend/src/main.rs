use actix_cors::Cors;
use actix_web::{http, web, App, HttpServer};
use actix_session::{storage::CookieSessionStore, SessionMiddleware};
use actix_identity::IdentityMiddleware;
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;

mod config;
mod models;
mod handlers;
mod routes;
mod utils;
mod middleware;

use config::Config;
use routes::configure;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));

    let config = Config::from_env().expect("Failed to load configuration");

    // Set up database connection pool
    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&config.database_url)
        .await
        .expect("Failed to create pool");
 
    // Secret key for session middleware
    let secret_key = {
        // Generate a fixed-size key for cookie signing
        let mut key = [0u8; 64]; // Using 64 bytes to be safe
        let secret = config.jwt_secret.as_bytes();
        
        // Copy the secret bytes into the key, repeating if necessary
        for i in 0..64 {
            key[i] = secret[i % secret.len()];
        }
        
        actix_web::cookie::Key::derive_from(&key)
    };

    // Extract values to avoid ownership issues
    let host = config.host.clone();
    let port = config.port;

    log::info!("Starting server at http://{}:{}", host, port);

    HttpServer::new(move || {
        let cors = Cors::default()
            .allowed_origin("http://localhost:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![http::header::AUTHORIZATION, http::header::ACCEPT, http::header::CONTENT_TYPE])
            .supports_credentials()
            .max_age(3600);

        App::new()
            .wrap(cors)
            .wrap(IdentityMiddleware::default())
            .wrap(
                SessionMiddleware::builder(CookieSessionStore::default(), secret_key.clone())
                    .cookie_secure(false)
                    .build(),
            )
            .app_data(web::Data::new(pool.clone()))
            .app_data(web::Data::new(config.clone()))
            .configure(configure)
    })
    .bind((host, port))?
    .run()
    .await
}