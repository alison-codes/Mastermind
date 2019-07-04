const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
    initials: {
        type: String,
        // required: true,
        maxLength: 5
    },
    numGuesses: {
        type: Number,
        required: true,
        minLength: 1
    },
    seconds: {
        type: Number,
        // required: true,
    },
}, {
        timestamps: true
    });

scoreSchema.pre('save', function (next) {
    this.initials = this.initials.substr(0, 3).toUpperCase();
    next();
});



module.exports = mongoose.model('Score', scoreSchema);