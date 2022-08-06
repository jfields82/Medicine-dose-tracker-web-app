const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: [true, "Please provide medicine"],
  },
  dosage: {
    type: Number,
    required: [true, "Please provide dosage"],
    
  },
  frequency: {
    type: Number,
    required: [true, "Please provide frequency"],
    
  },

  MedUser:{
    type:mongoose.Types.ObjectId,
    ref:"User", 
    required:[true, "provide user"]
  }

}, {timestamps:true});







module.exports = mongoose.model("Medicine", MedicineSchema);
