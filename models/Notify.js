const mongoose = require("mongoose");

const Notify = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    refPath: 'grp' // user schema
  },
  grp: String,
  type: String,
  userType: String,
  message: String,
});


module.exports = mongoose.model("notify", Notify);