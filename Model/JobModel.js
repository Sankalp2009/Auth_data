const mongoose = require("mongoose");
const JobSchema = mongoose.Schema({
  company: { 
    type: String, 
     required: [true, "Please enter a your Company"], },
  position: { 
    type: String, 
     required: [true, "Please enter a your Position"], },
  location: { 
    type: String, 
     required: [true, "Please enter a your Location"], },
  contract: { 
    type: String, 
     required: [true, "Please enter a your Contract"], },
});
const Job = mongoose.model('Job', JobSchema)
module.exports = Job