const express = require('express');
const app = express();
require('./db/connectDB')

app.use(express.json());

app.use(require('./routes/addQuote'));
app.use(require('./routes/getQuote'));
app.use(require('./routes/updateQuote'));

app.listen(5000,()=>{
    console.log("Listening on port 5000");
})