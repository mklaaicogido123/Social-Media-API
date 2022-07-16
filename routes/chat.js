const router = require("express").Router();
const chatController = require("../controller/chatController");

router.post("/", chatController.createChat);
router.get("/:userId", chatController.userChats);
router.get("/find/:firstId/:secondId", chatController.findChat);

module.exports = router;
