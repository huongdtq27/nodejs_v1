import { User } from "../models/index.js";
import Exception from "../exceptions/Exception.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//temporary mapping role function :)
const mappingRoles = (email) => {
  if (email == "milo@gmail.com") {
    return "admin";
  }
  return "normal-user";
};

const register = async ({ name, email, password, phoneNumber, address }) => {
  const existingUser = await User.findOne({ email }).exec();
  if (!!existingUser) {
    throw new Exception(Exception.USER_EXIST);
  }

  const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  //insert to db
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
    role: mappingRoles(email),
  });

  return {
    ...newUser._doc,
    password: "Not show",
  };
};

const login = async ({ email, password }) => {
  let existingUser = await User.findOne({ email }).exec();
  if (!existingUser) throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);

  let isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) throw new Exception(Exception.WRONG_EMAIL_AND_PASSWORD);

  //create Json Web Token
  let token = jwt.sign(
    {
      data: existingUser,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30 days",
    }
  );

  //clone an add more properties
  return {
    ...existingUser.toObject(),
    password: "not show",
    token: token,
  };
};

const getUserByName = async (name) => {
  const existedUser = await User.findOne({ name });
  if (!existedUser) {
    throw new Exception("Not found user with name" + name);
  }
  return { ...existedUser.toObject(), password: "not show" };
};

export default {
  register,
  login,
  getUserByName,
};
