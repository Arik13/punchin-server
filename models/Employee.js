const mongoose = require('mongoose');
const User = require("./User");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    contractorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: "Job"
    }]
}, { collection: "Employees", discriminatorKey: "role"});

// module.exports = mongoose.model('Employee', employeeSchema);
module.exports = User.discriminator("Employee", employeeSchema);