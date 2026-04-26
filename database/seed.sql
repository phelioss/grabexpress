-- GrabExpress Sample Data
-- Run AFTER schema.sql

USE grabexpress;

-- Sample users (password is 'password123' for all)
INSERT INTO users (name, email, phone, password_hash, role) VALUES
('Juan Dela Cruz', 'juan@example.com', '09171234567', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer'),
('Maria Santos', 'maria@example.com', '09189876543', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer'),
('Pedro Reyes', 'pedro@example.com', '09201122334', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'rider'),
('Admin User', 'admin@grabexpress.com', '09001234567', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin');

-- Sample rider
INSERT INTO riders (user_id, vehicle_type, license_plate, status, rating, total_deliveries) VALUES
(3, 'motorcycle', 'NCR-1234', 'available', 4.85, 152);

-- Sample orders
INSERT INTO orders (tracking_number, sender_id, rider_id, pickup_address, dropoff_address, recipient_name, recipient_phone, package_size, package_weight, service_type, status, price, notes) VALUES
('GE-20240101-ABCD', 1, 1, '123 Bonifacio St, Makati City', '456 Ayala Ave, BGC, Taguig', 'Ana Reyes', '09171234000', 'small', 0.50, 'same_day', 'delivered', 90.00, 'Fragile - handle with care'),
('GE-20240102-EFGH', 1, 1, '789 EDSA, Quezon City', '321 Shaw Blvd, Mandaluyong', 'Carlo Cruz', '09189990000', 'medium', 2.30, 'instant', 'in_transit', 180.00, NULL),
('GE-20240103-IJKL', 1, NULL, '22 Taft Ave, Manila', '88 España Blvd, Sampaloc', 'Liza Gomez', '09201002233', 'large', 8.50, 'next_day', 'pending', 150.00, 'Contains electronics'),
('GE-20240104-MNOP', 2, 1, '5 Katipunan Ave, QC', '10 Aurora Blvd, Cubao', 'Mark Villanueva', '09171002244', 'small', 0.20, 'same_day', 'confirmed', 90.00, NULL),
('GE-20240105-QRST', 2, NULL, '300 Ortigas Ave, Pasig', '150 Pioneer St, Mandaluyong', 'Grace Lim', '09189003355', 'medium', 3.10, 'next_day', 'cancelled', 90.00, NULL);
