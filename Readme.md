# Empower Change Fundation

Database 
This section documents the SQL schema and sample data for the `empower_change` database.

Prerequisites
- MySQL server (client access)
- Ubuntu 24.04.3 or higher

Quick setup
1. Save the SQL below into a file, e.g. `empower_change.sql`.
2. Run: `mysql -u <user> -p < empower_change.sql`

SQL to create database, tables and sample data:

    CREATE DATABASE empower_change;
    
    USE empower_change;
    
    -----------

    CREATE TABLE donors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        amount DECIMAL(10, 2),
        date DATE
    );

    INSERT INTO donors (name, email, amount, date) VALUES
    ('Javi', 'javi@example.com', 500.00, '2026-04-10'),
    ('John Doe', 'john.doe@humber.ca', 150.00, '2026-04-11');

    -----------

    CREATE TABLE volunteers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        program VARCHAR(100),
        date DATE
    );

    INSERT INTO volunteers (name, program, date) VALUES
    ('Jane Smith', 'Community Outreach', '2026-04-12'),
    ('Emily Johnson', 'Digital Literacy', '2026-04-13');

    -------------

    CREATE TABLE timesheets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_of_person VARCHAR(100),
        date DATE,
        hours DECIMAL(4, 2)
    );

    INSERT INTO timesheets (name_of_person, date, hours) VALUES
    ('Javi', '2026-04-13', 8.0),
    ('Jane Smith', '2026-04-13', 4.5);

