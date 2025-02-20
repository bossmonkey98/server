import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { json } from 'body-parser';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Database connection
const DB_URI = process.env.DB_URI||'';
mongoose
  .connect(DB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Test Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Scheduler API');
});

// Example Route for setting a schedule
app.post('/api/schedules', (req: Request, res: Response) => {
  // Here you would add logic to save schedules
  const { task, startTime, endTime, repeat } = req.body;
  if (!task || !startTime || !endTime) {
    return res.status(400).json({ error: 'Task, start time, and end time are required' });
  }

  // Example mock schedule saving logic
  const schedule = {
    task,
    startTime,
    endTime,
    repeat,
  };

  return res.status(201).json({ message: 'Schedule created successfully', schedule });
});

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
