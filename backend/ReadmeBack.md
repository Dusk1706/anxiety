GitHub Copilot: # Anxiety Backend API

## Overview

This is a RESTful authentication API built with Rust and Actix-Web that provides secure user registration, login, and session management. It handles user authentication using both JWT tokens and cookie-based sessions.

## Technologies

- **Rust** - Systems programming language
- **Actix-Web** - High-performance web framework
- **PostgreSQL** - Relational database
- **SQLx** - Async database access library
- **Bcrypt** - Password hashing
- **JWT** - JSON Web Token authentication
- **Identity and Session** - Cookie-based session management

## Getting Started

### Prerequisites

- Rust and Cargo (1.65+)
- PostgreSQL (12+)
- A properly configured `.env` file

### Installation

1. Clone the repository
2. Set up the database:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

GRANT ALL PRIVILEGES ON TABLE users TO username;
```

3. Create an `.env` file:

```env
HOST=127.0.0.1
PORT=8080
DATABASE_URL=postgres://username:password@localhost/dbname
SECRET_KEY=your_very_long_secret_key_at_least_64_chars
JWT_SECRET=another_very_long_secret_key_at_least_64_chars
JWT_EXPIRES_IN=1h
JWT_MAXAGE=3600
```

4. Build and run:

```bash
cargo build
cargo run
```

## API Endpoints

### Authentication

- **POST /api/auth/register** - Register a new user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/login** - User login
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/logout** - User logout (requires session cookie)

## Project Structure

```
backend/
├── src/
│   ├── main.rs         # Application entry point
│   ├── config.rs       # Configuration from environment
│   ├── handlers/       # Request handlers
│   │   └── auth.rs     # Authentication handlers
│   ├── models.rs       # Data models and schemas
│   ├── routes/         # API route definitions
│   │   ├── mod.rs      # Route module exports
│   │   └── auth.rs     # Auth routes configuration
│   └── utils/          # Utility functions
│       ├── error.rs    # Error handling
│       └── jwt.rs      # JWT token generation/validation
├── .env                # Environment variables
└── Cargo.toml          # Project dependencies
```

## Authentication Flow

1. **Registration**:
   - Validate user input
   - Check if email already exists
   - Hash password with bcrypt
   - Store user in database
   - Return user data (no sensitive information)

2. **Login**:
   - Validate credentials
   - Generate JWT token
   - Set session cookie
   - Return user data and token

3. **Logout**:
   - Clear session cookie

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| HOST | Server host | 127.0.0.1 |
| PORT | Server port | 8080 |
| DATABASE_URL | PostgreSQL connection string | - |
| JWT_SECRET | Secret for signing JWTs | - |
| SECRET_KEY | Secret for cookie encryption | - |
| JWT_EXPIRES_IN | JWT expiration time | 1h |
| JWT_MAXAGE | Cookie max age (seconds) | 3600 |

## Development

- Run tests: `cargo test`
- Format code: `cargo fmt`
- Check lints: `cargo clippy`

## Security Notes

- Passwords are hashed using bcrypt
- Authentication uses both stateless (JWT) and stateful (cookie) sessions
- Sessions include CSRF protection
- Responses include appropriate CORS headers

## API Testing

Use curl to test the API endpoints:

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Logout (requires session cookie from login)
curl -X POST http://localhost:8080/api/auth/logout \
  -H "Cookie: id=your_session_cookie"
```