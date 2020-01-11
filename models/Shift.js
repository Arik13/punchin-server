const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startTime: {
        type: Schema.Types.Date,
        required: true
    },
    endTime: {
        type: Schema.Types.Date,
    }
}, { collection: "Shifts"});

module.exports = mongoose.model('Shift', shiftSchema);