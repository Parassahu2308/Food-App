const express = require("express");
const authRouter = express.Router();
const userModel = require("../models/userModels");
var jwt = require("jsonwebtoken");
const { JWT_key } = require("../secrets");

// authRouter.route("/signup").get(getSignup).post(postSignup);
// authRouter.route("/login").post(loginUser);

// function getSignup(req, res) {
//   res.sendFile("/public/index.html", { root: __dirname });
// }

// async function postSignup(req, res) {
//   //   let { email, name, password, confrimPassword } = req.body;
//   try {
//     let data = req.body;
//     // let data = { email, name, password, confrimPassword };
//     console.log("in postSignup");
//     let user = await userModel.create(data);
//     console.log(data);
//     res.json({
//       msg: "user signed up",
//       user,
//     });
//   } catch (err) {
//     res.json({
//       err: err.message,
//     });
//   }
// }

// async function loginUser(req, res) {
//   try {
//     let { email, password } = req.body;
//     let user = await userModel.findOne({ email: email });
//     if (user) {
//       if (password == user.password) {
//         let uid = user["_id"];
//         var token = jwt.sign({ payload: uid }, JWT_key);
//         res.cookie("login", token);
//         res.json({
//           msg: "user logged in",
//         });
//       } else {
//         res.json({
//           msg: "Wrong password",
//         });
//       }
//     } else {
//       res.json({
//         msg: "user not found",
//       });
//     }
//   } catch (err) {
//     res.json({
//       msg: err.msg,
//     });
//   }
// }

module.exports = authRouter;
