const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected");
  } catch (err) {
    console.error("unable to connect to DB", err);
    process.exit(1);
  }
};
module.exports = connectDB;
