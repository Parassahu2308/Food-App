const userModel = require("../models/userModel");

module.exports.getUser = async function (req, res) {
  try {
    let id = req.id;
    let user = await userModel.findById(id);
    res.json({
      msg: "user are retrieved",
      user,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

// module.exports.postUser = function (req, res) {
//   console.log(req.body);
//   users.push(req.body);
//   res.json({
//     message: "Data received successfully",
//     user: req.body,
//   });
// };

module.exports.updateUser = async function (req, res) {
  console.log(req.body);
  let id = req.params.id;
  let user = await userModel.findById(id);
  let dataToBeUpdated = req.body;
  // {
  //   name:"paras",
  //   email:"a@gmail.com"
  // }
  try {
    if (user) {
      const keys = []; // ["name", "email"];
      for (let key in dataToBeUpdated) {
        keys.push(key);
      }
      for (let i = 0; i < keys.length; i++) {
        user[keys[i]] = dataToBeUpdated[keys[i]];
      }
      const updatedData = await user.save();
      res.json({
        msg: "data will be updated",
        updatedData,
      });
    } else {
      res.json({
        msg: "user not found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.deleteUser = async function (req, res) {
  console.log(req.body);
  try {
    let id = req.params.id;
    let user = await userModel.findOneAndDelete(id);
    res.json({
      msg: "user will be deleted successfully",
      user,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.getAllUser = async function (req, res) {
  try {
    let allUsers = await userModel.find();
    res.json({
      msg: "All users are retrieved:",
      allUsers,
    });
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};
