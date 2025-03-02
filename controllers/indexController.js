const bcrypt = require("bcryptjs");
const db = require("../prisma/queries");

exports.indexGet = async (req, res) => {
  if (req.isAuthenticated()) {
    const { id } = req.user;
    const userFolders = await db.getAllFolders(id);
    res.render("index", { folders: userFolders });
  } else {
    res.redirect("/login");
  }
};
exports.indexPost = async (req, res) => {
  const { folderName } = req.body;
  const { id } = req.user;
  await db.createFolder(folderName, id);
  res.redirect("/");
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

exports.signoutPost = async (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
