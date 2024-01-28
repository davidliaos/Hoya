CREATE TABLE IF NOT EXISTS user (
    user_id SERIAL PRIMARY KEY, 
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(50) NOT NULL,
    major_interests VARCHAR(50)[] NOT NULL,
    college_budget INT NOT NULL,
    location VARCHAR(50)[] NOT NULL,
    sport VARCHAR(50)[] NOT NULL
);