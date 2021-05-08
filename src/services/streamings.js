const Streaming = require("../model/Streaming");

exports.fetchStreamings = async () => {
  try {
    const streamings = await Streaming.find();

    return {
      status: 200,
      message: "Fetch Streamings Success",
      streamings,
    };
  } catch (err) {
    throw new Error(err);
  }
};
