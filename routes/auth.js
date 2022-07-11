const router = require("express").Router();
const authController = require("../controller/authController");

router.post("/register", authController.registerUser);

router.post("/loginAdmin", authController.loginAdmin);

router.post("/refresh", authController.requestRefreshToken);

router.post("/logout", authController.logOut);

module.exports = router;
