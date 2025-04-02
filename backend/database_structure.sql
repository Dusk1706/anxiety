CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Then create the table
drop table if exists users; 
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Fixed: removed spaces between VAR and CHAR
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Grant appropriate permissions - replace 'username' with your actual PostgreSQL username
GRANT ALL PRIVILEGES ON TABLE users TO username ;
