const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  associationID:{ type: mongoose.Schema.Types.ObjectId ,    required: false ,ref:"Association" },
  benevoleID:{ type: mongoose.Schema.Types.ObjectId ,    required: false ,ref:"Benevole" },
  role: {
    type: String, required: true,
    enum: ['benevole', 'association']
  },
  type: { 
    type: String, 
    enum: ["Service", "Besoin"], // Soit un service offert, soit un besoin exprimé
    required: true 
  },
  // categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],  
  categories:[{type:String}],
  ville: { type: String,required:true },
  date: { type: Date, default: Date.now }, // Date de publication
  // dateDebut: { type: Date },
  // dateFin: { type: Date },
  statut: {
    type: String,
    default: "brouillon",
    enum: ["brouillon", "publié", "terminé", "en coure"],
  },
  images: [{ type: String }],
  dateCreation: { type: Date, default: Date.now },
  // nbrBenevole:{type:String},
});

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;
/*
Publier leurs services : Exemple : "Cours de mathématiques gratuits pour lycéens."

Exprimer leurs besoins : Exemple : "Recherche de volontaires pour un événement caritatif."
*/