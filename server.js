const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const dbPath = path.join(__dirname, 'api', 'db.json');
let db = {};

try {
  const dbContent = fs.readFileSync(dbPath, 'utf8');
  db = JSON.parse(dbContent);
  console.log('Database loaded successfully');
  console.log('Available endpoints:');
  Object.keys(db).forEach(key => {
    console.log(`  GET http://localhost:${PORT}/${key}`);
  });
} catch (error) {
  console.error('Error loading database:', error.message);
  process.exit(1);
}

app.get('/events', (req, res) => {
  console.log('GET /events - Request received');
  console.log('Sending events:', db.events?.length || 0, 'items');
  res.json(db.events || []);
});

app.get('/groups', (req, res) => {
  console.log('GET /groups - Request received');
  console.log('Sending groups:', db.groups?.length || 0, 'items');
  res.json(db.groups || []);
});

app.get('/discover', (req, res) => {
  console.log('GET /discover - Request received');
  console.log('Sending discover:', db.discover ? 'object' : 'null');
  res.json(db.discover || {});
});

app.get('/rewards', (req, res) => {
  console.log('GET /rewards - Request received');
  console.log('Sending rewards:', db.rewards?.length || 0, 'items');
  res.json(db.rewards || []);
});

app.get('/profile', (req, res) => {
  console.log('GET /profile - Request received');
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    user: {
      id: '1',
      name: 'محمد أحمد',
      points: 750,
      email: 'mohamed@example.com'
    }
  });
});

app.use((req, res, next) => {
  console.log('404 - Route not found:', req.originalUrl);
  res.status(404).json({ 
    error: 'Route not found', 
    availableRoutes: Object.keys(db).map(key => `/${key}`).concat('/profile')
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📊 CORS enabled for all origins');
  console.log('🔍 Test endpoints:');
  console.log(`   http://localhost:${PORT}/events`);
  console.log(`   http://localhost:${PORT}/groups`);
  console.log(`   http://localhost:${PORT}/discover`);
  console.log(`   http://localhost:${PORT}/rewards`);
  console.log(`   http://localhost:${PORT}/profile`);
});

module.exports = app;