import { validationResult } from "express-validator";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({ errors: errors.array() });
  }
  res.status(HttpStatusCode.OK).json({ email: req.body.email });
};

export default { login };
