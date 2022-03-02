let express = require("express");
let app = express();
let puerto = process.env.PORT || 3000;
let mongoose = require("mongoose");
let cors = require("cors");
require('dotenv').config();

let userDB = process.env.DB_USER;
let passDB = process.env.DB_PASS;


mongoose.connect("mongodb+srv://facundosuarezbalbi:baseDatos2022@cluster0.n066c.mongodb.net/portfolioPersonal?retryWrites=true&w=majority")

let db = mongoose.connection;

db.once("open", () => console.log("Conectado a la base de datos"))

app.use(cors());
app.use(express.json());

app.use("/", express.static("frontend"))

app.get("/", (req, res) => {
    res.send("Solicitud a la raíz")
})


// *****************
// USUARIO YO
// *****************

//schema
let usuarioSchema = new mongoose.Schema({
    nombre:String,
    apellido:String,
    usuario:String,
    contraseña:String,
});

//modelo
let Usuario = mongoose.model("Usuario", usuarioSchema);

app.get("/usuarios", (req, res) => {
    Usuario.find((err, usuarios) => {
        if(err){
            res.json({mensaje: "Error"})
        } else {
            res.json(usuarios)
        }
    })
})




// *****************
// TRABAJOS
// *****************

//schema
let trabajoSchema = new mongoose.Schema({
    nombre:String,
    areas:String,
    descripcionCorta:String,
    descripcionLarga:String,
    realizacion:String,
    fecha:String,
    portada:String,
    colores:Array,
    tipografias:Array,
    imagenes:Array,
});

//modelo
let Trabajo = mongoose.model("Trabajo", trabajoSchema);

app.get("/trabajos", (req, res) => {
    Trabajo.find((err, trabajos) => {
        if(err){
            res.json({mensaje: "Error"})
        } else {
            res.json(trabajos)
        }
    })
})


app.get("/trabajos/:id", (req,res) => {
    Trabajo.findById(req.params.id, (err, trabajoEncontrado) => {
        if(err){
            res.json({mensaje:"Error al encontrar trabajo"});
        }
        else {
            res.json(trabajoEncontrado)
        }
    })
})


/*
app.get("/usuarios", (req, res) => {
    res.send("Solicitud a /usuariosssss")
})
*/

//MIDDLEWARE DE 404
app.use((req,res,next)=> {
    res.statusCode = 404;
    res.json({mensaje: "no existe"})
})

app.listen(puerto, () => {
    console.log("Servidor ejecutado correctamente");
})
