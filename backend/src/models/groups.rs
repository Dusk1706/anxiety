use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use chrono::{DateTime, Utc};

use std::default::Default;

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct Group {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub long_description: Option<String>,
    pub category: String,
    pub created_at: DateTime<Utc>,
    pub creator_id: i32,
    pub image_url: Option<String>,
    pub color: Option<String>,
    pub members_count: i32,
}

impl Default for Group {
    fn default() -> Self {
        Group {
            id: 0,
            name: String::new(),
            description: None,
            long_description: None,
            category: String::new(),
            created_at: Utc::now(),
            creator_id: 0,
            image_url: None,
            color: None,
            members_count: 0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GroupCreate {
    pub name: String,
    pub description: Option<String>,
    pub long_description: Option<String>,
    pub category: String,
    pub image_url: Option<String>,
    pub color: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GroupUpdate {
    pub name: Option<String>,
    pub description: Option<String>,
    pub long_description: Option<String>,
    pub category: Option<String>,
    pub image_url: Option<String>,
    pub color: Option<String>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct GroupMember {
    pub group_id: i32,
    pub user_id: i32,
    pub role: String,
    pub join_date: DateTime<Utc>,
    pub status: String,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct GroupPost {
    pub id: i32,
    pub group_id: i32,
    pub user_id: i32,
    pub content: String,
    pub created_at: DateTime<Utc>,
    pub likes_count: i32,
    pub comments_count: i32,
}

impl Default for GroupPost {
    fn default() -> Self {
        GroupPost {
            id: 0,
            group_id: 0,
            user_id: 0,
            content: String::new(),
            created_at: Utc::now(),
            likes_count: 0,
            comments_count: 0,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GroupPostCreate {
    pub group_id: i32,
    pub content: String,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct GroupWithRelations {
    pub group: Group,
    pub creator: User,
    pub members: Vec<GroupMember>,
    pub posts: Vec<GroupPost>,
}

#[derive(Debug, FromRow, Serialize, Deserialize)]
pub struct User {
    pub id: i32,
    pub username: String,
    pub name: Option<String>,
    pub avatar: Option<String>,
}
