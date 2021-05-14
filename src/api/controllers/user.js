const UserService = require("../../services/user");

exports.updateUserName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    const { status, message, user } = await UserService.updateUserName(id, userName);

    res.json({
      status,
      message,
      user,
    });
  } catch (err) {
    next(err);
  }
};
