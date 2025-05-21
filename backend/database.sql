-- Create the database
CREATE DATABASE IF NOT EXISTS visitor_entry_db;
USE visitor_entry_db;

-- Create visitors table
DROP TABLE IF EXISTS visitors;
CREATE TABLE visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    apartmentNumber VARCHAR(50) NOT NULL,
    vehicleType VARCHAR(100) NOT NULL,
    vehicleNumber VARCHAR(50) NOT NULL,
    purposeofVisit TEXT NOT NULL,
    durationofVisit VARCHAR(100) NOT NULL,
    dateofEntry DATE NOT NULL,
    entryTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);