const User = require("../model/User");

exports.updateUserName = async (id, userName) => {
  try {
    const filter = { _id: id };
    const update = { userName };
    const user = await User.findOneAndUpdate(filter, update, { new: true });

    return {
      status: 200,
      message: "Update UserName Success",
      user,
    };
  } catch (err) {
    throw new Error(err);
  }
};
