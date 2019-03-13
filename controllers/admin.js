const db = require("../models/db");
const path = require("path");

module.exports.render = async (ctx, next) => {
  if (ctx.session.isAuth == true) {
    ctx.render("pages/admin");
  } else {
    ctx.redirect("/login");
  }
};

module.exports.updateSkills = async (ctx, next) => {
  const { age, concerts, cities, years } = ctx.request.body;
  db.set("skills", [
    {
      number: age,
      text: "Возраст начала занятий на скрипке"
    },
    {
      number: concerts,
      text: "Концертов отыграл"
    },
    {
      number: cities,
      text: "Максимальное число городов в туре"
    },
    {
      number: years,
      text: "Лет на сцене в качестве скрипача"
    }
  ]).write();
  ctx.render("pages/admin", { title: "admin", msgSkills: "Все огонь!" });
};
