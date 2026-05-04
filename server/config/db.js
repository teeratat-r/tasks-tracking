const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log('connectDB Success');
    } catch (error) {
        console.log('connectDB ERROR:', error);
    }
}

module.exports = connectDB;