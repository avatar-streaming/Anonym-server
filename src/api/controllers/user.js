const UserService = require("../../services/user");

exports.updateUserName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userName } = req.body;
    const { status, message, user } = await UserService.updateUserName(id, userName);

    res.status(status).json({
      message,
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchUsers = async (req, res, next) => {
  try {
    const { term } = req.query;
    const { status, message, userList } = await UserService.searchUsers(term);

    res.status(status).json({
      message,
      userList,
    });
  } catch (err) {
    next(err);
  }
};
