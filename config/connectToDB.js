const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect("mongodb+srv://Subash:Xeit856ozfDzBd8S@cluster0.t2b42id.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to database");
  } catch (err) {
    console.log(err);
  }
}

module.exports = connectToDb;
