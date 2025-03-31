use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::env;
use uuid::Uuid;

use crate::models::TokenClaims;

pub fn encode_token(user_id: &Uuid) -> Result<String, jsonwebtoken::errors::Error> {
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration = env::var("JWT_EXPIRES_IN")
        .unwrap_or_else(|_| "3600".to_string())
        .parse::<usize>()
        .unwrap_or(3600);
    
    let now = chrono::Utc::now();
    let iat = now.timestamp() as usize;
    let exp = (now + chrono::Duration::seconds(expiration as i64)).timestamp() as usize;
    
    let claims = TokenClaims {
        sub: user_id.to_string(),
        exp,
        iat,
    };
    
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(jwt_secret.as_bytes()),
    )
}

pub fn decode_token(token: &str) -> Result<TokenClaims, jsonwebtoken::errors::Error> {
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    
    let token_data = decode::<TokenClaims>(
        token,
        &DecodingKey::from_secret(jwt_secret.as_bytes()),
        &Validation::default(),
    )?;
    
    Ok(token_data.claims)
}