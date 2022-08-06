const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    // userNewUrlParser: true,
    useUnifiedTopology:true,
  });
};

module.exports = connectDB;
