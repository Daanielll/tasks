const User = require("../models/User.js");
const asyncHandler = require("express-handler");
const bcrypt = require("bcrypt");

// GET all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users?.length) return res.status(400).json({ message: "No users" });
  res.json({ users: users || [] });
});

// GET single user
const getSingleUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(
    userId,
    "username email color organizations"
  ).exec();

  if (!user)
    return res.status(404).json({ message: "There is no user with that ID" });
  res.json({ user: user || [] });
});
// POST new user
const createNewUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  // Confirm values
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  // Confirm email
  if (!emailRegex.test(email))
    return res.status(400).json({ message: "Invalid email" });
  // Confirm password
  if (!passwordRegex.test(password))
    return res.status(400).json({
      message:
        "Password should have at least 8 characters with at least 1 capital letter.",
    });

  // Check for dupes
  const duplicateName = await User.findOne({ username }).exec();
  if (duplicateName)
    return res.status(409).json({ message: "Username already exist" });
  const duplicateEmail = await User.findOne({ email }).exec();
  if (duplicateEmail)
    return res.status(409).json({ message: "Email already in use" });

  // Encrypt password
  const hashedPass = await bcrypt.hash(password, 10);
  const userObject = {
    username,
    email,
    password: hashedPass,
    groups: [{ group_name: "index", tasks: [] }],
  };

  //Create user
  const user = await User.create(userObject);

  if (user) res.status(201).json({ message: `Created user ${username}` });
  else res.status(400).json({ message: "Error creating user" });
});

// PATCH all users
const updateUser = asyncHandler(async (req, res) => {
  const { id, username, password, color } = req.body;
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

  // Confirm values
  if (!id) return res.status(400).json({ message: "ID field is required" });

  const user = await User.findById(id).exec();
  if (!user) return res.status(400).json({ message: "User not found" });

  // Check for dupes
  if (username) {
    const duplicate = await User.findOne({ username }).lean().exec();
    if (duplicate && duplicate?._id.toString() !== id)
      return res.status(409).json({ message: "Username already exist" });
    user.username = username;
  }

  if (color) user.color = color;
  // Confirm password
  if (password) {
    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password should have at least 8 characters with at least 1 capital letter.",
      });
    user.password = password;
  }
  const updatedUser = await user.save();
  res.json({ message: `User ${updatedUser.username} updated` });
});

// DELETE user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) return res.status(400).json({ message: "User ID required" });

  const user = await User.findById(id).exec();
  if (!user)
    return res.status(400).json({ message: `Can't find a user with ID ${id}` });
  const deleted = await User.findOneAndDelete({ _id: id });
  res.json({
    message: `User ${deleted.username} with an ID of ${id} has been deleted`,
  });
});

module.exports = {
  createNewUser,
  updateUser,
  getAllUsers,
  getSingleUser,
  deleteUser,
};
