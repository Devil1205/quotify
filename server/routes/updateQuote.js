const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');
const { body, validationResult } = require('express-validator');

router.patch('/quote/:id', [
    body('author',"Name must be atleast 6 characters").isLength({ min: 6 }),
    body('description',"Quote must be atleast 10 characters").isLength({ min: 10 }),
], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await Quote.findOneAndUpdate({_id:req.params.id},req.body);
    return res.json("Updated Quote Successfully");
})

module.exports = router;