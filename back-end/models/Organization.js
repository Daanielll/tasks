const mongoose = require("mongoose");
const { taskSchema, groupSchema } = require("./Task");

const organizationSchema = new mongoose.Schema({
  org_name: { type: String, required: true },
  password: { type: String, required: true },
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ],
  groups: [groupSchema],
  tasks: [taskSchema],
});

module.exports = mongoose.model("Organization", organizationSchema);
