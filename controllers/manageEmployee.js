const catchAsyncError = require("../middleware/catchAsyncError");
const Employee = require("../model/employee")
const mongoose = require("mongoose")



exports.createEmployee = catchAsyncError(async (req, res, next) => {
    const {name, email, mobileNumber , designation , gender , course} = req.body

    let img;
    
   
    if(req.file){
        img = `http://localhost:3000/uploads/user/${req.file.originalname}`
    }

    const employee = await Employee.create({
        name,
        email,
        mobileNumber,
        designation,
        gender,
        course,
        img
    });

    res.status(201).json({
        success: true,
        employee
    })

})

exports.getAllEmployees = catchAsyncError(async (req, res, next) => {
    
        // Fetch all employees from the database
        const employees = await Employee.find();

        // Send the retrieved employees as a response
        res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });
   
    
})


exports.updateEmployee = catchAsyncError(async (req, res, next) => {
    try {
        const employeeId = req.params.id;

       
        if (!mongoose.isValidObjectId(employeeId)) {
            return res.status(400).json({ error: 'Invalid employee ID' });
        }
        let avatar;

        if (req.file) {
            avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
        }
        
        const { name, mobileNumber, designation, gender, course } = req.body;

        // Update the employee document
        const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {
            name, mobileNumber, designation, gender, course, avatar
        });

        // Send the updated employee as a response
        res.json({ updatedEmployee });
    } catch (error) {
        // Handle internal server errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


exports.deleteEmployee = catchAsyncError(async (req, res, next) =>{

    const employeeId = req.params.id;
    
    const employee = await Employee.findById(employeeId);
    
    if(!employee) {
        return res.status(404).json({
            success: false,
            message: "employee not found"
        });
    }
    
    await Employee.deleteOne({ _id: employeeId });
   

    res.status(200).json({
        success: true,
        message: "employee Deleted!"
    })

})
