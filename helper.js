var jwt = require("jsonwebtoken");
const userModel = require("./models/userModels");
const { JWT_key } = require("./secret");

//Protect route
module.exports.protectedRoute = async function (req, res, next) {
  let token;
  if (req.cookies.login) {
    token = req.cookies.login;
    let payloadObj = jwt.verify(token, JWT_key);
    const user = await userModel.findById(payloadObj.payload);
    console.log(user);
    req.id = user.id;
    req.role = user.role;
    if (payloadObj) {
      next();
    } else {
      res.json({
        msg: "user not verified",
      });
    }
  } else {
    return res.json({
      msg: "operation not allowed",
    });
  }
};

// is Authorised -> check the user role
//client will send role in rq object
module.exports.isAuthorised = function (roles) {
  return function (req, res, next) {
    let role = req.role;
    if (roles.includes(role)) {
      next();
    } else {
      res.status(401).json({
        msg: "Invalid Role",
      });
    }
  };
};
