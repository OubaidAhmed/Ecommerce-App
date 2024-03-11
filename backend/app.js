import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import productRoutes from './routers/productRoutes.js';
import dotenv from 'dotenv';
import userRoutes from './routers/userRoutes.js';
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;



mongoose.set('strictQuery', false);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected To Database`);
  })
  .catch((err) => console.log("MongoDB not connected"));

app.use('/api', productRoutes);
app.use('/api/users', userRoutes);


app.use(express.static(path.resolve(__dirname, "frontend", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("App is running")
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.post('/api/orders', (req, res) => {
  res.status(200).json({ message: 'Order placed successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;