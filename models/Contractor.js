const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");


const contractorSchema = new Schema({
    company: {
        type: String,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }],
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }]
}, { collection: "Contractors", discriminatorKey: "role"});

// module.exports = mongoose.model('Contractor', contractorSchema);
module.exports = User.discriminator("Contractor", contractorSchema);


////////////////////////////////////////////////////////////////////
