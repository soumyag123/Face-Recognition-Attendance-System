const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const facultySchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm_password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

facultySchema.methods.generateAuthToken = async function () {
    try {
        
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}
// defining faculty model

const Faculty = new mongoose.model('Faculty', facultySchema);

module.exports = Faculty;