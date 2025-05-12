use actix_web::{dev::ServiceRequest, Error, web, HttpMessage};
use actix_web_httpauth::extractors::bearer::BearerAuth;
use futures_util::future::Future;
use crate::utils::{jwt::decode_token, error::HttpError};
use crate::models::auth::User;
use crate::db::DbPool;

pub async fn validator(
    req: ServiceRequest,
    credentials: BearerAuth,
) -> Result<ServiceRequest, (Error, ServiceRequest)> {
    let token = credentials.token();
    
    match decode_token(token) {
        Ok(claims) => {
            // Extraer el user_id del token
            let user_id = claims.sub.parse::<i32>().unwrap_or(0);
            
            // Obtener el pool de conexiones de la aplicación
            if let Some(pool) = req.app_data::<web::Data<DbPool>>() {
                // Buscar el usuario en la base de datos
                // Usamos query! en lugar de query_as! para tener más control sobre el mapeo de campos
                match sqlx::query!("SELECT * FROM users WHERE id = $1", user_id)
                .fetch_optional(pool.get_ref())
                .await {
                    Ok(Some(record)) => {
                        // Crear un objeto User a partir de los resultados de la consulta
                        let user = User {
                            id: record.id,
                            email: record.email.clone(),
                            password_hash: record.password_hash.clone(),
                            name: record.name.clone(),
                            bio: record.bio.clone(),
                            date_of_birth: record.date_of_birth,
                            avatar: record.avatar.clone(),
                            last_login: record.last_login,
                            created_at: record.created_at,
                            updated_at: record.updated_at,
                            is_active: record.is_active.unwrap_or(true)
                        };
                        
                        // Añadir el usuario al contexto de la solicitud como ReqData
                        req.extensions_mut().insert(user);
                        Ok(req)
                    },
                    Ok(None) => {
                        log::error!("User not found: {}", user_id);
                        let error = HttpError::unauthorized("User not found");
                        Err((error.into(), req))
                    },
                    Err(e) => {
                        log::error!("Database error: {}", e);
                        let error = HttpError::InternalServerError;
                        Err((error.into(), req))
                    }
                }
            } else {
                log::error!("Database pool not found in app_data");
                let error = HttpError::InternalServerError;
                Err((error.into(), req))
            }
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