const db = require("../models/db");
const works = db.getState().works || [];
const skills = db.getState().skills || [];
module.exports.render = async (ctx, next) => {
  ctx.render("pages/index", { products: works, skills: skills });
};
