use sqlx::PgPool;
use sqlx::Error;

pub type DbPool = PgPool;

pub async fn init_pool(database_url: &str) -> Result<DbPool, Error> {
    PgPool::connect(database_url).await
}
