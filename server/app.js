const express = require("express");
require("dotenv").config()
require("express-async-errors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const MedicineRouter = require("./routes/medicine");
const authentication = require("./middleware/authentication")

const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Medicine dose app");
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/medicine",authentication, MedicineRouter);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const startApp = async () => {
  try {
    await connectDB(process.env.MONGO_URI
    );
    app.listen(5000, () => {
      console.log("app is listening on port 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
