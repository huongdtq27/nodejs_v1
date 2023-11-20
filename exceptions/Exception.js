export default class Exception extends Error {
  static WRONG_DB_USERNAME_PASSWORD = "Wrong username and password";
  static WRONG_CONNECTION_STRING = "Wrong server name/connection string";
  static CANNOT_CONNECT_MONGODB = "Cannot connect to Mongoose";
  static USER_EXIST = "User already exists";
  static CANNOT_REGISTER_USER = "Cannot register user";
  static WRONG_EMAIL_AND_PASSWORD = "Wrong email and password";
  static NOT_HAVE_PERMISSION = "You do not have permission";

  constructor(message, validationErrors = {}) {
    super(message); //call constructor of parent class(Error)
    this.validationErrors = validationErrors;
  }
}
