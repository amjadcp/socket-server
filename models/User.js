const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['admin', 'one', 'two']
  }
});


module.exports = mongoose.model("user", User);