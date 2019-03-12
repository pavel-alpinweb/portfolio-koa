const Router = require("koa-router");
const router = new Router();
const koaBody = require("koa-body");
const ctrlHome = require("../controllers/home");
const ctrlLogin = require("../controllers/login");
const ctrlAdmin = require("../controllers/admin");

router.get("/", ctrlHome.render);
router.get("/login", ctrlLogin.render);
router.get("/admin", ctrlAdmin.render);

router.post("/login", koaBody(), ctrlLogin.auth);

module.exports = router;
