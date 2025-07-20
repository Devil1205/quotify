const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const passport = require("passport");
const rateLimiter = require('./middleware/rateLimiter');

require('./db/connectDB');
require("./config/passport");

app.use(cors({
    origin:'*'
}))
app.use(express.json());
app.use(passport.initialize());
app.use(rateLimiter(5,10));

app.use(require('./routes/quote/addQuote'));
app.use(require('./routes/quote/getQuote'));
app.use(require('./routes/quote/updateQuote'));
app.use(require('./routes/quote/deleteQuote'));
app.use(require('./routes/user/createUser'));
app.use(require('./routes/user/loginUser'));
app.use(require('./routes/user/verifyUser'));
app.use(require('./routes/user/forgotPassword'));

app.listen(port,()=>{
    console.log("Listening on port 5000");
})