import mongoose from "mongoose";

mongoose.set("strictQuery", true);

// const MONGO_URI =
//   "mongodb+srv://huongdtq27:Hunmilo271194m1@cluster0.wqnye7y.mongodb.net/nodejs_v1?retryWrites=true&w=majority";

async function connect() {
  try {
    let connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("🚀 ~ file: database.js:11 ~ connect ~ success:");
    return connection;
  } catch (error) {
    console.log("🚀 ~ file: database.js:14 ~ connect ~ error:", error);
  }
}
export default connect;
