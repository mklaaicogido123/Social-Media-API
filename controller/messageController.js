const res = require("express/lib/response");
const { Message } = require("../model/message");

const messageController = {
  //add message
  addMessage: async (req, res) => {
    const { chatId, senderId, text } = req.body;
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    try {
      const result = await message.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getMessages: async (req, res) => {
    try {
      const result = await Message.find({ chatId: req.params.chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = messageController;
