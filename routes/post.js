const router = require("express").Router();
const postController = require("../controller/postController");

router.post("/", postController.newPost);
router.get("/profile/:username", postController.getAllPostUser);
router.get("/", postController.getAllPost);
router.delete("/:id", postController.deletePost);

module.exports = router;
