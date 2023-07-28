const mongoose = require('mongoose');
require("dotenv").config();
const key = process.env.MONGO;

mongoose.connect(key)
.then(()=>{console.log("Connected to MongoDB")})
.catch((e)=>{console.log(e)});

module.exports = mongoose;