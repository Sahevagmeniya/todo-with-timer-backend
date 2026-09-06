import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log("Database connection faild. Error", error);
    process.exit(1);
  }
};
