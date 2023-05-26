import express from "express";
import mongoose from "mongoose";
import router from "./routes/index.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(router);

dotenv.config({path:"./.env"});

let uriMongo = process.env.DBURL;//"mongodb://localhost/users"*/
let puerto = process.env.PORT;
mongoose.connect(uriMongo,
 {useNewUrlParser: true, useUnifiedTopology: true}, 
 function(err,res) {
    if (err) {
        console.log(`Hubo un error al conectar a la base de datos. Error: ${err}`);
    }
    app.listen(puerto, function() {
        console.log("api de usuarios iniciada en puerto 3001");
    })
})

export default app;