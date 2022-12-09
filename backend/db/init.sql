CREATE TABLE usr(
    user_id CHAR(4) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(10) NOT NULL,
    email VARCHAR(30),
    PRIMARY KEY (user_id)
);