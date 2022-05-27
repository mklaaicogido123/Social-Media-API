const { model } = require("mongoose");
const userController = require("../controller/userController");

const router = require("express").Router();

//Add User
router.post("/", userController.addUser);

//Get all User
router.get("/", userController.getAllUser);

//Delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
