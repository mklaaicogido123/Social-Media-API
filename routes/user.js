const { model } = require("mongoose");
const userController = require("../controller/userController");

const router = require("express").Router();

//Add User
router.post("/", userController.addUser);

//Get all User
router.get("/", userController.getAllUser);

//Delete user
router.delete("/:id", userController.deleteUser);

//Update user
router.put("/:id", userController.updateUser);

//Add friends
router.put("/addFriends/:id", userController.addFriends);

module.exports = router;
