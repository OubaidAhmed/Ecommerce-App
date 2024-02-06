import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routers/productRoutes.js';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes.js';

dotenv.config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myecommerce';


app.use(express.json());

mongoose.connect(MONGODB_URI);  // Add options to the connection

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send("App is running")
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.post('/api/orders', (req, res) => {
  // Handle order creation logic here
  // Example: Save order details to a database

  res.status(200).json({ message: 'Order placed successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
