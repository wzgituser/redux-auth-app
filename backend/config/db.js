const { mongo } = require("mongoose");
const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const client = await mongoose.connect(process.env.MONGO_URI);
    await console.log(`MongoDB connected: ${client.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDb;
