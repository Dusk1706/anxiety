use chrono::{DateTime, NaiveDateTime, TimeZone, Utc};

/// Convierte un NaiveDateTime (TIMESTAMP sin zona horaria) a DateTime<Utc> (con zona horaria UTC)
/// 
/// Este helper facilita la conversión correcta entre tipos de fecha/hora de PostgreSQL (TIMESTAMP) 
/// y los tipos de fecha/hora de Rust (DateTime<Utc>)
pub fn naive_to_utc(naive_dt: NaiveDateTime) -> DateTime<Utc> {
    // Método recomendado para evitar la advertencia de deprecación
    Utc.from_utc_datetime(&naive_dt)
}

/// Convierte un Option<NaiveDateTime> a Option<DateTime<Utc>>
/// 
/// Útil para campos opcionales de fecha/hora en la base de datos
pub fn naive_opt_to_utc(naive_dt_opt: Option<NaiveDateTime>) -> Option<DateTime<Utc>> {
    naive_dt_opt.map(|naive_dt| naive_to_utc(naive_dt))
}

/// Convierte un DateTime<Utc> a otro DateTime<Utc> (simplemente lo devuelve)
/// 
/// Util para unificar la interfaz cuando no se sabe si el tipo es DateTime<Utc> o NaiveDateTime
pub fn datetime_to_utc(dt: DateTime<Utc>) -> DateTime<Utc> {
    dt
}

/// Convierte un Option<DateTime<Utc>> a Option<DateTime<Utc>> (simplemente lo devuelve)
pub fn datetime_opt_to_utc(dt_opt: Option<DateTime<Utc>>) -> Option<DateTime<Utc>> {
    dt_opt
}

/// Obtiene la fecha/hora actual como DateTime<Utc>
pub fn now_utc() -> DateTime<Utc> {
    Utc::now()
}
