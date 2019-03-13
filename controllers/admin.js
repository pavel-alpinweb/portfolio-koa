const db = require("../models/db");
const path = require("path");
const validation = require("../libs/validation");
const fs = require("fs");
const util = require("util");
const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

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

module.exports.upload = async (ctx, next) => {
  const { projectName, price } = ctx.request.body;
  const { name, size, path: filePath } = ctx.request.files.photo;
  const responseErr = validation(projectName, price, name, size);
  if (responseErr) {
    await unlink(filePath);
    ctx.body = responseErr;
  }
  let fileName = path.join(process.cwd(), "public", "upload", name);
  const errUpload = await rename(filePath, fileName);
  if (errUpload) {
    retrun(
      (ctx.body = {
        mes: "При загрузке картинки что-то пошло не так...",
        status: "Error"
      })
    );
  }
  db.get("works")
    .push({
      src: path.join("upload", name),
      name: projectName,
      price: price
    })
    .write();
  ctx.render("pages/admin", { title: "admin", msgfile: "Все огонь!" });
};
