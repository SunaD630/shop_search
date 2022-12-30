CREATE TABLE usr(
    user_id INT(10) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(10) NOT NULL,
    email VARCHAR(30),
    PRIMARY KEY (user_id)
);

INSERT INTO usr (user_id, user_name, password, email) VALUES (1, "Yamada", "abcde", "yamada@gmail.com")