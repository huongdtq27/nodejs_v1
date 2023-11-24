import { userRepository } from "../repositories/index.js";
import { EventEmitter } from "node:events";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import { validationResult } from "express-validator";

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

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  //call repository
  try {
    let existingUser = await userRepository.login({ email, password });

    res.status(HttpStatusCode.OK).json({
      message: "Login user successfully",
      data: existingUser,
    });
  } catch (exception) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: exception.toString(),
    });
  }
};

const getUserByName = async (req, res) => {
  console.log("🚀 milo2 use controller")
  try {
    const name = req?.params?.name;
    const user = await userRepository.getUserByName(name);
    res.status(HttpStatusCode.OK).json({
      message: "Get user successfully",
      data: user,
    });
  } catch (e) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
      message: e.toString(),
    });
  }
};
export default {
  register,
  login,
  getUserByName,
};
