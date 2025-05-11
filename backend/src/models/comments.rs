use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

use std::default::Default;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Comment {
    pub id: i32,
    pub post_id: i32,
    pub user_id: i32,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub likes_count: i32,
}

impl Default for Comment {
    fn default() -> Self {
        Comment {
            id: 0,
            post_id: 0,
            user_id: 0,
            content: String::new(),
            created_at: Utc::now(),
            likes_count: 0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentCreate {
    pub post_id: i32,
    pub content: String,
}

impl Default for CommentCreate {
    fn default() -> Self {
        CommentCreate {
            post_id: 0,
            content: String::new(),
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommentUpdate {
    pub content: String,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct CommentWithRelations {
    pub comment: Comment,
    pub author: Author,
    pub is_liked: bool,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct CommentLike {
    pub user_id: i32,
    pub comment_id: i32,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Author {
    pub id: i32,
    pub username: String,
    pub name: Option<String>,
    pub avatar: Option<String>,
}
