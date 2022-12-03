const express = require("express");
const userRouter = express.Router();

const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  getAllUser,
} = require("../controller/userController");

const {
  login,
  signup,
  forgetpassword,
  resetpassword,
  logout,
} = require("../controller/authController");

const { protectedRoute, isAuthorised } = require("../helper");

//user ek option
userRouter.route("/:id").patch(updateUser).delete(deleteUser);

//login
userRouter.route("/login").post(login);

//signup
userRouter.route("/signup").post(signup);

//forgetPassword
userRouter.route("/forgetpassword").post(forgetpassword);

//resetPassword
userRouter.route("/resetpassword/:token").post(resetpassword);

//Logout
userRouter.route("/logout").get(logout);

//Profile page
userRouter.use(protectedRoute);
userRouter.route("/profile").get(getUser);

//admin specific function
userRouter.use(isAuthorised(["admin"]));
userRouter.route("/").get(getAllUser);

module.exports = userRouter;
