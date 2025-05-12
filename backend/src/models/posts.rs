use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

use std::default::Default;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Post {
    pub id: i32,
    pub user_id: i32,
    pub title: String,
    pub content: String,
    pub category: String,
    #[serde(with = "chrono::serde::ts_seconds")]
    pub created_at: DateTime<Utc>,
    #[serde(with = "chrono::serde::ts_seconds_option")]
    pub updated_at: Option<DateTime<Utc>>,
    pub likes_count: i32,
    pub comments_count: i32,
}

impl Default for Post {
    fn default() -> Self {
        Post {
            id: 0,
            user_id: 0,
            title: String::new(),
            content: String::new(),
            category: String::new(),
            created_at: Utc::now(),
            updated_at: None,
            likes_count: 0,
            comments_count: 0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PostCreate {
    #[serde(rename = "title")]
    pub post_title: String,
    pub content: String,
    pub category: String,
    pub tags: Vec<String>,
}

impl Default for PostCreate {
    fn default() -> Self {
        PostCreate {
            post_title: String::new(),
            content: String::new(),
            category: String::new(),
            tags: Vec::new(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PostUpdate {
    pub title: Option<String>,
    pub content: Option<String>,
    pub category: Option<String>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct PostWithRelations {
    pub post: Post,
    pub author: Author,
    pub tags: Vec<Tag>,
    pub is_liked: bool,
    pub is_saved: bool,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Author {
    pub id: i32,
    pub username: String,
    pub name: Option<String>,
    pub avatar: Option<String>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Tag {
    pub id: i32,
    pub name: String,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct PostLike {
    pub user_id: i32,
    pub post_id: i32,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct PostSave {
    pub user_id: i32,
    pub post_id: i32,
    pub created_at: DateTime<Utc>,
}
