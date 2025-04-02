use actix_identity::Identity;
use bcrypt::{hash, verify};
use serde_json::json;
use sqlx::PgPool;
use validator::Validate;
use uuid::Uuid;
use chrono::Utc;
use actix_web::{web, HttpResponse, Responder, HttpRequest, HttpMessage}; // Added HttpMessage

use crate::{
    models::{LoginUser, RegisterUser, User},
    utils::{error::HttpError, jwt::encode_token},
};

pub async fn login(
    user: web::Json<LoginUser>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, HttpError> {
    // Validate input
    user.validate()?;

    // Get user from database
    let user_db = sqlx::query_as!(
        User,
        "SELECT * FROM users WHERE email = $1",
        user.email
    )
    .fetch_optional(&**pool)
    .await?
    .ok_or(HttpError::Unauthorized("Invalid credentials".into()))?;

    // Verify password
    if !verify(&user.password, &user_db.password)? {
        return Err(HttpError::Unauthorized("Invalid credentials".into()));
    }

    // Generate token
    let token = encode_token(&user_db.id)?;

    Ok(HttpResponse::Ok().json(json!({
        "status": "success",
        "token": token,
        "user": {
            "id": user_db.id,
            "email": user_db.email
        }
    })))
}

pub async fn logout() -> impl Responder {
    // Since JWT is stateless, server-side logout just means the client 
    // should discard the token. We just return a success response.
    HttpResponse::Ok().json(serde_json::json!({
        "status": "success",
        "message": "Logged out successfully"
    }))
}

pub async fn register(
    user: web::Json<RegisterUser>,
    pool: web::Data<PgPool>,
) -> Result<HttpResponse, HttpError> {
    // Validate user input
    if let Err(e) = user.0.validate() {
        return Err(HttpError::BadRequest(format!("Validation error: {}", e)));
    }

    // Check if email already exists - Using runtime API
    let existing_user = sqlx::query("SELECT email FROM users WHERE email = $1")
        .bind(&user.email)
        .fetch_optional(pool.get_ref())
        .await
        .map_err(|e| HttpError::InternalServerError(format!("Database error: {}", e)))?;

        
    if existing_user.is_some() {
        return Err(HttpError::BadRequest("Email already in use".to_string()));
    }

    // Hash password
    let hashed_password = hash(&user.password, 10)
        .map_err(|e| HttpError::InternalServerError(format!("Password hashing error: {}", e)))?;

    // Insert user into database - Using runtime API
    let user_db = sqlx::query_as::<_, crate::models::User>(
        "INSERT INTO users (id, email, password, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, password, created_at, updated_at"
    )
    .bind(Uuid::new_v4())
    .bind(&user.email)
    .bind(&hashed_password)
    .bind(Utc::now())
    .bind(Utc::now())
    .fetch_one(pool.get_ref())
    .await
    .map_err(|e| HttpError::InternalServerError(format!("Database error: {}", e)))?;

    Ok(HttpResponse::Ok().json(serde_json::json!({
        "status": "success",
        "user": {
            "id": user_db.id,
            "email": user_db.email
        }
    })))
}