-- GrabExpress Database Schema
-- Run this in MySQL Workbench first

CREATE DATABASE IF NOT EXISTS grabexpress;
USE grabexpress;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  phone       VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role        ENUM('customer', 'rider', 'admin') NOT NULL DEFAULT 'customer',
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS riders (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  vehicle_type  ENUM('motorcycle', 'car', 'van') NOT NULL DEFAULT 'motorcycle',
  license_plate VARCHAR(20),
  status        ENUM('available', 'busy', 'offline') NOT NULL DEFAULT 'offline',
  rating        DECIMAL(3,2) DEFAULT 5.00,
  total_deliveries INT DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  tracking_number  VARCHAR(30) NOT NULL UNIQUE,
  sender_id        INT NOT NULL,
  rider_id         INT,
  pickup_address   TEXT NOT NULL,
  dropoff_address  TEXT NOT NULL,
  recipient_name   VARCHAR(100) NOT NULL,
  recipient_phone  VARCHAR(20) NOT NULL,
  package_size     ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small',
  package_weight   DECIMAL(6,2),
  service_type     ENUM('instant', 'same_day', 'next_day') NOT NULL DEFAULT 'same_day',
  status           ENUM('pending', 'confirmed', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  price            DECIMAL(10,2) NOT NULL DEFAULT 0,
  notes            TEXT,
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (rider_id) REFERENCES riders(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_status_history (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  order_id   INT NOT NULL,
  status     VARCHAR(50) NOT NULL,
  notes      TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Indexes
CREATE INDEX idx_orders_sender ON orders(sender_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_tracking ON orders(tracking_number);
