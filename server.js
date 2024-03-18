if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
  }

const express = require("express");
const connectToDb = require("./config/connectToDB");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userController = require("./controllers/employeeController")
const errorMiddleware = require("./middleware/error")
const manageEmployee = require("./controllers/manageEmployee")

const app = express();
const multer = require('multer');
const path = require('path');
const requireAuth = require("./middleware/requireAuth");

const upload = multer({storage: multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join( __dirname,'..' , 'uploads/Images' ) )
    },
    filename: function(req, file, cb ) {
        cb(null, file.originalname)
    }
}) })

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectToDb();

app.get("/",(req,res)=>{
    res.send("hello")
  })

app.post("/signup", userController.signUp);
app.post("/login", userController.login);
app.get("/logout", userController.logout);
app.post("/create",upload.single('img'),manageEmployee.createEmployee)
app.get('/employeeslist', manageEmployee.getAllEmployees);
app.put('/employee/:id', manageEmployee.updateEmployee);
app.delete('/employeeDelete/:id',manageEmployee.deleteEmployee)

app.use(errorMiddleware)

app.listen(3000);
