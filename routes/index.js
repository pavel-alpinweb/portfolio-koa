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
router.post("/admin/skills", koaBody(), ctrlAdmin.updateSkills);
router.post(
  "/admin/upload",
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: process.cwd() + "/public/upload"
    }
  }),
  ctrlAdmin.upload
);

router.post("/", koaBody(), ctrlHome.postMail);

module.exports = router;
