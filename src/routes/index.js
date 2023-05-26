/*var router = require("./users");*/
import express from "express";
import routerUser from "./users.js";
import routerAuth from "./auth.js";

let router = express.Router();

router.use(routerAuth);
router.use(routerUser);

router.route("/").get(function(req, res) {
    res.send("Bienvenido a la api de usuarios. La URI de Mongo es "+process.env.DBURL);
});

export default router;