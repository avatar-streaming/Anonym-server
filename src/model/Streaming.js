const mongoose = require("mongoose");
const { Schema } = mongoose;

const streamingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  stremer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  thumnail: {
    type: String,
  },
  viewers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

module.exports = mongoose.model("Streaming", streamingSchema);
