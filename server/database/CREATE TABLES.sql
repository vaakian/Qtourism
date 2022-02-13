DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `packages`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `merchants`;
DROP TABLE IF EXISTS `orders`;
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    password TEXT,
    username TEXT UNIQUE,
    tel TEXT,
    avatar_url TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    type INTEGER DEFAULT 0
);
CREATE TABLE merchants (
    id INTEGER PRIMARY KEY,
    password TEXT,
    username TEXT,
    tel TEXT,
    description TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE packages (
    id INTEGER PRIMARY KEY,
    merchant_id INTEGER,
    banner_url TEXT,
    name TEXT,
    price INTEGER,
    description TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(merchant_id) REFERENCES merchants(id)
);
CREATE TABLE comments (
    id INTEGER PRIMARY KEY,
    package_id INTEGER,
    user_id INTEGER,
    content TEXT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(package_id) REFERENCES packages(id)
);
CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    package_id INTEGER,
    time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(package_id) REFERENCES packages(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
)