const res = require("express/lib/response");
const { json } = require("express/lib/response");
const { Chat } = require("../model/chat");
const { User } = require("../model/user");

const chatController = {
  //create Chat
  createChat: async (req, res) => {
    const newChat = new Chat({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  userChats: async (req, res) => {
    try {
      const chat = await Chat.find({
        members: { $in: [req.params.userId] },
      }).populate("members");
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  findChat: async (req, res) => {
    try {
      const chat = await Chat.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = chatController;
