import mongoose from 'mongoose';

const connectDB = async (url) => {
    try {
        mongoose.set('strictQuery', false);
        const connection = await mongoose.connect(url);
        console.log(`MongoDB Connected: ${connection.connection.host}`);
    } catch (err) {
        console.error('Database Connection Error:', err.message);
        process.exit(1);
    }
};

export default connectDB;