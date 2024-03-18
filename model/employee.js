const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        trim: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email address'
        ]
    },
    mobileNumber: {
        type: String,
        required: [true, 'Please enter your mobile number'],
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    designation: {
        type: String,
        required: [true, 'Please select a designation'],
        enum: ['HR', 'Manager', 'Sales']
    },
    gender: {
        type: String,
        required: [true, 'Please select your gender'],
        enum: ['Male', 'Female']
    },
    course: {
        type: String,
        required: [true, 'Please select your course'],
        enum: ['MCA', 'BCA', 'BSC']
    },
    img: {
        type: String,
        required: false // Assuming image is optional
    }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
