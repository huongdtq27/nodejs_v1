import Exception from "../exceptions/Exception.js";
import HttpStatusCode from "../exceptions/HttpStatusCode.js";
import jwt from "jsonwebtoken";

export function checkTokenExpired(req, res, next) {
  //bypass login, register
  if (req.url.toLowerCase().trim() == "/users/login" || req.url.toLowerCase().trim() == "/users/register") {
    next();
    return;
  }
  //other requests
  //get and validate token
  const token = req.headers?.authorization?.split(" ")[1];
  try {
    const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
    const isExpired = Date.now() >= jwtObject.exp * 1000;

    if (isExpired) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Token is expired",
      });
      res.end();
    } else {
      next();
      return;
    }
  } catch (exception) {
    res.status(HttpStatusCode.BAD_REQUEST).json({
      message: exception.message,
    });
  }
}

//Check permission by role from req.body => but client can hardcode?
export function checkPermission(roles) {
  return (req, res, next) => {
    const role = req.body?.user?.role;
    if (!roles.includes(role)) {
      res.status(HttpStatusCode.NOT_HAVE_PERMISSION).json({ message: "Not have permission" });
      res.end();
    }
    next();
  };
}

//Check permission by checking data.role from token
export function checkPermissionByToken(validRoles) {
  return (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];
    try {
      const jwtObject = jwt.verify(token, process.env.JWT_SECRET);
      //jwtObject can be: { data: { role: 'admin' }, iat: 1700409669, exp: 1703001669 }
      const role = jwtObject?.data?.role;
      if (!role || !validRoles.includes(role)) {
        res.status(HttpStatusCode.NOT_HAVE_PERMISSION).json({ message: "Not have permission" });
        res.end();
        return;
      }
      next();
    } catch (exception) {
      res.status(HttpStatusCode.NOT_HAVE_PERMISSION).json({
        message: exception.message,
      });
    }
  };
}
