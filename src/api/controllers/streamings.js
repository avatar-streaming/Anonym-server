const StreamingService = require("../../services/streamings");

exports.getStreamings = async (req, res, next) => {
  try {
    const { status, message, streamings } = await StreamingService.fetchStreamings();

    res.status(status).json({
      message,
      streamings,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
