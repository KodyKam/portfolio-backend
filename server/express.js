//server/express.js
import { requireSignin } from './controllers/auth.controller.js';
import express from "express";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

// Route imports
import userRoutes from "./routes/user.routes.js";
import contactRoutes from './routes/contact.routes.js';
import projectRoutes from "./routes/project.routes.js";
import educationRoutes from "./routes/education.routes.js";
import authRoutes from "./routes/auth.routes.js";

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

app.get('/api/secret', requireSignin, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.auth // this contains the decoded token payload
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use('/api/contacts', contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", educationRoutes);
app.use("/api/auth", authRoutes); // ✅ Match frontend
// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// Error handler
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;