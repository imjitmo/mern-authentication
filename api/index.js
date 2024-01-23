import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

//dotenv config
dotenv.config();

// Server Setup and Routes
const port = 5000; // Sub Port

const app = express();
app.use(express.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

// Server Gateway Reponse
app.listen(process.env.PORT || port, () => {
  console.log(`API is now online on port: ${process.env.PORT || port}`);
});
