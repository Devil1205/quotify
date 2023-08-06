const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('./db/connectDB')

app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.use(require('./routes/quote/addQuote'));
app.use(require('./routes/quote/getQuote'));
app.use(require('./routes/quote/updateQuote'));
app.use(require('./routes/quote/deleteQuote'));
app.use(require('./routes/user/createUser'));
app.use(require('./routes/user/loginUser'));
app.use(require('./routes/user/verifyUser'));

app.listen(port,()=>{
    console.log("Listening on port 5000");
})