const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const options = {};

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { collection: "Users", discriminatorKey: "role"});

module.exports = mongoose.model('User', userSchema);
