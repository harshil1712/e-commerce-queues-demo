-- Create the user table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL
);

-- Create an index on the id field for the user table
CREATE INDEX idx_users_id ON users(id);

-- Create the product table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    desc TEXT,
    imgKey TEXT,
    cost INTEGER
);

-- Create an index on the id field for the product table
CREATE INDEX idx_products_id ON products(id);

-- Insert dummy data into the users table
INSERT INTO users (email, name) VALUES
('delivered@resend.dev', 'John Doe'),
('delivered1@resend.dev', 'Jane Smith'),
('delivered2@resend.dev', 'Bob Johnson'),
('delivered3@resend.dev', 'Alice Williams'),
('delivered4@resend.dev', 'Charlie Brown');

-- Insert dummy data into the products table
INSERT INTO products (name, desc, imgKey, cost) VALUES
('Smartphone X', 'Latest model with advanced features', 'smartphone_x.jpg', 799),
('Laptop Pro', 'High-performance laptop for professionals', 'laptop_pro.jpg', 1299),
('Wireless Earbuds', 'True wireless earbuds with noise cancellation', 'earbuds.jpg', 149),
('Smart Watch', 'Fitness tracker and smartwatch combo', 'smartwatch.jpg', 199),
('4K TV', 'Ultra HD smart TV with HDR', '4k_tv.jpg', 599),
('Gaming Console', 'Next-gen gaming system', 'gaming_console.jpg', 499),
('Digital Camera', 'Mirrorless camera with 4K video capabilities', 'camera.jpg', 799),
('Bluetooth Speaker', 'Portable speaker with 360-degree sound', 'speaker.jpg', 79),
('Tablet', '10-inch tablet with stylus support', 'tablet.jpg', 349),
('Fitness Tracker', 'Water-resistant fitness band with heart rate monitor', 'fitness_tracker.jpg', 59);