const mongoose = require("mongoose");
//definir un schema qu on va stocker ds monfoDB
const associationSchema = new mongoose.Schema({
  nomAssociation: { type: String, required: true },
  categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true }],
  nomPrenomResponsable: { type: String, required: true },
  fonctiondsAssociation: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: "Association", enum: ["Association"] },
  accreditée:{ type:Boolean,required:true },
  // passeword: { type: String, required: true },
  numeTelephone: { type: String, required: true },
  dateCreation: { type: Date, required: true },//YYYY-MM-DD
  VilleAssociation: { type: String, required: true },
  categorie: { type: String, required: true },
  mission: { type: String, required: true },//but de l'association
  // website:{type:String, required:true},
}                                                                                                                                                
 ,{timestamps: true});/* evite de gérer manuellement les dates/ suivre l'historique des modifications / ideale pour afficher "Ajouté le..." ou "Mis à jour il y a... */

// Modèle Mongoose (creer par defaut ds database atlasse )
const Association = mongoose.model("Association",associationSchema);

module.exports=Association

