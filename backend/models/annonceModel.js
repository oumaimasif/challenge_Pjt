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
  dateDebut: { type: Date },
  dateFin: { type: Date },
  nbrBenevole:{type:Number},
  aideReçu:{type:Boolean,default:false},//en attend
  statut: {
    type: String,
    default: "brouillon",
    enum: ["brouillon", "publié", "terminé", "en coure"],
  },
  niveauDurgence:{type:String,enum:["Moyen - Dans les Prochaines semaines," ,
    "Fiable - Dans les prochains mois",
    "Élevé - Besion immédiat" 
  ]},
  infoContact:{type:String},
  images: [{ type: String }],
  dateCreation: { type: Date, default: Date.now },
});

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;
/*
Publier leurs services : Exemple : "Cours de mathématiques gratuits pour lycéens."

Exprimer leurs besoins : Exemple : "Recherche de volontaires pour un événement caritatif."
*/