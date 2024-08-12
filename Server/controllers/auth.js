const { hash } = require("crypto");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    console.log("Request body:", { name, email, password });

    // Check if the user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "A user with this email already exists",
        success: false,
      });
    }
    console.log("existing user is getting printed" + existingUser);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    let user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from response
    user = user.toObject();
    delete user.password;

    console.log("User created:", user);

    // Send success response
    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    // Validate required fields
    if (!name || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    console.log("Request body:", { name, password });

    // Check if the user already exists by email
    const existingUser = await User.findOne({ name });
    if (!existingUser) {
      return res.status(400).json({
        message: "A user with this email does not exist! Please register",
        success: false,
      });
    }

    // Hash the password
    const passwordMatched = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatched) {
      return res.status(400).json({
        message:"Invalid credentials",
        success: false,
      })
    }
    // Create a new user
    let user = await User.findOne({
      name,
    });
    console.log(user)
    // Remove password from response
    user = user.toObject();
    delete user.password;

    // Send success response
    return res.status(201).json({
      message: "User logged in successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      success: false,
    });
  }
};
