const express = require("express");
// const mongoose = require ("mongoose");
const connectDB= require("./dataBase/db");
const cors= require("cors");
const port=5000;

const app = express();
app.use(express.json());
app.use(cors());

// const uri = "mongodb+srv://Omaima134:Omaima134@cluster0.paelt.mongodb.net/dbnoorways?retryWrites=true&w=majority&appName=Cluster0";

// mongoose.connect(uri,{})
// .then(()=> console.log("Connecté à MongoDB"))
// .catch((err)=>{
//     console.error(err);
// });

//connect to db 
connectDB();

//il faut qu on lies les routes ds le serveur pour les ecouter

//todo: importation les routes des associations
const associationRoutes=require("./routes/associationRoutes");
app.use("/associations",associationRoutes);// Lier les routes avec le bon préfixe /association_api/nome_du_routes

//todo impotation pour les benevoles
const benevoleRoutes=require("./routes/benevoleRoutes");
app.use("/benevoles",benevoleRoutes);

// importation pour les particuliers
const particulierRoutes= require("./routes/particulierRoutes");
app.use("/particuliers",particulierRoutes);

app.listen(port,()=>{
    console.log("serveur ecoutant sur http://localhost:" + port);
})