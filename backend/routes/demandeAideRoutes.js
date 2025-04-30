const express = require("express");
const router = express.Router();
const DemandeAide = require("../models/demandeAideModel");
const upload = require("../multerconfig");
const mongoose = require("mongoose");
const Particulier = require("../models/particulierModel");

router.get("/me", (req, res) => {
  res.send(" Demandes d'aide ");
});

// Ajouter une nouvelle demande d'aide av image
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    // Vérifier si le particulier existe
    const particulier = await Particulier.findById(req.body.particulier);
    if (!particulier) {
      return res.status(404).json({ error: "Particulier non trouvé" });
    }

    // Préparer les données de la demande
    const demandeData = {
      ...req.body,
      categorie: JSON.parse(req.body.categorie || "[]"),
    };

    // Ajouter le chemin de l'image si elle a été téléchargée
    if (req.file) {
      demandeData.image = req.file.path;
    } else {
      // Image par défaut si aucune image n'est fournie
      demandeData.image = "uploads/uploadsDemandes/default_demande.jpg";
    }

    // Créer et sauvegarder la nouvelle demande
    const nouvelleDemande = new DemandeAide(demandeData);
    await nouvelleDemande.save();

    res.status(201).json({
      message: "Demande d'aide créée avec succès",
      demande: nouvelleDemande,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la demande:", error);
    res.status(400).json({ error: error.message });
  }
});

// Récupérer toutes les demandes d'aide
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; //page actuelle (pr defaut:1)
  const limit = parseInt(req.query.limit) || 9; //nbr de benevoles par page
  const skip = (page - 1) * limit; //element à sauter
  try {
    const demandes = await DemandeAide.aggregate([
      {
        $lookup: {
          from: "particuliers",
          localField: "particulier",
          foreignField: "_id",
          as: "particulierInfo",
        },
      },
      {
        $unwind: "$particulierInfo",
      },
      {
        $sort: { createdAt: -1 }, // n=>a ! annonce a faire
      },
      //pagination
      { $skip: skip },
      { $limit: limit },
    ]);

    // Compte le nombre total de demandes aides
    const totalDemandesAide = await DemandeAide.countDocuments();

    res.status(200).json({
      demandes: demandes,
      totalPages: Math.ceil(totalDemandesAide / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une demande d'aide par ID (url)
router.get("/:id", async (req, res) => {
  try {
    const demande = await DemandeAide.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
      {
        $lookup: {
          from: "particuliers",
          localField: "particulier",
          foreignField: "_id",
          as: "particulierInfo",
        },
      },
      {
        $unwind: "$particulierInfo",
      },
      {
        // le ronomer => particulier pour respecter la structure attendue par le frontend
        $addFields: {
          particulier: "$particulierInfo", //particulier.nom....
        },
      },
      {
        // Supprimer le champ particulierInfo qui n'est plus nécessaire
        $project: {
          particulierInfo: 0, //ne pas afficher []
        },
      },
    ]);
    if (demande.length === 0) {
      return res.status(404).json({ error: "Demande d'aide non trouvée" });
    }
    res.status(200).json(demande[0]); //premier element pr eviter les erreurs
  } catch (error) {
    console.error("Erreur lors de la récupération de la demande:", error);
    res.status(500).json({ error: error.message });
  }
});

// Récupérer les demandes d'aide d'un particulier spécifique
router.get("/particulier/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si le particulier existe
    const particulierExists = await Particulier.findById(id);
    if (!particulierExists) {
      return res.status(404).json({ error: "Particulier non trouvé" });
    }

    // trouver toutes les demandes d'aide associées à ce particulier
    const demandes = await DemandeAide.find({ particulier: id }).sort({
      createdAt: -1,
    }); // tier de plus recent en plus ancien

    res.status(200).json(demandes);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
