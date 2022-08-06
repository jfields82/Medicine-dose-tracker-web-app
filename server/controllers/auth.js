const User = require("../model/user");
var createError = require("http-errors");

// USER SIGNUP
const signup = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();

  res.json({ user, token });
};

// USER LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new Error("please provide username and password");
  }
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("user does not exist!");
  }

  // compare password
  const ispasswordCorrect = await user.comparepassword(password);
  if (!ispasswordCorrect) {
    throw new Error("Invalid password!");
  }
  const token = user.createJWT();

  res.json({ user: { username: user.username, userId: user._id }, token });

  console.log("login");
};

module.exports = { signup, login };
