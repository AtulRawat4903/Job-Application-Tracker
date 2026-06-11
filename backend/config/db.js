const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        console.log("URI Loaded:", process.env.MONGODB_URI);

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;