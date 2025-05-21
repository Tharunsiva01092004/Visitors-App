const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'visitor_entry_db'
};

// Create connection pool instead of single connection
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'visitor_entry_db'
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release();
  
  // Create table if not exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS visitors (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      apartmentNumber VARCHAR(50) NOT NULL,
      vehicleType VARCHAR(100) NOT NULL,
      vehicleNumber VARCHAR(50) NOT NULL,
      purposeofVisit TEXT NOT NULL,
      durationofVisit VARCHAR(100) NOT NULL,
      dateofEntry DATE NOT NULL,
      entryTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
    } else {
      console.log('Visitors table created or already exists');
    }
  });
});

// Validation middleware
const validateVisitor = (req, res, next) => {
  const visitor = req.body;
  const requiredFields = [
    'username',
    'apartmentNumber',
    'vehicleType',
    'vehicleNumber',
    'purposeofVisit',
    'durationofVisit',
    'dateofEntry'
  ];

  // Check for missing fields
  const missingFields = requiredFields.filter(field => !visitor[field]);
  if (missingFields.length > 0) {
    return res.status(400).json({
      error: 'Missing required fields',
      fields: missingFields
    });
  }

  // Validate date format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(visitor.dateofEntry)) {
    return res.status(400).json({
      error: 'Invalid date format',
      message: 'Date should be in YYYY-MM-DD format'
    });
  }

  next();
};

// Routes
app.post('/api/visitors', validateVisitor, (req, res) => {
  const visitor = req.body;
  const query = 'INSERT INTO visitors SET ?';
  
  // Format date to MySQL format
  try {
    visitor.dateofEntry = new Date(visitor.dateofEntry).toISOString().split('T')[0];
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid date',
      message: 'Could not parse the provided date'
    });
  }

  db.query(query, visitor, (err, result) => {
    if (err) {
      console.error('Error saving visitor:', err);
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          error: 'Duplicate entry',
          message: 'A visitor with these details already exists'
        });
      }
      return res.status(500).json({
        error: 'Database error',
        message: 'Error saving visitor data',
        details: err.message
      });
    }
    res.status(201).json({
      message: 'Visitor entry recorded successfully',
      id: result.insertId
    });
  });
});

app.get('/api/visitors', (req, res) => {
  const query = 'SELECT *, DATE_FORMAT(dateofEntry, "%Y-%m-%d") as dateofEntry FROM visitors ORDER BY entryTime DESC';
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching visitors:', err);
      res.status(500).json({ error: 'Error fetching visitor data' });
    } else {
      res.json(results);
    }
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
