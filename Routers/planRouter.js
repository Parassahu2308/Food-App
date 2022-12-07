const express = require("express");
const planRouter = express.Router();

const {
  getPlan,
  getAllPlan,
  top3Plan,
  createPlan,
  updatePlan,
  deletePlan,
} = require("../controller/planController");
const { isAuthorised, protectedRoute } = require("../helper");

//Get all plan
planRouter.route("/allplan").get(getAllPlan);

//Get top 3 plan
planRouter.route("/top3plan").get(top3Plan);

//Get a single plan for user
planRouter.use(protectedRoute);
planRouter.route("single/:id").get(getPlan);

// isAuthorsied for admin and owner
planRouter.use(isAuthorised(["admin", "resturantowner"]));
planRouter.route("/crudplan").post(createPlan);

planRouter.route("/curdPlan/:id").patch(updatePlan).delete(deletePlan);

module.exports = planRouter;
