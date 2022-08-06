const jwt = require("jsonwebtoken");

const user = require("../model/user");

const authentication = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("invalid authentication");
  }

  const token = authHeader.split(" ")[1];

  // verify token
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = { userId: payload.userId, username: payload.username };
    next();
  } catch (error) {
    throw new Error("invalid authentication");
  }
};

module.exports = authentication;
