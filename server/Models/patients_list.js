const mongoose = require("mongoose");

const Patients_listSchema = mongoose.Schema({
  Date: String,
  Clinic: String,
  Name: String,
  Operation: String,
  Sum: String,
  Comment: String,
});

module.exports = mongoose.model("Patients_listSchema", Patients_listSchema);
