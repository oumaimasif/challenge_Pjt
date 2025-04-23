const express = require("express");
// const mongoose = require ("mongoose");
const connectDB = require("./dataBase/db");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5001;

//todo: importation les routes des associations
const associationRoutes = require("./routes/associationRoutes");

//todo impotation pour les benevoles
const benevoleRoutes = require("./routes/benevoleRoutes");

//todo importation pour les particuliers
const particulierRoutes = require("./routes/particulierRoutes");

//todo ; importaion pour les categories
const categorieRoutes = require("./routes/categorieRoutes");

//todo ; importaion pour les annonces
const annonceRoutes = require("./routes/annonceRoutes");

const demandeAideRoutes = require("./routes/demandeAideRoutes");

const admin = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const loginRoute = require("./routes/login");
const app = express();

app.use("/uploads", express.static("uploads")); //autoriser les fichiers statique (si nn les imgs ne seront ps accessibles  depuis le frontend)
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
app.use("/associations", associationRoutes); // lier les routes /nomprincipale/nome_du_routes /association/:id

app.use("/benevoles", benevoleRoutes);

app.use("/particuliers", particulierRoutes);

app.use("/categories", categorieRoutes);

app.use("/annonces", annonceRoutes);

app.use("/demandeAide", demandeAideRoutes);

app.use("/admin", admin);

app.use("/contact", contactRoutes);

app.use("/login",loginRoute);


app.listen(PORT, () => {
  console.log("serveur ecoutant sur http://localhost:" + PORT);
});
