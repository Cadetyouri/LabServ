import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = join(__dirname, '../uploads');
if (!existsSync(uploadsDir)) {
  mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Initialize SQLite database
const db = new sqlite3.Database(join(__dirname, '../lab-devices.db'));

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS devices (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    ip TEXT NOT NULL,
    logo_path TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Endpoints

// Get all devices
app.get('/api/devices', (req, res) => {
  db.all('SELECT * FROM devices ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

// Get single device
app.get('/api/devices/:id', (req, res) => {
  db.get('SELECT * FROM devices WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).json({ error: 'Device not found' });
      return;
    }
    res.json(row);
  });
});

// Add new device with logo
app.post('/api/devices', upload.single('logo'), (req, res) => {
  const { name, ip } = req.body;
  const logo_path = req.file ? `/uploads/${req.file.filename}` : null;
  const id = Date.now().toString();

  if (!name || !ip) {
    res.status(400).json({ error: 'Name and IP are required' });
    return;
  }

  db.run(
    'INSERT INTO devices (id, name, ip, logo_path) VALUES (?, ?, ?, ?)',
    [id, name, ip, logo_path],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id, name, ip, logo_path });
    }
  );
});

// Update device
app.put('/api/devices/:id', upload.single('logo'), (req, res) => {
  const { name, ip } = req.body;
  const logo_path = req.file ? `/uploads/${req.file.filename}` : undefined;

  if (!name || !ip) {
    res.status(400).json({ error: 'Name and IP are required' });
    return;
  }

  let query = 'UPDATE devices SET name = ?, ip = ?';
  const params = [name, ip];

  if (logo_path !== undefined) {
    query += ', logo_path = ?';
    params.push(logo_path);
  }

  query += ' WHERE id = ?';
  params.push(req.params.id);

  db.run(query, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    db.get('SELECT * FROM devices WHERE id = ?', [req.params.id], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row);
    });
  });
});

// Delete device
app.delete('/api/devices/:id', (req, res) => {
  db.run('DELETE FROM devices WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
