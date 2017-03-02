CREATE TABLE users (
    users_id SERIAL PRIMARY KEY,
    username VARCHAR (25) UNIQUE,
    email VARCHAR UNIQUE,
    password VARCHAR,
    registration_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_about (
    users_about_id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
    about_markdown VARCHAR,
    about_html VARCHAR
);

CREATE TABLE tutorials (
    tutorials_id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE,
    url_path VARCHAR,
    title VARCHAR,
    description VARCHAR,
    content_markdown VARCHAR,
    content_html VARCHAR,
    created_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO adrian;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO adrian;