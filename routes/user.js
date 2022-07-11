const { model } = require("mongoose");
const middlewareController = require("../controller/middlewareController");
const userController = require("../controller/userController");

const router = require("express").Router();

//Add User
router.post("/", userController.addUser);

//Get all User
router.get("/", userController.getAllUser);

router.get("/:username", userController.getUserByName);

//Delete user
router.delete(
  "/",
  middlewareController.verifyTokenandAdmin,
  userController.deleteUser
);

//Update user
router.put("/:id", userController.updateUser);

//Add friends
router.put("/addFriends/:id", userController.addFriends);

router.get("/login", userController.Login);

module.exports = router;
