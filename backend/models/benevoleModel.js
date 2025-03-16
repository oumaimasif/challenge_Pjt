const mongoose = require("mongoose");

const benevoleSchema = new mongoose.Schema(
  {
    // id: {associations.length + 1},
    civilité: {
      type: String,
      enum: ["Femme", "Homme"], // pour lister des valeurs possibles || autorisée il faut ajouter enum []
      required: true,
    },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    profession: { type: String, required: true },
    email: { type: String, required: true },
    // passeword: { type: String, required: true },
    numeTelephone: { type: String, required: true },
    dateDeNaissance: { type: Date, required: true }, //YYYY-MM-DD
    ville: { type: String, required: true },

    categorie: { type: String, required: true },
    competence: { type: String, required: true },
    missionARealiser: { type: String, required: true },
    formationExperiences: { type: String, required: true },
    commentaires: { type: String, required: true },
    disponible: { type: Boolean, default: true },
    heure: { type: String },
    website: { type: String},
  },
  { timestamps: true }
); /* evite de gérer manuellement les dates/ suivre l'historique des modifications / ideale pour afficher "Ajouté le..." ou "Mis à jour il y a... */

//modele moogoose
const Benevole = mongoose.model("Benevole", benevoleSchema);
module.exports = Benevole;
