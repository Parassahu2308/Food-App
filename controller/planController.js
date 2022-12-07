const planModel = require("../models/planModel");

module.exports.createPlan = async function (req, res) {
  try {
    let plan = req.body;
    let createdPlan = await planModel.create(plan);
    return res.json({
      msg: "Plan created successfully",
      data: createdPlan,
    });
  } catch (err) {
    return res.json({
      mag: err.message,
    });
  }
};

module.exports.updatePlan = async function (req, res) {
  try {
    let id = req.params.id;
    let dataToBeUpdated = req.body;
    let keys = [];
    for (let key in dataToBeUpdated) {
      keys.push(key);
    }
    let plan = await planModel.findById(id);
    for (let i = 0; i < keys.length; i++) {
      plan[keys[i]] = dataToBeUpdated[keys[i]];
    }
    await plan.save();
    return res.json({
      msg: "Plan updated successfully",
      data: plan,
    });
  } catch (err) {
    return res.json({
      mag: err.message,
    });
  }
};

module.exports.deletePlan = async function (req, res) {
  try {
    let id = req.params.id;
    let deletedPlan = await planModel.findByIdAndDelete(id);
    return res.json({
      msg: "Plan deleted successfully",
      data: deletedPlan,
    });
  } catch (err) {
    return res.json({
      mag: err.message,
    });
  }
};

module.exports.getAllPlan = async function (req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        msg: "All Plans retrieved",
        data: plans,
      });
    } else {
      return res.json({
        msg: "Plans not Found",
      });
    }
  } catch (err) {
    return res.json({
      msg: err.message,
    });
  }
};

module.exports.getPlan = async function (req, res) {
  try {
    let id = req.params.id;
    let plan = await planModel.findById(id);
    if (plan) {
      return res.json({
        msg: "Plan retrieved",
        data: plan,
      });
    } else {
      return res.json({
        msg: "Plan not Found",
      });
    }
  } catch (err) {
    res.json({
      msg: err.message,
    });
  }
};

module.exports.top3Plan = async function (req, res) {
  try {
    let plans = await planModel.find().sort({ averageRating: -1 }).limit(3);
    return res.json({
      msg: "Plans retrieved",
      data: plans,
    });
  } catch (err) {
    return res.json({
      msg: err.message,
    });
  }
};
