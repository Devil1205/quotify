const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('./db/connectDB')

app.use(cors({
    origin:'*'
}))
app.use(express.json());

app.use(require('./routes/addQuote'));
app.use(require('./routes/getQuote'));
app.use(require('./routes/updateQuote'));
app.use(require('./routes/deleteQuote'));

app.listen(port,()=>{
    console.log("Listening on port 5000");
})