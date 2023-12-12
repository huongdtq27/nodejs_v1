import mongoose from "mongoose";
//Milo todo test push code
mongoose.set("strictQuery", true);

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 ~ file: database.js:11 ~ connect ~ success:");
    return connection;
  } catch (error) {
    console.log("🚀 ~ file: database.js:14 ~ connect ~ error:", error);
    throw new Error("Connect database fail");
  }
}
export default connect;
