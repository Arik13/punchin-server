const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
}, { collection: "Employees"});

module.exports = mongoose.model('Employees', employeeSchema);