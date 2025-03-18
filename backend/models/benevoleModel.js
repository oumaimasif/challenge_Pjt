const mongoose = require("mongoose");

const benevoleSchema = new mongoose.Schema({
  civilite: {
    type: String,
    enum: ["Femme", "Homme"], // pour lister des valeurs possibles || autorisée il faut ajouter enum []
    required: true,
  },
  image: { type: String }, //nn stocker

  role: { type: String, default: "Benevole", enum: ["Benevole"] }, // Rôle fixé pour les bénévoles
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  profession: { type: String, required: false }, // required: true
  // categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true }],
  email: { type: String, required: true },

  // passeword: { type: String, required: true },

  numeTelephone: { type: String, required: true },
  dateDeNaissance: { type: Date, required: true }, //YYYY-MM-DD
  ville: { type: String, required: false }, // required: true

  categorie: { type: String, required: false }, // required: true

  competence: { type: String, required: false }, // required: true

  missionARealiser: { type: String, required: false }, // required: true

  formationExperiences: { type: String, required: false }, // required: true
  description: { type: String, required: false },
  commentaires: { type: String, required: false }, // required: true

  disponible: { type: String, default: "Flexible" }, // default: true

  heure: { type: String },
});
//modele moogoose
const Benevole = mongoose.model("Benevole", benevoleSchema);
module.exports = Benevole;
