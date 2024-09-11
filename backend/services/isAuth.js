const jwt = require("jsonwebtoken");
const generateError = require("../generateError");
module.exports = isAuth = (req, res, next) => {
  const bearer = req.get("Authorization");
  try {
    if (!bearer) {
      throw generateError("not authorized", 401);
    }
    const token = bearer.split(" ")[1];
    const match = jwt.verify(token, process.env.JWT_KEY);
    if (!match) {
      throw generateError("not authorized", 401);
    }
    req.userId = match.user.id;

    next();
  } catch (error) {
    next(error);
  }
};
