const { json } = require("express/lib/response");
const { User } = require("../model/user");
const bcrypt = require("bcrypt");

const userController = {
  //Add user
  addUser: async (req, res) => {
    try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //GET ALL USER
  getAllUser: async (req, res) => {
    try {
      const users = await User.find().populate("matches");
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json(error.message);
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      await User.updateMany({ matches: req.body.id }, { matches: null });
      await User.findByIdAndDelete(req.body.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update USER
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      console.log("hash password");
      if (req.body.hash_password) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.hash_password, salt);
        await user.updateOne({ hash_password: hashed });
      }
      res.status(200).json("Updated successfully!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Add friends
  addFriends: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      const friend = await User.findById(req.body.friend);
      await user.updateOne({ $push: { matches: friend._id } });
      await friend.updateOne({ $push: { matches: user._id } });

      // console.log(friend);
      // console.log(req.body.friend);
      res.status(200).json(friend);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },

  //Login
  Login: async (req, res) => {
    try {
      // const username = req.body.username.toLowerCase() || "test";
      // const password = req.body.password || "12345";

      const query = { _id: "62907aa4f94deedbe9863ad6", hash_pasword: "12345" };

      const user = await User.find(query);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  getUserByName: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.username });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
