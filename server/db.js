import mongoose from "mongoose";

const dbConnection = async (cb) => {
  try {
    const response = await mongoose.connect(process.env.DB_URI);
    return cb();
  } catch (error) {
    console.log(`error:at db.js${error.message}`);
  }
};

export default dbConnection;
