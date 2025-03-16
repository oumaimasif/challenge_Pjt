const express = require("express");
const router = express.Router();
const Particulier = require("../models/particulierModel");

//test
router.get("/me", async (req, res) => {
  await res.send("Liste des particulier");
});

//ajouter
router.post("/add_particulier", async (req, res) => {
  try {
    const newParticulier = new Particulier(req.body);
    await newParticulier.save();
    res.status(200).json({ message: "Particulier bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//get all

router.get("/", async (req, res) => {
  try {
    const data = await Particulier.find();
    res.json({ message: "lists des particulier ", data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//supprimer Particulier by id
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    
    const datatoDelete = await Particulier.findByIdAndDelete(req.params.id);
    if (!datatoDelete) {
      return res.status(404).json({ error: "Particulier non touvée" });
    }
    res.json({ message: "Particulier supprimé avec succès ", datatoDelete });

  } catch (error) {
    res.status(400).json({ error:"Erreur Serveur: "+ error.message });
  }
});

module.exports = router;
