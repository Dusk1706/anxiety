use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

use std::default::Default;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct AnxietyLevel {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub color_code: Option<String>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct MoodRecord {
    pub id: i32,
    pub user_id: i32,
    pub anxiety_level_id: Option<i32>,
    pub record_date: DateTime<Utc>,
    pub notes: Option<String>,
    pub triggers: Option<String>,
    pub mood_score: i32,
}

impl Default for MoodRecord {
    fn default() -> Self {
        MoodRecord {
            id: 0,
            user_id: 0,
            anxiety_level_id: None,
            record_date: Utc::now(),
            notes: None,
            triggers: None,
            mood_score: 0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct MoodRecordCreate {
    pub anxiety_level_id: Option<i32>,
    pub notes: Option<String>,
    pub triggers: Option<String>,
    pub mood_score: i32,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct MoodRecordWithRelations {
    pub record: MoodRecord,
    pub anxiety_level: Option<AnxietyLevel>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct UserStats {
    pub user_id: i32,
    pub active_days: i32,
    pub completed_tasks: i32,
    pub level: i32,
}

impl Default for UserStats {
    fn default() -> Self {
        UserStats {
            user_id: 0,
            active_days: 0,
            completed_tasks: 0,
            level: 0,
        }
    }
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct UserPreferences {
    pub user_id: i32,
    pub theme: Option<String>,
    pub email_notifications: bool,
    pub app_notifications: bool,
    pub public_profile: bool,
}

impl Default for UserPreferences {
    fn default() -> Self {
        UserPreferences {
            user_id: 0,
            theme: None,
            email_notifications: true,
            app_notifications: true,
            public_profile: true,
        }
    }
}
