const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contractorId: {
        type: Schema.Types.ObjectId,
        ref: "Contractor",
        required: true
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: "Contractor",
    }]
}, { collection: "Jobs"});

module.exports = mongoose.model('Job', jobSchema);