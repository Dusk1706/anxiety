use actix_web::{http::StatusCode, HttpResponse, ResponseError};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
pub enum HttpError {
    #[error("Bad Request: {0}")]
    BadRequest(String),
    
    #[error("Unauthorized: {0}")]
    Unauthorized(String),
    
    #[error("Not Found: {0}")]
    NotFound(String),
    
    #[error("Internal Server Error: {0}")]
    InternalServerError(String),
}

#[derive(Serialize, Deserialize)]
struct ErrorResponse {
    status: String,
    message: String,
}

impl ResponseError for HttpError {
    fn status_code(&self) -> StatusCode {
        match self {
            HttpError::BadRequest(_) => StatusCode::BAD_REQUEST,
            HttpError::Unauthorized(_) => StatusCode::UNAUTHORIZED,
            HttpError::NotFound(_) => StatusCode::NOT_FOUND,
            HttpError::InternalServerError(_) => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status = self.status_code();
        let message = self.to_string();
        
        HttpResponse::build(status).json(ErrorResponse {
            status: status.to_string(),
            message,
        })
    }
}