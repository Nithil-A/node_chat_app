// This file will localize the configuration details like port, ip and other key values that stores in the env,
// the env file will be selected based on the running environment 

const dotenv = require("dotenv");
const path = require("path");

// Dynamic environment file configuration 
dotenv.config({
    path: path.resolve(__dirname, `env/${process.env.NODE_ENV}.env`)
});

module.exports = {
    PORT : process.env.PORT,
    Mongo_URI : process.env.Mongo_URI,
    JWT_SECRET : process.env.JWT_SECRET
}
