const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  email: {
    type: "string",
    required: true,
    unique: true,
  },
  phone: {
    type: "Number",
    required: function () {
      return this.googleId || this.githubId ? false : true;
    },
    unique: true,
  },
  googleId: String,
  githubId: String,
  password: {
    type: "string",
    required: function () {
      return this.googleId || this.githubId ? false : true;
    },
  },
});

module.exports = mongoose.model("User", User);
