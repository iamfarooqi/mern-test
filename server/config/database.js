import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(
            'mongodb+srv://mern-db:mern-db@cluster0.hoi8ofk.mongodb.net/test',
            options
        );
        console.log('Database connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectDB;