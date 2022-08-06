const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username already exists"],
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 4,
  },
  address: {
    type: String,
    required: [true, "please provide address"],
  },
  DOB: {
    type: Date,
    required: [true, "please provide date of birth"],
  },
});

// hash password

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password

UserSchema.methods.comparepassword = async function (InputPassword) {
  return await bcrypt.compare(InputPassword, this.password);
};

// Create JWT
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", UserSchema);
