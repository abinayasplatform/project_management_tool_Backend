const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const authenticateToken = require("../middleware/authenticate");
const checkRole = require("../middleware/checRole");

//project
router.post(
  "/createProject",
  authenticateToken,
  checkRole("team leader"),
  projectController.createProject
);
router.put(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  projectController.updateProject
);
router.get(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  projectController.getProjectById
);
router.delete(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  projectController.deleteProject
);

module.exports = router;
