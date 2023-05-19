import users from '../models/users.js';
import jwt from 'jsonwebtoken';

async function login(req, res) {
    console.log("login de usuario");
    let privateKey = process.env.PRIVATE_KEY;
    let user = await users.findOne({email:req.body.email, contrasenia:req.body.contrasenia});
    if (user) {
        let resp = {
            nombre: user.nombre,
            apellido: user.apellido,
            fechaNacimiento: user.fechaNacimiento,
            dni: user.dni,
            nacionalidad: user.nacionalidad,
            email: user.email
        };
        let token = jwt.sign(resp,privateKey);
        let respFinal = {
            usuario: resp,
            token: token
        }
        res.status(200).send(respFinal);
    } else {
        res.status(400).send("credenciales inválidas");
    }
}

async function validateToken(req, res, next) {
    console.log("validando token en request");
    let privateKey = process.env.PRIVATE_KEY;
    const bearer = req.headers['authorization'];//Authorization
    if (typeof bearer !== 'undefined') {
        const token = bearer.split(' ')[1];
        if (typeof token !== 'undefined') {
            try {
                var decoded = await jwt.verify(token, privateKey);
                next();
            } catch(err) {
                res.status(401).send("Token inválido");
            }
        } else {
            res.status(401).send("No Autorizado");    
        }
    } else {
        res.status(401).send("No Autorizado");
    }
    
}

export {login, validateToken};