import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './server/express.js';
import config from './server/config/config.js';
import authRoutes from './server/routes/auth.routes.js'; // ← You likely need to import this

// Mount API routes
app.use('/api', authRoutes);

// Optional home route
app.get('/', (req, res) => {
  res.send('API running...');
});

// Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log(`Connected to the database! ${new Date().toLocaleString()}`);
}).catch((err) => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// Start server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server started on port ${config.port} at ${new Date().toLocaleString()}.`);
});