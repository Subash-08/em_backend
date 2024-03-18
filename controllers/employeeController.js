

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const E_User = require("../model/em_user");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.signUp = catchAsyncError(async (req, res, next) => {
 
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await E_User.create({name, email, password :hashedPassword});

    sendToken(user,200,res)
  
})

exports.login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400))
    }


    const user = await E_User.findOne({ email }).select('+password');
    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }


    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) return  next(new ErrorHandler('Invalid email or password', 401))

    // const exp = Date.now() + 1000 * 60 * 60 * 24 * 30;
    // const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);

    // res.cookie("Authorization", token, {
    //   expires: new Date(exp),
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: process.env.NODE_ENV === "production",
    // });

    // send it
    sendToken(user, 201, res)
  
})

exports.logout = (req, res, next) => {
  
    res.cookie('token',null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })
 
}


