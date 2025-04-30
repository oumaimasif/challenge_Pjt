const express = require("express");
const router = express.Router();
const Annonce = require("../models/annonceModel");
const upload = require("../multerconfig");
const { default: mongoose } = require("mongoose");
const Association = require("../models/associationModel");
const Benevole = require("../models/benevoleModel");

//test
router.get("/me", (req, res) => {
  res.send("Liste des annonces");
  console.log("liste des annoces ici console");
});

router.get("/lists", async (req, res) => {
  const data = await Annonce.find();
  res.json(data);
});
//*1
router.get("/benevoleProfil/:benevoleID", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.benevoleID);
    const annonces = await Annonce.aggregate([
      { $match: { benevoleID: Id } },
      {$lookup:{
        from:"benevoles",
        localField:"benevoleID",
        foreignField:"_id",
        as:"Benevoles"
      }},
    ]);
    // console.log("benevoleID: ", req.params.benevoleID);
    // console.log("Annonces trouvées av info benevole backend:", annonces);
    res.json(annonces);
    // console.log("Annonces  nbr: ", annonces.length);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//*2
//Pour récuperer les annonces d'une association spécifique
router.get("/associationProfil/:associationID", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.associationID);
    const annonces = await Annonce.aggregate([
      { $match: { associationID: Id } },
      {$lookup:{
        from:"associations",
        localField:"associationID",
        foreignField:"_id",
        as:"Association"
      }},
    ]);
     console.log("associationID: ", annonces);
    // console.log("Annonces trouvées av info benevole backend:", annonces);
    res.json(annonces);
    // console.log("Annonces  nbr: ", annonces.length);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//affichet les info du benevole dans annonceDetail
router.get("/benevole/:id", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id); //convertire l'id en objectId
    const annonceBenevole = await Benevole.find({ _id: Id });
    res.json(annonceBenevole[0]);
    console.log("Requête avec benevoleID :", annonceBenevole);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

//afficher annonces par associationID
router.get("/association/:id", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.id); //convertire l'id en objectId
    const annonceAss = await Association.find({ _id: Id });
    res.json(annonceAss[0]);
    console.log("Requête avec associationID :", annonceAss);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

//annoncesDoc Plus D'information sur annonce
router.get("/annonceDetail/:id", async (req, res) => {
  try {
    const annonceId = await Annonce.findById(req.params.id);
    if (!annonceId) {
      return res.status(404).json({ message: "Annonce non trouvée" });
    }
    res.json(annonceId);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

//afficher les annonces avec leur associations et benevoles en utilise aggregate

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1; //page actuelle (pr defaut:1)
  const limit = parseInt(req.query.limit) || 6; //nbr de benevoles par page
  const skip = (page - 1) * limit; //element à sauter

  const result = await Annonce.aggregate([
    {
      $lookup: {
        from: "associations", //nom de la collection (db )
        localField: "associationID", //champe qui fait refference a id de l'association(annonce)
        foreignField: "_id", //champe qui fait la ref dans la collection mere (associationss)
        as: "Association", //ici en affiche les resulta de joiture $lookup
      },
    },
    {
      $lookup: {
        from: "benevoles",
        localField: "benevoleID",
        foreignField: "_id",
        as: "Benevoles",
      },
    },
    //tri par date de cration
    { $sort: { createdAt: -1 } },
    //pagination
    { $skip: skip },
    { $limit: limit },
  ]);

  const totaleAnnonce = await Annonce.countDocuments();

  res.json({
    data: result,
    totalPages: Math.ceil(totaleAnnonce / limit),
    currentPage: page,
  });
  // console.log("la list des annonces publier par les associations : ", result);
});

//Route pour ajouter une annonce (av image stock partie serveur)
router.post("/add_annonces", upload.single("image"), async (req, res) => {
  try {
    const newAnnonce = new Annonce({
      titre: req.body.titre,
      description: req.body.description,
      associationID: req.body.associationID,
      benevoleID: req.body.benevoleID,
      role: req.body.role,
      type: req.body.type,
      categories: req.body.categories ? req.body.categories.split(",") : [], //convertit en tableau
      ville: req.body.ville,
      dateDebut: req.body.dateDebut,
      nbrBenevole: req.body.nbrBenevole,
      aideReçu: req.body.aideReçu,
      statut: req.body.statut,
      niveauDurgence: req.body.niveauDurgence,
      infoContact: req.body.infoContact,
      image: req.file
        ? req.file.path
        : "uploads/uploadsAnnonce/avatar_annonce.jpg", //stocke le chemin de l'image (bd)(par defaut avatar_annonce)
    });
    await newAnnonce.save();
    res.status(201).json({ message: "Annonce ajoutée avec succès " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//

module.exports = router;
