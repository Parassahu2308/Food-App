const mongoose = require("mongoose");
const { db_link } = require("../secret");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const { v4, uuidv4 } = require("uuid");

mongoose
  .connect(db_link)
  .then(function (db) {
    console.log(" user db is connected");
  })
  .catch(function (err) {
    console.log(err);
  });

// Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: function () {
      return emailValidator.validate(this.email);
    },
  },
  password: {
    type: String,
    require: true,
    minLength: 7,
  },
  confrimPassword: {
    type: String,
    require: true,
    minLength: 7,
    validate: function () {
      return this.password == this.confrimPassword;
    },
  },
  role: {
    type: String,
    enum: ["admin", "resturantOwner", "user", "deliveryBoy"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "img/user/default.jpg",
  },
});

//learing hooks
// userSchema.pre("save", function () {
//   console.log("before saving in db");
// });

// userSchema.post("save", function () {
//   console.log("after saving in db");
// });
userSchema.pre("save", function () {
  this.confrimPassword = undefined;
});

// userSchema.pre("save", async function () {
//   let salt = await bcrypt.genSalt();
//   let hashedString = await bcrypt.hash(this.password, salt);
//   this.password = hashedString;
//   console.log(hashedString);
// });

userSchema.methods.createResetToken = function () {
  const resetToken = uuidv4();
  this.resetToken = resetToken;
  return resetToken;
};
userSchema.methods.resetPasswordHandler = function () {
  this.password = this.password;
  this.confrimPassword = this.confrimPassword;
  this.resetToken = undefined;
};

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
