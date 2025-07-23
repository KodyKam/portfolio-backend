// //server.js
// import dotenv from 'dotenv';
// dotenv.config();

// import cors from 'cors';
// import config from './server/config/config.js';
// import app from './server/express.js';
// import mongoose from 'mongoose';

// const allowedOrigins = [
//   'http://localhost:3000',
//   'https://kodykam.netlify.app'
// ];


// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // Import route modules
// import authRoutes from './server/routes/auth.routes.js';

// mongoose.Promise = global.Promise;

// mongoose.connect(config.mongoUri, {
//   // useNewUrlParser: true,
//   // useCreateIndex: true,
//   // useUnifiedTopology: true
// }).then(() => {
//   console.log(`Connected to the database! ${new Date().toLocaleString()}`);
// });

// mongoose.connection.on('error', () => {
//   throw new Error(`Unable to connect to database: ${config.mongoUri}`);
// });

// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to My Portfolio application.' });
// });


// app.listen(config.port, (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.info(`Server started on port ${config.port} at ${new Date().toLocaleString()}.`);
// });


// server.js
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './server/express.js';
import config from './server/config/config.js';

// Connect to MongoDB
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri, {
  // You can uncomment if needed
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
}).then(() => {
  console.log(`Connected to the database! ${new Date().toLocaleString()}`);
}).catch((err) => {
  throw new Error(`Unable to connect to database: ${config.mongoUri}`);
});

// Basic root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to My Portfolio application.' });
});

// Start server
app.listen(config.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info(`Server started on port ${config.port} at ${new Date().toLocaleString()}.`);
});