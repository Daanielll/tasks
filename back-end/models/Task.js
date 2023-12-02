const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task_name: { type: String, required: true },
  description: String,
  created_at: { type: Date, default: new Date() },
  due_date: Date,
  status: { type: String, default: false },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const groupSchema = new mongoose.Schema({
  group_name: { type: String, default: "todo" },
  tasks: [taskSchema],
});

module.exports = { groupSchema, taskSchema };
