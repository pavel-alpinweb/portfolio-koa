module.exports = (projectName, price, name, size) => {
  let response;

  if (projectName === "") {
    response = {
      mes: "Не указано название проекта",
      status: "Error"
    };
  }

  if (price === "") {
    response = {
      mes: "Не указана цена",
      status: "Error"
    };
  }

  if (name === "" || size === 0) {
    response = {
      mes: "Не загружена картинка",
      status: "Error"
    };
  }

  return response;
};
