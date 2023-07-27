const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Quotify")
.then(()=>{console.log("Connected to MongoDB")})
.catch((e)=>{console.log(e)});

module.exports = mongoose;