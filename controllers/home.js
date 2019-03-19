const db = require("../models/db");
const config = require("../config/mail.json");
const nodemailer = require("nodemailer");
module.exports.render = async (ctx, next) => {
  const works = db.getState().works || [];
  const skills = db.getState().skills || [];
  ctx.render("pages/index", { products: works, skills: skills });
};

function sendMail(body) {
  // инициализируем модуль для отправки писем и указываем данные из конфига
  const transporter = nodemailer.createTransport(config.mail.smtp);
  const mailOptions = {
    from: `"${body.name}" <${body.email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text: body.message.trim().slice(0, 500) + `\n Отправлено с: <${body.email}>`
  };
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      // если есть ошибки при отправке - сообщаем об этом
      if (error) {
        reject(`При отправке письма произошла ошибка!: ${error}`);
      }
      resolve(`Письмо успешно отправлено: ${info}`);
    });
  });
}

module.exports.postMail = async (ctx, next) => {
  // требуем наличия имени, обратной почты и текста
  if (
    !ctx.request.body.name ||
    !ctx.request.body.email ||
    !ctx.request.body.message
  ) {
    // если что-либо не указано - сообщаем об этом
    return ctx.render("pages/index", {
      products: works,
      skills: skills,
      msg: `Все поля нужно заполнить!`
    });
  }

  // отправляем почту

  try {
    const status = await sendMail(ctx.request.body);

    const works = db.getState().works || [];
    const skills = db.getState().skills || [];
    ctx.render("pages/index", {
      products: works,
      skills: skills,
      msg: status
    });
  } catch (status) {
    const works = db.getState().works || [];
    const skills = db.getState().skills || [];
    ctx.render("pages/index", {
      products: works,
      skills: skills,
      msg: status
    });
  }
};
