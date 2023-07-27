const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema(
    {
        author: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    })
    module.exports = mongoose.model('Quote',QuoteSchema);