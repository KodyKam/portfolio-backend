// config.js
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI || "mongodb+srv://bigachiever:inCanada31@cluster0.fk33n7t.mongodb.net/Portfolio?retryWrites=true&w=majority&appName=Cluster0"
};

export default config;