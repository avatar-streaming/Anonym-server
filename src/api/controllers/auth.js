const AuthService = require("../../services/auth");

exports.postLogin = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const { status, message, user, token } = await AuthService.login(userInfo);

    res.set("token", token, {
      httpOnly: true,
      secure: true,
    });
    res.status(status).json({
      message,
      user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.postCheckAuth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authentication"];
    const { status, message, user } = await AuthService.checkAuth(bearerHeader);

    if (!user) {
      res.status(status).json({
        message,
      });

      return;
    }

    res.status(status).json({
      message,
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
