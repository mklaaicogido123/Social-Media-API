const { User } = require("../model/user");

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
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
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
};

module.exports = userController;
