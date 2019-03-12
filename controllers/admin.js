module.exports.render = async (ctx, next) => {
  if (ctx.session.isAuth == true) {
    ctx.render("pages/admin");
  } else {
    ctx.redirect("/login");
  }
};
