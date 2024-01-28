import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';

import customerRoutes from './routes/customerRoutes.js';
import connectDB from './config/database.js';

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
connectDB()

app.get('/', (req, res) => {
  res.send('Server is running ok!');
})

app.use('/customer', customerRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
