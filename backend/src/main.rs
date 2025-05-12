use actix_cors::Cors;
use actix_web::{web, App, HttpServer, middleware::Logger, http};
use actix_session::{storage::CookieSessionStore, SessionMiddleware};
use actix_identity::IdentityMiddleware;
use actix_web_httpauth::middleware::HttpAuthentication;
use dotenv::dotenv;
use log::info;
use sqlx::PgPool;
use crate::config::Config;

// Application state
#[derive(Debug, Clone)]
struct AppState {
    pool: PgPool,
    config: Config,
}

mod config;
mod models;
mod handlers;
mod routes;
mod utils;
mod middleware;
mod db;
// use routes::configure;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("debug"));

    let config = Config::from_env().expect("Failed to load configuration");

    // Set up database connection pool
    let pool = match db::init_pool(&config.database_url).await {
        Ok(pool) => pool,
        Err(e) => {
            log::error!("Failed to create database pool: {}", e);
            std::process::exit(1);
        }
    };
    
    // Create web::Data from the pool
    let pool_data = web::Data::new(pool);

    // Extract values to avoid ownership issues
    let host = config.host.clone();
    let port = config.port;

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

    log::info!("Starting server at http://{}:{}", host, port);

    // Configure authentication middleware
    let auth = HttpAuthentication::bearer(crate::middleware::validator);
    
    // Create shared data
    let app_data = web::Data::new(AppState {
        pool: pool_data.get_ref().clone(),
        config: config.clone(),
    });

    info!("Starting HTTP server at http://{}:{}", config.host, config.port);
    
    HttpServer::new(move || {
        // Configure CORS
        let cors = Cors::permissive()
            .allowed_origin("http://localhost:3000")
            .allowed_origin("http://127.0.0.1:3000")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE", "OPTIONS"])
            .allowed_headers(vec![
                http::header::AUTHORIZATION, 
                http::header::ACCEPT,
                http::header::CONTENT_TYPE,
                http::header::ORIGIN,
            ])
            .supports_credentials()
            .max_age(3600);

        let app = App::new()
            // Middleware
            .wrap(Logger::default())
            .wrap(cors)
            .wrap(IdentityMiddleware::default())
            .wrap(
                SessionMiddleware::builder(
                    CookieSessionStore::default(),
                    secret_key.clone()
                )
                .cookie_http_only(true)
                .cookie_secure(false) // Set to true in production with HTTPS
                .build()
            )
            // Shared application state
            .app_data(app_data.clone());
        
        // Import routes modules
        use crate::routes::posts;
        
        // Configure both public and protected routes
        app.service(
            web::scope("/api")
                .app_data(web::Data::new(pool_data.get_ref().clone()))
                // Rutas públicas de autenticación (no requieren token)
                .service(
                    web::scope("/auth")
                        .route("/login", web::post().to(handlers::auth::login))
                        .route("/register", web::post().to(handlers::auth::register))
                        // Rutas protegidas de autenticación
                        .service(
                            web::scope("")
                                .wrap(auth.clone())
                                .route("/logout", web::post().to(handlers::auth::logout))
                        )
                )
                // Rutas protegidas de posts (todas requieren autenticación)
                .service(
                    web::scope("/posts")
                        .wrap(auth.clone())
                        .configure(routes::posts::configure)
                )
        )
    })
    .bind((host, port))?
    .run()
    .await
}