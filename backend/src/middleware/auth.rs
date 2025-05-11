use actix_web::{dev::ServiceRequest, Error};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use futures_util::future::Future;
use crate::utils::{jwt::decode_token, error::HttpError};

pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let token = credentials.token();
    
    match decode_token(token) {
        Ok(_claims) => {
            // You can add additional claim validations here if needed
            // For example, check if the user still exists, has necessary permissions, etc.
            Ok(req)
        },
        Err(e) => {
            log::error!("JWT validation error: {}", e);
            let error = HttpError::unauthorized("Invalid or expired token");
            Err((error.into(), req))
        }
    }
}

// Wrapper function to match the expected signature for HttpAuthentication
pub fn validator_wrapper(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> impl Future<Output = Result<ServiceRequest, (Error, ServiceRequest)>> {
    let result = validator(req, credentials);
    async { result.await }
}

// Skip authentication for certain paths
pub fn skip_authentication(path: &str) -> bool {
    let public_paths = [
        "/api/auth/login",
        "/api/auth/register",
        "/health",
    ];
    
    public_paths.iter().any(|p| path.starts_with(p))
}