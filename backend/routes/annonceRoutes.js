const express = require("express");
const router = express.Router();
const Annonce = require("../models/annonceModel");
// const Association = require("../models/associationModel");
// const Benevole = require("../models/benevoleModel");

//test
router.get("/me", (req, res) => {
  res.send("Liste des annonces");
  console.log("liste des annoces ici console");
});

/*
router.get("/", async (req, res) => {
  const dataAnnonce = await Annonce.aggregate([
    {
      $lookup: {
        from: "associations",
        localField: "associationID",
        foreignField: "_id",
        as: "associationDetails",
      },
    },
    {
      $lookup: {
        from: "benevoles",
        localField: "benevoleID",
        foreignField: "_id",
        as: "benevoleDetails",
      },
    },
    {
      $project: {
        titre: 1,
        description: 1,
        type: 1,
        ville: 1,
        statut: 1,
        date: 1,
        images: 1,
        role: 1,
        associationID: 1,
        benevoleID: 1,
        associationDetails:{$arrayElemAt:["$associationDetails",0]},
        benevoleDetails:{$arrayElemAt:["$associationDetails",0]},

      },
    },
  ]);

  res.status(200).json(dataAnnonce);
  console.log(" voila la list des annonces ", dataAnnonce)
});
*/
router.get("/", async (req, res) => {
  const data = await Annonce.find();
  res.json(data);
});

//afficher les annonces avec leur associations en utilise aggregate

router.get("/user_annonces", async (req, res) => {
  const result = await Annonce.aggregate([
    {
      $lookup: {
        from: "associations",//nom de la collection (db )
        localField: "associationID",//champe qui fait refference a id de l'association(annonce)
        foreignField: "_id",//champe qui fait la ref dans la collection mere (associationss)
        as: "annonce_Association",//ici en affiche les resulta de joiture $lookup
      },
    },
    {
      $lookup: {
        from: "benevoles",
        localField: "benevoleID",
        foreignField: "_id",
        as: "annonce_Association",
      },
    },
  ]);
  res.json(result);
  console.log("la list des annonces publier par les associations : ", result);
});

//ajouter une association
router.post("/add", async (req, res) => {
  try {
    const newAnnonces = new Annonce(req.body);
    await newAnnonces.save();
    res.status(200).json({ message: "Bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
