const express = require("express");
const router = express.Router();
const Association = require("../models/associationModel");
const upload = require("../multerconfig");
const { default: mongoose } = require("mongoose");

//test
router.get("/me", (req, res) => {
  res.send("Liste des associations");
  console.log("liste des associaton ici console");
});

//afficher tt les association
router.get("/", async (req, res) => {
  const data = await Association.find();
  res.json(data);
});

//ajouter une association
router.post("/add", async (req, res) => {
  try {
    const newAssociation = new Association(req.body);
    await newAssociation.save();
    res.status(200).json({ message: "Bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


//add avec image
router.post("/add_association", upload.single("image"), async (req, res) => {
  try {
    // console.log("info reçu :", req.body);
    // console.log("info reçu :", req.header);

    const pathImage = req.file
      ? req.file.path
      : "uploadsAssociation/avatar_association.png";
    let categories = [];
    if (req.body.categorie) {
      try {
        categories = JSON.parse(req.body.categorie);
      } catch (e) {
        categories = [req.body.categorie];
      }
    }

    console.log("Valeur avant le save:", req.body.accreditee);

    let accrediteeValue = req.body.accreditee;
    if (Array.isArray(accrediteeValue)) {
      accrediteeValue = accrediteeValue[0];
    }
    let accreditee = accrediteeValue === "true"; // convertire en booléen
    const newAssociation = new Association({
      ...req.body,
      accreditee: accreditee,
      categorie: categories,
      image: pathImage,
    });

    await newAssociation.save();

    console.log("Type of acctivite:" ,typeof accreditee, " Valeur : ",accreditee);

    res.status(201).json({
      message: "Association enregistrée avec succès ",
      newAssociation,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//afficher profile
router.get("/association/:id", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id);
    const association = await Association.findOne(Id);
    if (!association) {
      return res.status(404).json({ message: "association non trouvée" });
    }
    res.json(association);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

//supprimer une association
router.delete("/:id", async (req, res) => {
  try {
    const IDToDelete = req.params.id;
    // Supprimer l'utilisateur dans la base de données (MongoDB)
    const association = await Association.findByIdAndDelete(IDToDelete);
    if (!association) {
      return res.status(404).json({ error: "Association non touvée" });
    }
    res.json({ message: "Association  supprimé avec succès " });
  } catch (error) {
    res.status(400).json({
      message: "Erreur lors de la suppression de l'association",
      error: error.message,
    });
  }
});

//afficher un message si cette route n'existe pas
router.use((req, res) => {
  res.send("Cette route est inexistente");
});

module.exports = router;
