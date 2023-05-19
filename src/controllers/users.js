import users from "../models/users.js";

async function findAll(req,res) {
    console.log("devolver todos");
    let allUsers = await users.find();
    res.status(200).send(allUsers);
}

async function findOne(req,res) {
    console.log("devolver uno");
    let user = await users.findById(req.params.id);
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send("no encontrado");
    }
}

async function findByEmail(req,res) {
    console.log("devolver por email");
    let user = await users.findOne({email:req.params.email});
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send("no encontrado");
    }
}

async function findByDni(req,res) {
    console.log("devolver por dni");
    let user = await users.findOne({dni:req.params.dni});
    if (user) {
        res.status(200).send(user);
    } else {
        res.status(404).send("no encontrado");
    }
}

async function save(req,res) {
    console.log("hacer alta");
    console.log(req.body);
    let body = req.body;
    let err = validate(body);
    if (err=='') {
        try {
            let user = new users({
                nombre: body.nombre,
                apellido: body.apellido,
                fechaNacimiento: stringToDate(body.fechaNacimiento),
                dni: body.dni,
                nacionalidad: body.nacionalidad,
                email: body.email,
                contrasenia: body.contrasenia
            });
            let userAlta = await user.save(req.body);
            res.status(200).send(userAlta);
        } catch(e) {
            console.log(e);
            res.status(500).send(e.message);
        }
    } else {
        res.status(400).send(err);
    }
}

function stringToDate(date) {
    let split = date.split("-");
    let dia = split[2];
    while (dia.length<2) {
        dia = "0"+dia;
    }
    let mes = split[1];
    while (mes.length<2) {
        mes = "0"+mes;
    }
    let anio = split[0];
    while (anio.length<4) {
        anio = "0"+anio;
    }
    return `${anio}-${mes}-${dia}T00:00:00Z`;
}

function validate(user) {
    if (user==null)
        return "no hay datos";
    if (!user.nombre || user.nombre == '')
        return "nombre es requerido";
    if (!user.apellido || user.apellido == '')
        return "apellido es requerido";
    if (!user.dni || user.dni == 0)
        return "dni es requerido";
    if (!user.fechaNacimiento || user.fechaNacimiento == '')
        return "fecha de nacimiento es requerida";
    if (!user.nacionalidad || user.nacionalidad == '')
        return "nacionalidad es requerida";
    if (!user.email || user.email == '')
        return "email es requerido";
    if (!user.contrasenia || user.contrasenia == '')
        return "contrasenia es requerido";
    return "";
}

async function update(req,res) {
    console.log("hacer update");
    let user = await users.findById(req.params.id);
    if (user) {
        console.log(user);
        let body = req.body;
        let actualiza = false;
        let props = ["nombre","apellido,","dni","fechaNacimiento","nacionalidad","email","contrasenia"]
        for (let i=0;i<props.length;i++) {
            let prop = props[i];
            if (body[prop]) {
                user[prop] = body[prop];
                actualiza = true;
            }
        }
        if (actualiza) {
            try {
                let respUpdate = await users.findByIdAndUpdate(req.params.id,user,{useFindAndModify: false});
                //if (respUpdate.ok == 1) {
                    res.status(200).send(user);
                /*} else {
                    res.status(500).send("hubo un error al actializar");
                }*/
            } catch(e) {
                console.log(e);
                res.status(500).send(e.message);
            }
        } else {
            res.status(400).send("no hay datos para actualizar");
        }
    } else {
        res.status(404).send("no encontrado");
    }
}

async function clear(req,res) {
    console.log("hacer delete");
    let user = await users.findById(req.params.id);
    await user.remove();
    res.status(200).send(user);
}

export {findAll, findOne, findByEmail, findByDni, save, update, clear};