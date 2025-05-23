const express = require("express");
const router = express.Router();
const Benevole = require("../models/benevoleModel");
const upload = require("../multerconfig");
const bcrypt = require("bcryptjs");
const { enregistrerActiviter } = require("./activiteUtils");
const {verifierToken, checkRole}= require("../auth");
const { mquery } = require("mongoose");



//test
router.get("/me", async (req, res) => {
  await res.send("je suis ds la routes des benevoles");
  console.log("voila la route du test");
});



router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //page actuelle (pr defaut:1)
    const limit = parseInt(req.query.limit) || 12; //nbr de benevoles par page
    const skip = (page - 1) * limit; //element à sauter

    //partie recherche
    const search =req.query.search||"";
    const querySearch = search?{
      $or :[
        {nom:{$regex :search,$options:"i"}},
        {prenom:{$regex :search,$options:"i"}},
        {ville:{$regex :search,$options:"i"}},
        {description:{$regex :search,$options:"i"}},
        {disponible:{$regex :search,$options:"i"}},
        {heure:{$regex :search,$options:"i"}},
        {disponible:{$regex :search,$options:"i"}},
        // {"categorie.label":{$regex :search,$options:"i"}},
        // { categorie: { $elemMatch: { label: { $regex: search, $options: "i" } } } },
        { categorie: { $regex: search, $options: "i" } }

      ]

    }:{};
    const benevoles = await Benevole.aggregate([
      {$match :querySearch},
      {
        $lookup: {
          from: "annonces",
          // localField: "_id",
          // foreignField: "benevoleID",
          let: { benevoleId: "$_id" },
          pipeline: [
            { 
              $match: { 
                $expr: { $eq: ["$benevoleID", "$$benevoleId"] },
                statut: "Publié" // Filtrer uniquement les annonces publiées
              } 
            }
          ],
          as: "annonces",
        },
      },
      {
        $addFields: {
          annoncesCpt: { $size: "$annonces" },
        },
      },
      {
        $project: { annonces: 0 },
      },
      //tri par date de cration
      { $sort: { createdAt: -1 } },
      //pagination
      { $skip: skip },
      { $limit: limit },
    ]);

    const totalBen = await Benevole.countDocuments(querySearch); //pr calculer nbr de pages &condition
    // console.log("totalBen: ", totalBen);

    res.json({
      dataBenevole: benevoles,
      totalPages: Math.ceil(totalBen / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ msg: "Erreur serveur", error });
  }
});

//ajouter avec image (=> uploadsBenevole) + enregistrerActiviter
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const pathImage = req.file
      ? req.file.path
      : "uploads/uploadsBenevole/avatar_benevole.png";
    let categories = [];
    if (req.body.categorie) {
      try {
        categories = JSON.parse(req.body.categorie);
      } catch (e) {
        categories = [req.body.categorie];
      }
    }

    //todo frontend,envoier un tableau de catégories sous forme de chaîne JSON dans formData.append("categorie", JSON.stringify(selectedCategories)).
    //todo mais le backend, parserer ce champ pour le stocker dans MongoDB via JSON.parse(req.body.categorie).
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashePassword = await bcrypt.hash(password, salt);

    const newBenevole = new Benevole({
      ...req.body, //destructeure req.body =>>> spread operator (...).
      categorie: categories, // ajouter les categories ds l'objet
      image: pathImage, // ajouter l'image dans l'objet
      password: hashePassword,
    });
    await newBenevole.save();
    await enregistrerActiviter(
      'inscription','Nouvelle inscription',`${newBenevole.nom} ${newBenevole.prenom} (Bénévole)`,
      'benevole', newBenevole._id,
      'benevole'
    )
    res
      .status(201)
      .json({ message: "Benevole enregistré avec succès ", newBenevole });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const benevole = await Benevole.findByIdAndDelete(req.params.id);
    //id exist ou pas
    if (!benevole) {
      return res
        .status(404)
        .json({ error: "Ce Benevole non touvée: ", benevole });
    }
    res.json({ message: "Benevole supprimé avec succès " });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// afficher les information d'un id benevole
router.get("/profileBenevole/:id", async (req, res) => {
  try {
    const profil = await Benevole.findById(req.params.id);
    if (!profil) {
      console.log("Non trouvée ", profil + " ---------");
    }
    res.status(200).json(profil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", verifierToken, upload.single("image"), async (req, res) => {
  try {
    const benevoleId = req.params.id;
    
    // Vérifier si l'utilisateur est admin ou le bénévole concerné
    if (req.user.role !== "admin" && req.user.id !== benevoleId) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }
    
    // Vérifier si le bénévole existe
    const existe = await Benevole.findById(benevoleId);
    if (!existe) {
      return res.status(404).json({ message: "Bénévole non trouvé" });
    }
    
    // Préparer les données à mettre à jour
    const updateData = { ...req.body };
    
    // Traiter l'image si elle est fournie
    if (req.file) {
      updateData.image = req.file.path;
    }
    
    // Traiter les catégories
    if (req.body.categorie) {
      try {
        updateData.categorie = JSON.parse(req.body.categorie);
      } catch (e) {
        updateData.categorie = [req.body.categorie];
      }
    }
    
    // Traiter le mot de passe s'il est fourni
    if (req.body.password && req.body.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(req.body.password, salt);
    } else {
      // Ne pas modifier le mot de passe s'il n'est pas fourni
      delete updateData.password;
    }
    
    // Mettre à jour le bénévole
    const updatedBenevole = await Benevole.findByIdAndUpdate(
      benevoleId,
      updateData,
      { new: true } // Retourner l'objet mis à jour
    );
    
    // Enregistrer l'activité
    await enregistrerActiviter(
      "modification",
      "Modification de profil bénévole",
      `Profil modifié: ${updatedBenevole.prenom} ${updatedBenevole.nom}`,
      "benevole",
      req.user.id,
      req.user.role
    );
    
    res.status(200).json({
      message: "Profil bénévole mis à jour avec succès",
      benevole: updatedBenevole,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    res.status(500).json({
      message: "Erreur lors de la mise à jour du profil bénévole",
      error: error.message,
    });
  }
});

module.exports = router;
