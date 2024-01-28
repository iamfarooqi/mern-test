import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import customerRoutes from './routes/customerRoutes.js'; // Note the '.js' extension
import connectDB from './config/database.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
connectDB()

app.use('/api', customerRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
