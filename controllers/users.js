import { validationResult } from "express-validator";

const login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.status(200).json({ email: req.body.email });
};

export default { login };
