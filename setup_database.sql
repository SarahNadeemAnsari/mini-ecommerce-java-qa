CREATE DATABASE IF NOT EXISTS mini_ecommerce;

USE mini_ecommerce;

-- Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

-- Products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(500)
);

-- Cart items
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1
);

-- Per-user cart JSON used by the application
CREATE TABLE IF NOT EXISTS user_carts (
    user_id INT PRIMARY KEY,
    cart_json TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- Sample products for testing
INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Classic Sneakers',
       'Comfortable everyday sneakers',
       49.99,
       25,
       'images/product1.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Classic Sneakers'
);

INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Leather Wallet',
       'Hand-stitched genuine leather',
       29.99,
       40,
       'images/product2.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Leather Wallet'
);

INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Wireless Headphones',
       'Noise-cancelling Bluetooth',
       89.99,
       15,
       'images/product3.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Wireless Headphones'
);

INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Ceramic Mug',
       'Dishwasher safe 350ml',
       12.99,
       120,
       'images/product4.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Ceramic Mug'
);

INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Slim Backpack',
       'Water-resistant commuter backpack',
       59.99,
       30,
       'images/product5.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Slim Backpack'
);

INSERT INTO products (name, description, price, stock, image_url)
SELECT 'Smartwatch X',
       'Fitness tracking + notifications',
       129.99,
       10,
       'images/product6.jpg'
WHERE NOT EXISTS (
    SELECT 1 FROM products WHERE name = 'Smartwatch X'
);