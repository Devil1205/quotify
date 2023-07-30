const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');

router.delete('/quotifyAPI/quote/:id',async (req,res)=>{
    try{
    const data = await Quote.findByIdAndDelete(req.params.id);
    if(data===null)
        return res.status(400).json("Quote doesn't exist");
        return res.status(200).json("Quote deleted successfully");
    }
    catch(e){
        return res.status(400).json(e);
    }
})

module.exports = router;