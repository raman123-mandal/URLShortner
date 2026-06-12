
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);// Set strictQuery to true to avoid deprecation warning 

async function connectDB(url) {
    return mongoose.connect(url);
}

module.exports = connectDB;
