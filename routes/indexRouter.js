const passport = require("passport");
const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

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
indexRouter.post("/signout", indexController.signoutPost);
indexRouter.get("/", indexController.indexGet);
indexRouter.post("/", upload.single("file"), indexController.indexPost);
module.exports = indexRouter;
