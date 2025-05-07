const mongoose =require("mongoose");

const activiteSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        "inscription",
        "connexion",
        "modification",
        "suppression",
        "annonce",
        "demande",
        "ajouter",//recommender
        "comment"

      ],
    },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    categorie: {
      type: String,
      required: true,
      enum: [
        "benevole",
        "association",
        "particulier",
        "annonce",
        "demande",
        "admin",
        "recommendation",
        "commentaire",
      ],
    },
    utilisateurId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Benevole" || "Association" || "Particulier",
      default: null,
    },

    typeUser: {
      type: String,
      enum: ["benevole", "association", "particulier", "admin", "system"],
      default: "system",
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Activite = mongoose.model('Activite', activiteSchema);
module.exports = Activite;