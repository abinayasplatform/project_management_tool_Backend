const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const authenticateToken = require("../middleware/authenticate");
const checkRole = require("../middleware/checRole");

//task
router.post(
  "/createTask",
  authenticateToken,
  checkRole("team leader"),
  taskController.createTask
);
router.get(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  taskController.getTaskById
);
router.put(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  taskController.updateTask
);
router.delete(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  taskController.deleteTask
);
router.get(
  "/allTask/:id",
  authenticateToken,
  checkRole("team leader"),
  taskController.getallTaskById
);

module.exports = router;
