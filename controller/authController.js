const { json } = require("express/lib/response");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authController = {
  //Register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.hash_password, salt);

      const newUser = new User(req.body);
      newUser.hash_password = hashed;
      newUser.image =
        "https://scr.vn/wp-content/uploads/2020/11/avatar-instagram-trong.jpg";
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      //token key
      "secretkey",
      { expiresIn: "7d" }
    );
  },
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      //token key
      "secretkey",
      { expiresIn: "365d" }
    );
  },
  //Login
  loginAdmin: async (req, res) => {
    try {
      const user = await User.findOne({ user_name: req.body.username });
      if (!user) {
        return res.status(404).json("Wrong username!");
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.hash_password
      );
      if (!validPassword) {
        res.status(404).json("Wrong password");
      }
      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshToken.push;
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { hash_password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      return res.status(500).json(error.message);
    }
  },
  // requestRefreshToken: async (req, res) => {
  //   try {
  //     //take refresh token
  //     const refreshToken = req.cookies.refreshToken;
  //     if (!refreshToken) {
  //       return res.status(401).json("You are not authe
  //     }nticated");
  //     if (!refreshTokens.includes(refreshToken)) {
  //       return res.status(403).json("refresh token is not valid");
  //     }
  //     jwt.verify(refreshToken, "secretkey", (err, user) => {
  //       if (err) {
  //         return res.status(403).json("Token is not valid");
  //       }
  //       refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  //       const newAccessToken = authController.generateAccessToken(user);
  //       const newRefreshToken = authController.generateRefreshToken(user);
  //       refreshTokens.push(refreshToken);
  //       res.cookie("refreshToken", newRefreshToken, {
  //         httpOnly: true,
  //         secure: false,
  //         path: "/",
  //         sameSite: "strict",
  //       });
  //       res.status(200).json({ accessToken: newAccessToken });
  //     });
  //   } catch (error) {
  //     res.status(500).json(error.message);
  //   }
  // },

  requestRefreshToken: async (req, res) => {
    try {
      console.log(req.cookies.abcd);
      //Take refresh token from user
      const refreshToken = req.cookies.refreshToken;
      //Send error if token is not valid
      if (!refreshToken)
        return res.status(401).json("You're not authenticated");
      if (!refreshTokens.includes(refreshToken)) {
        return res.status(403).json("Refresh token is not valid");
      }
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) {
          console.log(err);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        //create new access token, refresh token and send to user
        const newAccessToken = authController.generateAccessToken(user);
        const newRefreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        res.status(200).json({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        });
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
