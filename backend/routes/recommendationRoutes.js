const express = require("express");
const router = express.Router();
const Recommendation = require("../models/recommendationsModel");
const Benevole = require("../models/benevoleModel");
const Association = require("../models/associationModel");
const { verifierToken } = require("../auth");
const Particulier = require("../models/particulierModel");
const { enregistrerActiviter } = require("./activiteUtils");

// Récupérer toutes les recommandations pour un bénévole ou une association
router.get("/:roleType/:sendToId", async (req, res) => {
  try {
    const { roleType, sendToId } = req.params;

    // // Vérifier que le type cible est valide
    // if (roleType !== "benevole" && roleType !== "association") {
    //   return res.status(400).json({ message: "Type de cible invalide" });
    // }

    const recommendations = await Recommendation.find({
      sendToId,
      roleType,
    }).sort({ createdAt: -1 }); // Tri par date, plus récent en premier

    res.status(200).json(recommendations);
  } catch (error) {
    console.error("Erreur lors de la récupération des recommandations:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// new recommandation
router.post("/add", verifierToken, async (req, res) => {
  try {
    const { sendToId, roleType, content,score } = req.body;

    if (!content || content.trim() === "" ||!score) {
      return res.status(400).json({ message: "Le contenu ou le score ne peut pas être vide" });
    }

    // // Vérifier que le type cible est valide
    // if (roleType !== "benevole" && roleType !== "association") {
    //   return res.status(400).json({ message: "Type de cible invalide" });
    // }

    // Vérifier que l'ID cible existe
    let Data;
    if (roleType === "benevole") {
      Data = await Benevole.findById(sendToId);
    } else {
      Data = await Association.findById(sendToId);
    }

    if (!Data) {
      return res.status(404).json({ message: `${roleType} non trouvé` });
    }

    // Récupérer les informations de l'auteur
    let authorName, authorImage;

    if (req.user.role === "benevole") {
      const benevole = await Benevole.findById(req.user.id);
      authorName = `${benevole.nom} ${benevole.prenom}`;
      authorImage = benevole.image;
    } else if (req.user.role === "association") {
      const association = await Association.findById(req.user.id);
      authorName = association.nomAssociation;
      authorImage = association.image;
    } else if(req.user.role==="particulier") {
      // Pour les particuliers ou autres rôles
      const particulier = await Particulier.findById(req.user.id);
      authorName = particulier.nomAssociation;
      authorImage = particulier.image;
    }

    // Vérifier que l'utilisateur n'est pas en train de se recommander lui-même
    if (req.user.id === sendToId) {
      return res.status(400).json({ message: "Vous ne pouvez pas vous recommander vous-même" });
    }

    // Créer la nouvelle recommandation
    const newRecommendation = new Recommendation({
      sendToId,
      roleType,
      authorId: req.user.id,
      authorType: req.user.role,
      authorName,
      authorImage,
      content,
      score
    });

    await newRecommendation.save();
    await enregistrerActiviter( 
        "ajouter",
        "Ajouter une recommendation",
        `Recommendation bien ajouter pour: ${Data.nom || Data.nomAssociation}`,
        "recommendation",
        req.user.id,//id de user
        req.user.role//role de user 
    )

    res.status(201).json(newRecommendation);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'une recommandation:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// Supprimer une recommandation (uniquement par l'auteur ou l'admin)
router.delete("/:id", verifierToken, async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ message: "Recommandation non trouvée" });
    }

    // Vérifier que l'utilisateur est l'auteur ou un admin
    if (
      recommendation.authorId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "Vous n'êtes pas autorisé à supprimer cette recommandation",
      });
    }

    await Recommendation.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Recommandation supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression d'une recommandation:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;