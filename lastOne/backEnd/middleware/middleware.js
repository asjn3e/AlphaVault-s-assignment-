const jwt = require("jsonwebtoken");

const jwtSecret = "mysecretkey";

// middleware to check if user is authorized with JWT
const authorizeUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or missing token" });
  }
};

module.exports.authorizeUser = authorizeUser;
