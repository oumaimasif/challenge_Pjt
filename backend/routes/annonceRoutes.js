const express = require("express");
const router = express.Router();
const Annonce = require("../models/annonceModel");
const upload = require("../multerconfig");
const { default: mongoose } = require("mongoose");
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
router.get("/lists", async (req, res) => {
  const data = await Annonce.find();
  res.json(data);
});
//afficher annonces un benevoleID
router.get("/benevole/:id",async (req,res) =>{
    try {
        const Id = new mongoose.Types.ObjectId(req.params.id);//convertire l'id en objectId
        const annonceBenevole = await Annonce.find({benevoleID:Id});
        res.json(annonceBenevole);
        console.log("Requête avec benevoleID :", annonceBenevole);
    
    } catch (error) {

    res.status(500).json({ message: "Erreur serveur", error });

    }
})


//afficher les annonces avec leur associations et benevoles en utilise aggregate

router.get("/", async (req, res) => {
  const result = await Annonce.aggregate([
    {
      $lookup: {
        from: "associations",//nom de la collection (db )
        localField: "associationID",//champe qui fait refference a id de l'association(annonce)
        foreignField: "_id",//champe qui fait la ref dans la collection mere (associationss)
        as: "Association",//ici en affiche les resulta de joiture $lookup
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

  ]);
  res.json(result);
  console.log("la list des annonces publier par les associations : ", result);
});


//ajouter une association
router.post("/add", async (req, res) => {
  try {
    const newAnnonce = new Annonce(req.body);
    await newAnnonce.save();
    res.status(200).json({ message: "Bien ajoutée" },newAnnonce);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//Route pour gerer une annonce (av image)
router.post("/add_annonces",upload.single("image"),async (req, res)=>{

    try {
         const newAnnonce=new  Annonce({
            titre: req.body.titre,
            description: req.body.description,
            associationID: req.body.associationID,
            benevoleID:req.body.benevoleID,
            role: req.body.role,
            type:req.body.type,
            categories: req.body.categories ? req.body.categories.split(","):[],//convertit en tableau
            ville:req.body.ville,
            dateDebut: req.body.dateDebut,
            nbrBenevole:req.body.nbrBenevole,
            aideReçu:req.body.aideReçu,
            statut:req.body.statut,
            niveauDurgence:req.body.niveauDurgence,
            infoContact:req.body.infoContact,
            image:req.file?req.file.path:"uploads/avatar_annonce.jpg" ,//stocke le chemin de l'image (bd)(par defaut avatar_annonce)
         });
         await newAnnonce.save();
         res.status(201).json({message: "Annonce ajoutée avec succès "});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

//

module.exports = router;
