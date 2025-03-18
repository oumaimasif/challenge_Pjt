const express = require("express");
const router = express.Router();
const Categorie = require("../models/categoriesModel");

//test
router.get("/me", async (req, res) => {
  await res.send("je suis ds la routes des Categories");
  console.log("voila la route du test");
});

// afficher list des categories
router.get("/", async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json({ message: "Voila la list des categories  ", categories });
    // console.log("list categories: ",categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des catégories" });
  }
});

// post  autre methode avce destruction pour admin et meme les association benevole
router.post("/add", async (req, res) => {
  try {
    const { nom, description, icone } = req.body;
    const newCategorie = new Categorie({ nom, description, icone });
    await newCategorie.save();
    res.status(201).json({message:"Bien ajoutée " ,newCategorie});
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la catégorie" });
  }
});

module.exports = router;
