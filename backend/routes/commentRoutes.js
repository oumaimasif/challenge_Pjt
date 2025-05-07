const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const { verifierToken } = require("../auth");
const Annonce = require("../models/annonceModel");
const Demande = require("../models/demandeAideModel");
const { enregistrerActiviter } = require("./activiteUtils");

router.post("/add", verifierToken, async (req, res) => {
  const { Type, typeId, content, showMe } = req.body;
  try {
    const com = new Comment({
      Type,
      typeId,
      showMe,
      authorId: req.user.id,
      authorType: req.user.role,
      content,
    });

    await com.save();

    let titre;
    if (Type === "annonce") {
      const annonce = await Annonce.findById(typeId);
      titre = annonce ? annonce.titre : typeId;
    } else if (typeId === "demande") {
      const demande = await Demande.findById(typeId);
      titre = demande ? demande.titre : typeId;
    } else {
      titre = typeId;
    }

    // Enregistrer l'activité
    await enregistrerActiviter(
      "comment",
      "Nouveau commentaire",
      `Commentaire ajouté sur ${typeId} : "${titre}"`,
      "commentaire",
      req.user.id,
      req.user.role
    );

    res.status(201).json(com);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:Type/:typeId", async (req, res) => {
  const { Type, typeId } = req.params;
  try {
    const comments = await Comment.find({ Type, typeId }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifierToken, async (req, res) => {
  try {
    const com = await Comment.findById(req.params.id);

    if (!com) return res.status(404).end();

    if (com.authorId.toString() !== req.user.id && req.user.role !== "admin")
      return res.status(403).end();
    // await com.remove();
    await Comment.findByIdAndDelete(req.params.id);

    //afficher le titre de annonce ou demande en lieu de son id
    let titre = com.typeId;
    if (com.Type === "annonce") {
      const annonce = await Annonce.findById(com.typeId);
      titre = annonce ? annonce.titre : com.typeId;
    } else if (com.Type === "demande") {
      const demande = await Demande.findById(com.typeId);
      titre = demande ? demande.titre : com.typeId;
    } 

    await enregistrerActiviter(
      "comment",
      "Suppression commentaire",
      `Commentaire supprimé de => ${com.Type} : "${titre}"`,
      "commentaire",
      req.user.id,
      req.user.role
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
