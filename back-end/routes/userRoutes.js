const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const taskController = require("../controllers/taskController.js");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
router.route("/:userId").get(userController.getSingleUser);

router.route("/:userId/tasks").get(taskController.getAllTasks);

router
  .route("/:userId/groups")
  .get(taskController.getAllGroups)
  .post(taskController.createNewGroup)
  .delete(taskController.deleteGroup);
router
  .route("/:userId/:groupId")
  .get(taskController.getGroupTasks)
  .post(taskController.createNewTask)
  .delete(taskController.deleteTask);
router
  .route("/:userId/:groupId/:taskId")
  .get(taskController.getSingleTask)
  .patch(taskController.updateTask);
module.exports = router;
