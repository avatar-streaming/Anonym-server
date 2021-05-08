const User = require("../model/User");
const { generateToken, verifyToken } = require("../utils/tokenHelper");

exports.checkAuth = async (bearerHeader) => {
  try {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decodedToken = await verifyToken(bearerToken);
    const user = await User.findOne({ uid: decodedToken.uid });
    const now = Date.now();
    const isExpired = decodedToken.exp * 1000 - now < 0;

    if (!user || isExpired) {
      return {
        status: 200,
        message: "Unauthorized",
      };
    }

    return {
      status: 200,
      message: "Authorization Success",
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};

exports.login = async (userInfo) => {
  try {
    const { uid, email, displayName } = userInfo;
    const user = await User.findOne({ email });
    const token = await generateToken(uid);

    if (!user) {
      const newUser = await User.create({
        uid,
        email,
        userName: displayName,
      });

      return {
        status: 201,
        message: "Sign In Success",
        user: newUser,
        token,
      };
    }

    return {
      status: 200,
      message: "Log In Success",
      user,
      token,
    };
  } catch (err) {
    throw new Error(err);
  }
};
