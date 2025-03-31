use actix_web::{dev::ServiceRequest, Error};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use crate::utils::{jwt::decode_token, error::HttpError};

pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, Error> {
    let token = credentials.token();
    match decode_token(token) {
        Ok(_) => Ok(req),
        Err(e) => Err(HttpError::unauthorized(e.to_string()).into()),
    }
}