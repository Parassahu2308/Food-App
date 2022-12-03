const userModel = require("../models/userModels");
var jwt = require("jsonwebtoken");
const { JWT_key } = require("../secret");

module.exports.signup = async function (req, res) {
  try {
    let data = req.body;
    let user = await userModel.create(data);
    if (user) {
      res.json({
        msg: "user signed up",
        user,
      });
    } else {
      res.json({
        msg: "user could not be signed up",
      });
    }
  } catch (err) {
    res.json({
      err: err.message,
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      if (password == user.password) {
        let uid = user["_id"];
        var token = jwt.sign({ payload: uid }, JWT_key);
        res.cookie("login", token);
        res.json({
          msg: "user logged in",
        });
      } else {
        res.json({
          msg: "Wrong password",
        });
      }
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.msg,
    });
  }
};

module.exports.forgetpassword = async function (req, res) {
  try {
    let { email } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) {
      //create token
      let resetToken = user.createResetToken();
      //create link
      //https://abc.com/resetPassword/resetToken
      let resetPasswordLink = `${req.protocol}://${req.get(
        "host"
      )}/resetpassword/${resetToken}`;
      //send email to user via nodemailer
    }
  } catch (err) {
    res.status(500).json({
      msg: err.message,
    });
  }
};

module.exports.resetpassword = async function (req, res) {
  try {
    const token = req.params.token;
    let { password, confrimPassword } = req.body;
    const user = await userModel.findOne({ resetToken: token });
    if (user) {
      //userPasswordHandler will updated in db
      user.resetPasswordHandler(password, confrimPassword);
      await user.save();
      res.json({
        msg: "Password Change Successfully",
      });
    } else {
      res.json({
        msg: "User not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.logout = async function (req, res) {
  res.cookie("login", "", { maxAge: 1 });
  res.json({
    msg: "user logout successfully",
  });
};
