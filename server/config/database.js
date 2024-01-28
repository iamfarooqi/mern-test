import mongoose from 'mongoose';
import 'dotenv/config';

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(
        process.env.MONGODB_URI,
        options
    );
      console.log('Database connected');
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
  }
};

export default connectDB;