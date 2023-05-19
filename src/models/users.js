import mongoose from "mongoose";
var Schema = mongoose.Schema;

var userSchema = new Schema({
    nombre: {type:String},
    apellido: {type:String},
    fechaNacimiento: {type:Date},
    dni: {type:Number},
    nacionalidad: {type:String},
    email:{type:String},
    contrasenia:{type:String}
})

userSchema.virtual("edad").get(function() {
    return 40;
})

export default mongoose.model("user",userSchema);