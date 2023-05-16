const mongoose = require('mongoose');
const defaultSchema = mongoose.Schema(
    {
        value: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);


module.exports = defaultSchema;