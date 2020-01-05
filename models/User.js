const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    role: {
        // type: Schema.Types.ObjectId,
        // refPath: "role"
        type: String,
        required: true
    },
    shifts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Shift'
        }
    ],
    // roleModel: {
    //     type: String,
    //     required: true,
    //     enum: ["Contractor", "Employee"]
    // }

});

module.exports = mongoose.model('User', userSchema);
