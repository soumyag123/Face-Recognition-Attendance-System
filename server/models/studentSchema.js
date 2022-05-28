const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    enrollment_no: {
        type: Number,
        required: true
    },
    birth_date: {
        type: Date,
    },
    email: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
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
    image: {
        type: String
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

// generating authentication token

studentSchema.methods.generateAuthToken = async function () {
    try {
        
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {
        console.log(error);
    }
}

// Defining student model

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
