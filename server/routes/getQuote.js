const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

//Get a random quote
router.get('/', async (req, res) => {
    const quote = await Quote.find();
    const rNum = Math.floor(Math.random() * quote.length);
    res.json(quote[rNum]);
})


//Filter a particular quote
router.get('/quote/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        // console.log(JSON.stringify(quote));
        if (JSON.stringify(quote)=='null') {
            return res.send("The quote doesn't exist");
        }
        return res.json(quote);
    }
    catch(e){
        res.json(e);
    }
})


//Get all the stored quotes
router.get('/quote',async (req,res)=>{
    const quote = await Quote.find();
    res.json(quote);
})

module.exports = router;