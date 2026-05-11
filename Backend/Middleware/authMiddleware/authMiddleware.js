const jwt = require("jsonwebtoken");
const dotenv=require('dotenv').config('')
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    // Bearer token split
    const splitToken = token.split(" ")[1];

    const verifyToken = jwt.verify(
      splitToken,
      process.env.SECRET_KEY
    );

    req.user = verifyToken;

    next();
  } catch (error) {
    console.log("middleware error:", error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;