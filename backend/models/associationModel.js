const mongoose = require("mongoose");
//definir un schema qu on va stocker ds monfoDB
const associationSchema = new mongoose.Schema({
  // id: {associations.length + 1},
  nomAssociation: { type: String, required: true },
  nomPrenomResponsable: { type: String, required: true },
  fonctionAssociation: { type: String, required: true },
  email: { type: String, required: true },
  accreditée:{ type:Boolean,required:true },
  // passeword: { type: String, required: true },
  numeTelephone: { type: String, required: true },
  dateCreation: { type: Date, required: true },//YYYY-MM-DD
  VilleAssociation: { type: String, required: true },
  categorie: { type: String, required: true },
  mission: { type: String, required: true },
  description_Benevole: { type: String, required: true },
  website:{type:String, required:true},
},{timestamps: true});/* evite de gérer manuellement les dates/ suivre l'historique des modifications / ideale pour afficher "Ajouté le..." ou "Mis à jour il y a... */

// Modèle Mongoose (creer par defaut ds database atlasse )
const Association = mongoose.model("Association",associationSchema);

module.exports=Association
/*
 "nomAssociation": "NoorWays",
        "nomPrenomResponsable": "Ahmed ben",
        "fonctionAssociation": "Président HR",
        "email": "Ahmed@gmail.com",
        "accreditée": true,
        "numeTelephone": "0612345678",
        "dateCreation": "2022-05-20T00:00:00.000Z",
        "VilleAssociation": "Casablanca",
        "categorie": "Sport",
        "mission": "aider les jeunes talentueux ",
        "description_Benevole": "On veut des bénévoles :pour acheter des equiplment.",
        "website": "https://noorways.org",
*/