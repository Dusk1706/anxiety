use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use std::env;
use chrono::{Utc, Duration};

use crate::models::auth::TokenClaims;

// Parse duration string like "1h" or "30m" into seconds
fn parse_duration(duration_str: &str) -> i64 {
    let duration_str = duration_str.trim().to_lowercase();
    
    if duration_str.ends_with('h') {
        if let Ok(hours) = duration_str.trim_end_matches('h').parse::<i64>() {
            return hours * 3600;
        }
    } else if duration_str.ends_with('m') {
        if let Ok(mins) = duration_str.trim_end_matches('m').parse::<i64>() {
            return mins * 60;
        }
    } else if duration_str.ends_with('d') {
        if let Ok(days) = duration_str.trim_end_matches('d').parse::<i64>() {
            return days * 24 * 3600;
        }
    }
    
    // Default to 1 hour if parsing fails
    3600
}

pub fn encode_token(user_id: i32) -> Result<String, jsonwebtoken::errors::Error> {
    let jwt_secret = env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    let expiration_str = env::var("JWT_EXPIRES_IN").unwrap_or_else(|_| "1h".to_string());
    let expiration_secs = parse_duration(&expiration_str);
    
    let now = Utc::now();
    let iat = now.timestamp() as usize;
    let exp = (now + Duration::seconds(expiration_secs)).timestamp() as usize;
    
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
    
    // Configure validation to check expiration time
    let validation = Validation::default();
    
    let token_data = decode::<TokenClaims>(
        token,
        &DecodingKey::from_secret(jwt_secret.as_bytes()),
        &validation,
    )?;
    
    Ok(token_data.claims)
}