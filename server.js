// server.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './server/express.js';
import config from './server/config/config.js';
import authRoutes from './server/routes/auth.routes.js';
import contactRoutes from './server/routes/contact.routes.js'; // ← NEW
import bodyParser from 'body-parser';

// JSON parsing (harmless if already in express.js)
app.use(bodyParser.json());

// Mount API routes
app.use('/api', authRoutes);

// Mount contact routes (delegates to controller)
// If you're already mounting this inside server/express.js, remove one of them to avoid double-mounting.
app.use('/api/contact', contactRoutes);

// Optional home route
app.get('/', (req, res) => {
  res.send('API running...');
});

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {})
  .then(() => {
    console.log(`Connected to the database! ${new Date().toLocaleString()}`);
  })
  .catch(() => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
  });

// Start server
app.listen(config.port, (err) => {
  if (err) console.error(err);
  console.info(`Server started on port ${config.port} at ${new Date().toLocaleString()}.`);
});