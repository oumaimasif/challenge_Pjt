const mongoose = require("mongoose");

const benevoleSchema = new mongoose.Schema({
  civilite: {
    type: String,
    enum: ["Femme", "Homme"], // Liste des valeurs autorisées(les valeur possible)
    required: true,
  },
  image: { type: String  }, // chemin d'img (non stockée directement)
  role: { type: String, default: "Benevole", enum: ["Benevole"] }, // Rôle fixé pour les bénévoles
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  profession: { type: String, required: false }, // facultatif étudiants, retraités
  // categorie: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categorie', required: true }],
  email: { type: String, required: true },
  password: { type: String, required: true },
  numeTelephone: { type: String, required: true  },
  dateDeNaissance: { type: Date, required: true }, //YYYY-MM-DD
  ville: { type: String, required: false }, // required: true

  categorie: [{ type: String, required: true ,default:[]}], // required: true la categorie de compétences

  competence: { type: String, required: false }, // required: true

  // missionARealiser: { type: Number, required: false },
  formationExperiences: { type: String, required: false }, // required: true
  description: { type: String, required: false },
  commentaires: { type: String, required: false }, // required: true

  disponible: { type: String, default: "Flexible" }, // default: true
  heure: { type: String ,required:false},
} ,{timestamps: true});
//modele moogoose
const Benevole = mongoose.model("Benevole", benevoleSchema);
module.exports = Benevole;
