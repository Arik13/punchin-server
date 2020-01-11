const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeCodeSchema = new Schema({
    contractorId: {
        type: Schema.Types.ObjectId,
        ref: "Contractor",
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    issuedDate: {
        type: Schema.Types.Date,
        required: true,
    }
}, { collection: "EmployeeCodes"});

module.exports = mongoose.model('EmployeeCode', employeeCodeSchema);