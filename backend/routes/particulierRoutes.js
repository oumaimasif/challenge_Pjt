const express = require("express");
const router = express.Router();
const Particulier = require("../models/particulierModel");
const upload = require("../multerconfig");


//test
router.get("/me",  (req, res) => {
  res.send("Liste des particulier");
});

//ajouter
// router.post("/add", async (req, res) => {
//   try {
//     const newParticulier = new Particulier(req.body);
//     await newParticulier.save();
//     res.status(200).json({ message: "Particulier bien ajoutée" });
//   } catch (error) {
//     res.status(400).json({ error: "ERReur "+error.message });
//   }
// });

//ajouter avec image (uploadParticlier)
router.post("/add_particulier", upload.single("image"), async (req, res) => {
  try {
    console.log("Données reçues:", req.body);
    console.log("Fichier reçu:", req.header);
    const pathImage= req.file ? req.file.path : "uploads/uploadsParticulier/avatar_particulier.jpg";
    const newParticulier = new Particulier({
      ...req.body,
      image: pathImage,});

      const validationError = newParticulier.validateSync();
      if (validationError) {
        console.error("Erreur de validation:", validationError);
        return res.status(400).json({ error: validationError.message });
      }
      
    await newParticulier.save();

    res.status(200).json({ message: "Particulier bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: "ERReur "+error.message });
  }
});

//get all

router.get("/", async (req, res) => {
  try {
    const data = await Particulier.find();
    res.send( data);
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
    const demandes = await DemandeAide.find({ particulier: id })
      .sort({ createdAt: -1 }); // tier de plus recent en plus ancien
      
    res.status(200).json(demandes);
  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
