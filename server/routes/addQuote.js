const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');
const { body, validationResult } = require('express-validator');

router.post('/quote', [
    body('author',"Name must be atleast 6 characters").isLength({ min: 6 }),
    body('description',"Quote must be atleast 10 characters").isLength({ min: 10 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //if same quote already exists
    const isUnique = await Quote.find({ description: req.body.description });
    if (isUnique.length !== 0) {
        return res.status(400).send("Sorry this quote already exists.");
    }

    const quote = new Quote({
        author: req.body.author,
        description: req.body.description,
    });
    await quote.save();
    return res.send(req.body);
})

module.exports = router;