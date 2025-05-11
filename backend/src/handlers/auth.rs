use actix_identity::Identity;
use actix_web::HttpMessage;  // Add this import for extensions()
use bcrypt::verify;
use sqlx::PgPool;
use validator::Validate;
use chrono::Utc;
use actix_web::{web, HttpResponse, HttpRequest};
use log::{info, error};

use crate::{
    models::{LoginUser, RegisterUser, User},
    utils::{error::HttpError, jwt::encode_token},
    AppState,
};

// Type alias for better readability
type DbPool = PgPool;

pub async fn login(
    req: HttpRequest,
    user: web::Json<LoginUser>,
    data: web::Data<AppState>,
) -> Result<HttpResponse, HttpError> {
    info!("Login attempt for email: {}", user.email);
    
    // Validate user input
    user.0.validate()?;

    // Check if user exists
    let user_db: Option<User> = sqlx::query_as(
        r#"
        SELECT id, email, password_hash, name, bio, date_of_birth, avatar, 
               last_login, created_at, updated_at, is_active
        FROM users 
        WHERE email = $1 AND is_active = true
        "#
    )
    .bind(&user.email)
    .fetch_optional(&data.pool)
    .await?;

    let user_db = match user_db {
        Some(user) => user,
        None => {
            error!("Login failed: User not found or inactive - {}", user.email);
            return Err(HttpError::unauthorized("Invalid email or password"));
        },
    };

    // Verify password
    let is_valid = verify(&user.password, &user_db.password_hash)
        .map_err(|e| {
            error!("Password verification error: {}", e);
            HttpError::unauthorized("Invalid email or password")
        })?;

    if !is_valid {
        error!("Invalid password for user: {}", user.email);
        return Err(HttpError::unauthorized("Invalid email or password"));
    }


    // Generate JWT token
    let token = encode_token(user_db.id)?;

    // Update last login time
    sqlx::query(
        "UPDATE users SET last_login = $1 WHERE id = $2"
    )
    .bind(Utc::now())
    .bind(user_db.id)
    .execute(&data.pool)
    .await
    .map_err(|e| {
        error!("Failed to update last login time: {}", e);
        HttpError::InternalServerError
    })?;

    // Set identity
    let _id = Identity::login(&req.extensions(), user_db.id.to_string())
        .map_err(|e| {
            error!("Failed to set identity: {}", e);
            HttpError::InternalServerError
        })?;
    
    let response = serde_json::json!({
        "status": "success",
        "token": token,
        "user": {
            "id": user_db.id,
            "email": user_db.email,
            "name": user_db.name,
            "avatar": user_db.avatar
        }
    });

    info!("Login successful for user: {}", user_db.email);
    Ok(HttpResponse::Ok().json(response))
}

pub async fn logout(id: Identity) -> Result<HttpResponse, HttpError> {
    let username = id.id().unwrap_or_else(|_| "unknown".to_string());
    
    if username == "unknown" {
        return Err(HttpError::unauthorized("Not authenticated"));
    }
    
    id.logout();
    
    info!("User logged out: {}", username);
    
    Ok(HttpResponse::Ok().json(serde_json::json!({
        "status": "success",
        "message": "Successfully logged out"
    })))
}

pub async fn register(
    user: web::Json<RegisterUser>,
    data: web::Data<AppState>,
) -> Result<HttpResponse, HttpError> {
    info!("Registration attempt for email: {}", user.email);
    
    // Validate user input
    user.0.validate()?;

    // Check if email already exists
    let exists: bool = sqlx::query_scalar(
        "SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)"
    )
    .bind(&user.email)
    .fetch_one(&data.pool)
    .await?;
    
    if exists {
        error!("Registration failed: Email already in use - {}", user.email);
        return Err(HttpError::conflict("Email already in use"));
    }

    // Hash password
    let hashed_password = bcrypt::hash(&user.password, 12)?;

    // Insert new user
    let user_db: User = sqlx::query_as(
        r#"
        INSERT INTO users (email, password_hash, name, is_active, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, email, password_hash, name, bio, date_of_birth, avatar, 
                 last_login, created_at, updated_at, is_active
        "#
    )
    .bind(&user.email)
    .bind(&hashed_password)
    .bind(user.name.as_str())
    .bind(true) // is_active
    .bind(Utc::now())
    .bind(Utc::now())
    .fetch_one(&data.pool)
    .await?;

    // Generate JWT token
    let token = encode_token(user_db.id)?;

    let response = serde_json::json!({
        "status": "success",
        "user": {
            "id": user_db.id,
            "email": user_db.email,
            "name": user_db.name,
            "avatar": user_db.avatar
        },
        "token": token
    });

    info!("Registration successful for user: {}", user_db.email);
    Ok(HttpResponse::Created().json(response))
}