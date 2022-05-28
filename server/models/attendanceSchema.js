const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    student_name: {
        type: String,
        required: true
    },
    student_department: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    student_enrollment_no: {
        type: Number,
        required: true
    },
    subject_name: {
        type: String,
        required: true
    },
    attendance_time: {
        type: String,
        required: true
    }
});

const Attendance = new mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;