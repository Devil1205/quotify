const express = require('express');
const router = express.Router();
const Quote = require('../../models/quote');
const fetchUser = require('../../middleware/fetchUser');
const { redis } = require('../../db/connectDB');

//Get a random quote
router.get('/quotifyAPI/', async (req, res) => {
    const quote = await Quote.find();
    const rNum = Math.floor(Math.random() * quote.length);
    res.json(quote[rNum]);
})

//Get all user quotes
router.get('/quotifyAPI/quotes',async (req,res)=>{
    const cachedQuotes = await redis.get('quotes');
    if(cachedQuotes){
        return res.json({quote: JSON.parse(cachedQuotes)});
    }
    const quote = await Quote.find();
    redis.set('quotes',JSON.stringify(quote));
    res.json(quote);
})

//Get logged in user quotes
router.get('/quotifyAPI/myQuotes',fetchUser,async (req,res)=>{
    try {
        const userId = req.user.id;
        const cachedQuotes = await redis.get(`quotes:${userId}`);
        if(cachedQuotes){
            return res.status(200).json({data: JSON.parse(cachedQuotes)});
        }
        const data = await Quote.find({user: userId});
        await redis.set(`quotes:${userId}`,JSON.stringify(data));
        res.status(200).json(data);
    }
    catch(e){
        return res.status(500).json({error: "Internal server error"});
    }
})

module.exports = router;