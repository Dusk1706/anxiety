use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use serde::{Deserialize, Serialize};
use thiserror::Error;
use jsonwebtoken::errors::Error as JwtError;
use sqlx::Error as SqlxError;
use std::fmt;

#[derive(Error, Debug)]
pub enum HttpError {
    #[error("Bad Request: {0}")]
    BadRequest(String),
    
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    
    #[error("Forbidden: {0}")]
    Forbidden(String),
    
    #[error("Not Found: {0}")]
    NotFound(String),
    
    #[error("Conflict: {0}")]
    Conflict(String),
    
    #[error("Validation Error: {0}")]
    ValidationError(String),
    
    #[error("Internal Server Error")]
    InternalServerError,
}

impl HttpError {
    pub fn bad_request<T: fmt::Display>(msg: T) -> Self {
        HttpError::BadRequest(msg.to_string())
    }
    
    pub fn unauthorized<T: fmt::Display>(msg: T) -> Self {
        HttpError::Unauthorized(msg.to_string())
    }
    
    pub fn not_found<T: fmt::Display>(msg: T) -> Self {
        HttpError::NotFound(msg.to_string())
    }
    
    pub fn conflict<T: fmt::Display>(msg: T) -> Self {
        HttpError::Conflict(msg.to_string())
    }
    
    pub fn validation<T: fmt::Display>(msg: T) -> Self {
        HttpError::ValidationError(msg.to_string())
    }
}

#[derive(Serialize, Deserialize, Debug)]
pub struct ErrorResponse {
    pub status: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error_code: Option<String>,
}

impl ResponseError for HttpError {
    fn status_code(&self) -> StatusCode {
        match self {
            HttpError::BadRequest(_) => StatusCode::BAD_REQUEST,
            HttpError::Unauthorized(_) => StatusCode::UNAUTHORIZED,
            HttpError::Forbidden(_) => StatusCode::FORBIDDEN,
            HttpError::NotFound(_) => StatusCode::NOT_FOUND,
            HttpError::Conflict(_) => StatusCode::CONFLICT,
            HttpError::ValidationError(_) => StatusCode::UNPROCESSABLE_ENTITY,
            HttpError::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status = self.status_code();
        let status_str = status.to_string();
        
        // Extract the error code from the status
        let error_code = status.canonical_reason().map(|s| s.to_string());
        
        // Create the error response
        let error_response = ErrorResponse {
            status: status_str,
            message: self.to_string(),
            error: Some(format!("{:?}", self)),
            error_code,
        };
        
        log::error!("HTTP Error: {:?}", error_response);
        
        HttpResponse::build(status).json(error_response)
    }
}

// Implement From traits for common error types
impl From<SqlxError> for HttpError {
    fn from(err: SqlxError) -> Self {
        log::error!("Database error: {}", err);
        match err {
            SqlxError::RowNotFound => HttpError::not_found("Resource not found"),
            SqlxError::Database(db_err) if db_err.constraint().is_some() => {
                HttpError::conflict("Database constraint violation")
            }
            _ => HttpError::InternalServerError,
        }
    }
}

impl From<JwtError> for HttpError {
    fn from(err: JwtError) -> Self {
        match err.kind() {
            jsonwebtoken::errors::ErrorKind::ExpiredSignature => {
                HttpError::unauthorized("Token has expired")
            }
            jsonwebtoken::errors::ErrorKind::InvalidToken => {
                HttpError::unauthorized("Invalid token")
            }
            _ => {
                log::error!("JWT error: {}", err);
                HttpError::unauthorized("Invalid authentication token")
            }
        }
    }
}

impl From<bcrypt::BcryptError> for HttpError {
    fn from(err: bcrypt::BcryptError) -> Self {
        log::error!("Bcrypt error: {}", err);
        HttpError::InternalServerError
    }
}

impl From<validator::ValidationErrors> for HttpError {
    fn from(err: validator::ValidationErrors) -> Self {
        HttpError::validation(format!("Validation error: {:?}", err))
    }
}