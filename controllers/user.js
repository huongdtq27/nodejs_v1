import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const myEvent = new EventEmitter();
//listen
myEvent.on("event.register.user", (params) => {
  console.log(`They talked about : ${JSON.stringify(params)}`);
});

const register = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  //Event Emitter
  myEvent.emit("event.register.user", { email, phoneNumber });
  try {
    const user = await userRepository.register({
      name,
      email,
      password,
      phoneNumber,
      address,
    });
    res.status(HttpStatusCode.INSERT_OK).json({
      message: "Register user successfully",
      data: user,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};
export default {
  register,
};
