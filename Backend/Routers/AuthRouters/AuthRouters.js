// INITILISATION THE EXPRESS
const express = require("express");
const {
  registerController,
  loginController,
} = require("../../Controllers/authController/authController.js");
const authMiddleware = require("../../Middleware/authMiddleware/authMiddleware.js");
const roleMiddleware = require("../../Middleware/RoleMiddleware/RoleMiddleware.js");

// STORE THE EXPRESS DETAILS WITH ROUTER IN ONE VARIABLE
const authRouter = express.Router();

// REGISTER ROUTER
authRouter.post("/register", registerController);

// LOGIN ROUTER
authRouter.post("/login", loginController);

// GET DASHBOARDS
authRouter.get(
  "/adminDashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.status(200).json({
      message: `Welcome ${req.user.name} Admin Dashboard`,
      user: req.user,
    });
  },
);

authRouter.get(
  "/organizerDashboard",
  authMiddleware,
  roleMiddleware(["organizer"]),
  (req, res) => {
    res.status(200).json({
      message: `Welcome ${req.user.name} organizer Dashboard`,
      user: req.user,
    });
  },
);

authRouter.get(
  "/CustomerDashboard",
  authMiddleware,
  roleMiddleware(["customer"]),
  (req, res) => {
    res.status(200).json({
      message: `Welcome ${req.user.name} customer Dashboard`,
      user: req.user,
    });
  },
);

// MODULE EXPORT
module.exports = authRouter;
