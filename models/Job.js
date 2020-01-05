const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
}, { collection: "Jobs"});

module.exports = mongoose.model('Job', jobSchema);