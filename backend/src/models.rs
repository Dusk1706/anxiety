use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use validator::Validate;
use chrono::{DateTime, Utc};

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: uuid::Uuid,
    pub email: String,
    pub password: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct LoginUser {
    #[validate(email)]
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize, Validate)]
pub struct RegisterUser {
    #[validate(email)]
    pub email: String,
    #[validate(length(min = 6))]
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TokenClaims {
    pub sub: String,
    pub iat: usize,
    pub exp: usize,
}