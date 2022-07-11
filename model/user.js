const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 20,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  about: {
    type: String,
  },
  matches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  image: [
    {
      type: String,
      default:
        "https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg",
    },
  ],
  biography: {
    type: String,
  },
  hash_password: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

let User = mongoose.model("User", userSchema);

module.exports = { User };

// name,gender,age,location,about,matches(friens)
// [],image[],biography{},hash_password
