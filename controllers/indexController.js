const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");

exports.indexGet = (req, res) => {
  console.log(req.session);
  if (req.isAuthenticated()) {
    res.render("index");
  } else {
    res.redirect("/login");
  }
};
exports.indexPost = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
exports.loginGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("login");
  }
};

exports.signupGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.render("signup");
  }
};

exports.signupPost = async (req, res) => {
  const { username, password, email } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.createUser(username, hashedPassword, email);
  res.redirect("/login");
};
