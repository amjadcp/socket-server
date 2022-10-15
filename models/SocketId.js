const mongoose = require("mongoose");

const SocketId = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  sockid: [String]
});


module.exports = mongoose.model("socketid", SocketId);