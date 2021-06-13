const AuthService = require("../../services/auth");

exports.checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const {
      status,
      message,
      user,
    } = await AuthService.checkAuth(token);

    if (!user) {
      res.clearCookie("jwt");
      res.status(status).json({
        message,
      });

      return;
    }

    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    res.clearCookie("jwt");
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const {
      status,
      message,
      user,
      token,
    } = await AuthService.login(userInfo);

    res.cookie("jwt", token, { domain: "anonym/life" });
    res.status(status).json({
      message,
      payload: user,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const {
      status,
      message,
    } = AuthService.logout();

    res.clearCookie("jwt");
    res.status(status).json({
      message,
    });
  } catch (err) {
    next(err);
  }
};
