import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js'; // Note the '.js' extension

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', customerRoutes);

mongoose
  .connect('mongodb://localhost:27017/customerDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB:', err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
