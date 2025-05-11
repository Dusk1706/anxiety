use serde::Deserialize;
use std::env;

#[derive(Debug, Clone, Deserialize)]
pub struct Config {
    pub host: String,
    pub port: u16,
    pub database_url: String,
    pub jwt_secret: String,
    pub jwt_expires_in: String,
    pub jwt_maxage: i32,
}

impl Config {
    pub fn from_env() -> Result<Self, env::VarError> {
        Ok(Self {
            host: env::var("HOST").unwrap_or("127.0.0.1".to_string()),
            port: env::var("PORT")
                .unwrap_or("8080".to_string())
                .parse()
                .unwrap_or(8080),
            database_url: env::var("DATABASE_URL")?,
            jwt_secret: env::var("JWT_SECRET")?,
            jwt_expires_in: env::var("JWT_EXPIRES_IN").unwrap_or("1h".to_string()),
            jwt_maxage: env::var("JWT_MAXAGE")
                .unwrap_or("3600".to_string())
                .parse()
                .unwrap_or(3600),
        })
    }
}