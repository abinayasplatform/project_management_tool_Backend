const Member = require("../models/memberModel");
const Project = require("../models/projectModel");
const Task = require("../models/projectModel");
const authenticateToken = require("../middleware/authenticate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.memberRegister = async (req, res) => {
  try {
    const { email, password, name, memberRole, role } = req.body;

    const createdBy = req.user._id;

    if (req.body.role !== "team leader") {
      return res.status(403).json({
        msg: "Only team leaders can register members",
        data: null,
      });
    }

    const existingMember = await Member.findOne({ email });
    if (existingMember) {
      return res.status(400).json({
        msg: "User already exists",
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newMember = new Member({
      email,
      password: hashedPassword,
      name,
      memberRole,
      createdBy,
    });
    await newMember.save();
    res.status(200).json({
      msg: "Member created successfully",
      data: newMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error creating member",
      data: null,
    });
  }
};

// Login Functionality
exports.memberLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const member = await Member.findOne({ email });
    if (!member) {
      return res.status(404).json({
        msg: "User not found",
        data: null,
      });
    }

    const validPassword = await bcrypt.compare(password, member.password);
    if (!validPassword) {
      return res.status(401).json({
        msg: "Invalid password",
        data: null,
      });
    }

    const token = jwt.sign({ _id: member._id }, process.env.JWT_SECRET);

    res.status(200).json({
      msg: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error logging in",
      data: null,
    });
  }
};

exports.completeMemberInfo = async (req, res) => {
  try {
    // Extract member ID from request parameters
    const memberId = req.params.memberId;

    // Fetch projects associated with the member from the database
    const projects = await Project.find({ members: memberId }).exec();

    // If no projects found, return 404 response
    if (!projects.length) {
      return res.status(404).json({
        status: false,
        msg: "No projects found for this member",
        data: null,
        error: null,
      });
    }

    // Fetch tasks associated with the member from the database
    const tasks = await Task.find({ assignedTo: memberId }).exec();

    // If no tasks found, return 404 response
    if (!tasks.length) {
      return res.status(404).json({
        status: false,
        msg: "No tasks found for this member",
        data: null,
        error: null,
      });
    }
    // Prepare response
    const memberInfo = {
      projects,
      tasks,
    };

    // Return member info as JSON response
    return res.status(200).json({
      status: true,
      msg: "Member information retrieved successfully",
      data: memberInfo,
      error: null,
    });
  } catch (error) {
    // Handle server error and return error response
    console.error("Server Error: Cannot fetch member information");
    return res.status(500).json({
      status: false,
      msg: "Cannot fetch member information. Server error.",
      data: null,
      error: error,
    });
  }
};
