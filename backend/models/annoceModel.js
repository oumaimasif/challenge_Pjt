const mongoose = require("mongoose");

const annoceSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  //  associationID:{ type: mongoose.Schema.Types.ObjectId ,    required: true  },
  createby: {
    type: mongoose.Schema.Types.ObjectId,
    // ref:"User",
    required: true,
  },
  role: {
    type: String, required: true,
    enum: ['benevole', 'association']
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }],  
  localisation: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
  statut: {
    type: String,
    default: "brouillon",
    enum: ["brouillon", "publié", "terminé", "annulé"],
  },
  images: [{ type: String }],
  dateCreation: { type: Date, default: Date.now },
  nbrBenevole:{type:String},
  skillsBenevole:[{type:String}]
});

const Annonce = mongoose.model('Annonce', annonceSchema);

module.exports = Annonce;