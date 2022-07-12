const { Post } = require("../model/post");
const { User } = require("../model/user");

const postController = {
  newPost: async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllPostUser: async (req, res) => {
    try {
      const user = await User.findOne({ name: req.params.username });
      const posts = await Post.find({ userId: user._id }).populate("userId");
      const lists = posts.sort((p1, p2) => {
        return new Date(p2.createAt) - new Date(p1.createAt);
      });
      lists.reverse();

      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllPost: async (req, res) => {
    try {
      const posts = await Post.find().populate("userId");
      const lists = posts.sort((p1, p2) => {
        return new Date(p2.createAt) - new Date(p1.createAt);
      });
      lists.reverse();
      res.status(200).json(lists);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("delete succes");
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = postController;
