CREATE TABLE usr(
    user_id INT(10) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(10) NOT NULL,
    email VARCHAR(30),
    PRIMARY KEY (user_id)
);

CREATE TABLE area(
    user_id INT(10) NOT NULL,
    area_id VARCHAR(30) NOT NULL,
    area_name VARCHAR(30) NOT NULL
);

CREATE TABLE shop(
    shop_id VARCHAR(30) NOT NULL,
    user_id INT(10) NOT NULL,
    area_id VARCHAR(30) NOT NULL,
    shop_name VARCHAR(100) NOT NULL,
    shop_link VARCHAR(100) NOT NULL
);

INSERT INTO usr (user_id, user_name, password, email) VALUES (1, "Yamada", "abcde", "yamada@gmail.com")