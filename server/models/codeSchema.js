const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

const Code = new mongoose.model('Code', codeSchema);

module.exports = Code;