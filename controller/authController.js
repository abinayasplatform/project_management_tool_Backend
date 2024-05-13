const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const authenticateToken = require("../middleware/authenticate");

exports.register = async (req, res) => {
  try {
    const { email, password, role, username, phoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      description: "lorem ipsum",
      username,
    });

    // Save the user to the database
    await user.save();

    // Respond with success message and user data
    res.status(200).json({
      msg: "User created successfully",
      data: user,
    });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({
      msg: "Error creating user",
      data: null,
    });
  }
};

// Function to log in a user
exports.login = async (req, res) => {
  try {
    // Destructure username and password from request body
    const { email, password } = req.body;
    // Find the user by username in the database
    const user = await User.findOne({ email });
    // If user not found, respond with 404 status and error message
    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        data: null,
      });
    }
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    // If passwords don't match, respond with 401 status and error message
    if (!passwordMatch) {
      return res.status(401).json({
        msg: "Invalid credentials",
        data: null,
      });
    }
    // If credentials are valid, generate a JWT token containing user ID and role
    const token = jwt.sign(
      { userId: user._id, role: user.role, username: user.username },
      process.env.JWT_SECRET
    );
    // Respond with success message and token
    res.status(200).json({
      msg: "Login successfully",
      data: { token },
    });
  } catch (error) {
    // If an error occurs, log it and send an error response
    console.error(error);
    res.status(500).json({
      msg: "Error creating user",
      data: null,
    });
  }
};

// Function to update an existing project
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber, description } = req.body;
  try {
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
        data: null,
      });
    }

    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (description) user.description = description;

    await user.save();

    res.status(200).json({
      msg: "Successfully updated",
      data: user,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      msg: "Server Error",
      data: null,
    });
  }
};
//delete user by id
exports.deleteUser = async (req, res) => {
  try {
    const UserId = req.params.id;
    const deleteUserId = await User.findByIdAndDelete(UserId);
    res.status(200).json({
      msg: "User deleted successfully",
      data: deleteUserId,
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      msg: "Error deleting User",
      data: null,
    });
  }
};

// info particular user involved in project
exports.userInfo = async (req, res) => {
  try {
    const userId = req.params.userId;

    const projects = await Project.find(
      {
        teamLeader: userId,
      } || { members: userId }
    ).exec();

    if (!projects.length) {
      return res.status(404).json({
        msg: "No projects found for this member",
        data: null,
      });
    }

    const tasks = await Task.find({ assignedBy: userId }).exec();

    if (!tasks.length) {
      return res.status(404).json({
        msg: "No tasks found for this member",
        data: null,
      });
    }

    const memberInfo = {
      projects,
      tasks,
    };

    return res.status(200).json({
      msg: "User information retrieved successfully",
      data: memberInfo,
    });
  } catch (error) {
    console.error("Server Error: Cannot fetch user information");
    return res.status(500).json({
      msg: "Cannot fetch user information. Server error.",
      data: null,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.send(users); // Send the users as JSON response
  } catch (error) {
    res.send(error); // Send error message as JSON response
  }
};
