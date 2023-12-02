const mongoose = require("mongoose");
const { groupSchema } = require("./Task");
const randomColor = require("randomcolor");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  color: { type: String, default: randomColor() },
  groups: [
    {
      group_name: { type: String, required: true },
      tasks: [
        {
          task_name: { type: String, required: true },
          description: String,
          created_at: { type: Date, default: new Date() },
          due_date: Date,
          status: { type: String, default: "todo" },
          color: { type: String, default: "#fff" },
          text_color: { type: String, default: "#000000" },
        },
      ],
    },
  ],
  organizations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
  ],
});

module.exports = mongoose.model("User", userSchema);
