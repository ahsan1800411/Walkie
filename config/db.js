const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the MongoDB Database");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
