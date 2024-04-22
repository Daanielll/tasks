const User = require("../models/User");
const asyncHandler = require("express-handler");

// GET /users/:user/
const getAllTasks = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });
  let allTasks = [];
  user.groups.forEach((group) => {
    allTasks = allTasks.concat(group.tasks);
  });
  res.json({ data: allTasks || [] });
});

// GET /users/:user/groups/
const getAllGroups = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });
  const userGroups = user.groups.map((item) => ({
    _id: item._id,
    group_name: item.group_name,
  }));
  res.json({ data: userGroups || [] });
});

// POST /users/:user/groups
const createNewGroup = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { group_name } = req.body;

  if (!group_name)
    return res.status(404).json({ message: "Invalid group name" });
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "Cannot find user" });

  const existingGroup = await User.findOne({
    _id: userId,
    "groups.group_name": group_name,
  });

  if (existingGroup)
    return res.status(400).json({
      message: "Group with the same name already exists for the user",
    });

  user.groups.push({ group_name, tasks: [] });
  await user.save();
  res.json({
    message: `Group ${group_name} created for user ${user.username} with ID of ${userId}`,
  });
});

// DELETE /users/:user/:groupId/
const deleteGroup = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.params;
  if (!userId) return res.status(400).json({ message: "User ID required" });
  if (!groupId) return res.status(400).json({ message: "Group ID required" });
  if (groupId == "index")
    return res.status(400).json({ message: "Cannot delete index group" });
  const user = await User.findById(userId).exec();
  if (!user)
    return res
      .status(400)
      .json({ message: `Cannot find a user with ID ${userId}` });

  user.groups.pull({ _id: groupId });
  await user.save();
  res.json({
    message: `Group with ID ${groupId} deleted for user ${user.username} With an ID of ${userId}`,
  });
});

// GET /users/:user/:group/
const getGroupTasks = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.params;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });

  const group = user.groups.find((group) => group._id.equals(groupId));

  if (!group) {
    return res.status(404).json({ message: "Group not found for the user" });
  }
  res.json({ data: group.tasks, group_name: group.group_name || [] });
});

// POST /users/:user/:group/
const createNewTask = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.params;
  const { task_name, description, due_date, color, text_color } = req.body;
  if (!task_name) res.status(400).json({ message: "Task name not specified" });
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });
  const group = user.groups.find((group) => group._id.equals(groupId));

  if (!group) {
    return res.status(404).json({ message: "Group not found for the user" });
  }
  const task = { task_name, description, due_date, color, text_color };
  group.tasks.push(task);
  user.save();
  res.json({
    message: `Created task ${task_name} for user ${user.username} with an ID of ${userId}`,
  });
});

// DELETE /users/:user/:group
const deleteTask = asyncHandler(async (req, res) => {
  const { userId, groupId } = req.params;
  const { id } = req.body;
  if (!id) res.status(400).json({ message: "Task ID not specified" });
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });
  const group = user.groups.find((group) => group._id.equals(groupId));

  if (!group) {
    return res.status(404).json({ message: "Group not found for the user" });
  }

  group.tasks.pull({ _id: id });
  await user.save();
  res.json({
    message: `Deleted task ${id} for user ${user.username} with ID of ${userId}`,
  });
});

// PATCH /users/:user/:group/:task/
const updateTask = asyncHandler(async (req, res) => {
  const { userId, groupId, taskId } = req.params;
  const { task_name, description, due_date, color, text_color, status } =
    req.body;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });
  const group = user.groups.find((group) => group._id.equals(groupId));

  if (!group) {
    return res.status(404).json({ message: "Group not found for the user" });
  }

  const task = group.tasks.find((t) => t._id.equals(taskId));

  if (!task) {
    return res.status(404).json({ message: "Task not found in the group" });
  }

  task.task_name = task_name || task.task_name;
  task.description = description || task.description;
  task.due_date = due_date || task.due_date;
  task.color = color || task.color;
  task.text_color = text_color || task.text_color;
  task.status = status || task.status;
  await user.save();
  res.json({
    message: `Updated task ${taskId} in group ${group.group_name} to user ${user.username} with an ID of ${userId}`,
  });
});

// GET /users/:user/:group/:task/
const getSingleTask = asyncHandler(async (req, res) => {
  const { userId, groupId, taskId } = req.params;
  const user = await User.findById(userId);

  if (!user) return res.status(404).json({ message: "Cannot find user" });

  const group = user.groups.find((group) => group._id.equals(groupId));

  if (!group) {
    return res.status(404).json({ message: "Group not found for the user" });
  }
  const task = group.tasks.find((t) => t._id.equals(taskId));

  if (!task) {
    return res.status(404).json({ message: "Task not found in the group" });
  }
  const taskWithGroupId = {
    ...task.toObject(),
    group_id: group._id,
  };
  res.json({ data: taskWithGroupId || [] });
});

module.exports = {
  getAllTasks,
  getAllGroups,
  createNewGroup,
  deleteGroup,
  getGroupTasks,
  createNewTask,
  deleteTask,
  getSingleTask,
  updateTask,
};
