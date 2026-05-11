// EXPORTING THE ALL FROM THE AUTHMODEL
const admin = require("../../Model/authModel/adminSchema.js");
const customer = require("../../Model/authModel/customerSchema.js");
const organizer = require("../../Model/authModel/organizerSchema.js");

// bcryptjs
const bcrypt=require('bcryptjs')
const jwt = require("jsonwebtoken");

// helper function
const getModelByRole = (role) => {
  if (role === "admin") return admin;
  if (role === "customer") return customer;
  if (role === "organizer") return organizer;
  return null;
};

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const Model = getModelByRole(role);

    if (!Model) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const existingUser = await Model.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Model.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Register success",
      data: { name: newUser.name, email: newUser.email, role: newUser.role },
    });
  } catch (error) {
    console.log("register error:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //   role needed nahi (DB nundi auto detect)
    let user =
      (await admin.findOne({ email })) ||
      (await customer.findOne({ email })) ||
      (await organizer.findOne({ email }));

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login success",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });

  } catch (error) {
    console.log("login error:", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

// MODULE EXPORT
module.exports = { registerController, loginController };
