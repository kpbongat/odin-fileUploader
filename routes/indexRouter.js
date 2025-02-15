const passport = require("passport");
const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/login", indexController.loginGet);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
indexRouter.get("/signup", indexController.signupGet);
indexRouter.post("/signup", indexController.signupPost);
indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", indexController.indexPost);
module.exports = indexRouter;
