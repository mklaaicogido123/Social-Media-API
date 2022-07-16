const router = require("express").Router();
const messageController = require("../controller/messageController");

router.post("/", messageController.addMessage);

router.get("/:chatId", messageController.getMessages);

module.exports = router;
