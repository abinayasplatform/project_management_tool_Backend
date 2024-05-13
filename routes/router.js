const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticate");
const checkRole = require("../middleware/checRole");
const authController = require("../controller/authController");

//Authentication routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.put("/:id", authController.updateUser);
router.get(
  "/data/:userId",
  authenticateToken,
  checkRole("team leader", "developer"),
  authController.userInfo
);
router.get(
  "/getAllUsers",
  authenticateToken,
  checkRole("team leader"),
  authController.getAllUsers
);
router.delete(
  "/:id",
  authenticateToken,
  checkRole("team leader"),
  authController.deleteUser
);
module.exports = router;
