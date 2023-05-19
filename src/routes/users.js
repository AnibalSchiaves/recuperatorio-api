import {findAll, findOne, findByEmail, findByDni, save, update, clear} from "../controllers/users.js";
import express from "express";
import { validateToken } from "../controllers/auth.js";

var router = express.Router();

router.route("/users")
    .get(validateToken, findAll)
    //.post(validateToken, save)
    .post(save);

router.route("/users/:id")
    .get(validateToken,findOne)
    .delete(validateToken, clear)
    .patch(validateToken, update)

router.route("/users/byEmail/:email")
    .get(validateToken, findByEmail)

router.route("/users/byDni/:dni")
    .get(validateToken, findByDni)

export default router;
