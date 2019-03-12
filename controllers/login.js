const db = require("../models/db");
const psw = require("../libs/password");

module.exports.render = async (ctx, next) => {
  if (ctx.session.isAuth == true) {
    ctx.render("pages/admin");
  } else {
    ctx.render("pages/login");
  }
};

module.exports.auth = async (ctx, next) => {
  const { email, password } = ctx.request.body;
  const user = db.getState().user;
  if (user.login === email && psw.validPassword(password)) {
    ctx.session.isAuth = true;
    ctx.redirect("/admin");
  } else {
    ctx.redirect("/login");
  }
};
