// mongo db connection 
const mongoose = require('mongoose');
const config = require("../../config");
// Connect to mongo db and export connection. 
const connectDB = async () => {
    try {
        await mongoose.connect(config.Mongo_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('Database Connected Successfully...');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;