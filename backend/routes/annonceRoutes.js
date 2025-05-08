const express = require("express");
const router = express.Router();
const Annonce = require("../models/annonceModel");
const upload = require("../multerconfig");
const { default: mongoose } = require("mongoose");
const Association = require("../models/associationModel");
const Benevole = require("../models/benevoleModel");
const { enregistrerActiviter } = require("./activiteUtils");
const { verifierToken, checkRole } = require("../auth");

//test
router.get("/me", (req, res) => {
  res.send("Liste des annonces");
  console.log("liste des annoces ici console");
});

router.get("/lists", async (req, res) => {
  const data = await Annonce.find();
  res.json(data);
});
//*1 afficher les annonce publier pr visiteur normal et pour tt les status pour le proprietaire ou admin
router.get("/benevoleProfil/:benevoleID", async (req, res) => {
  try {
    const Id = new mongoose.Types.ObjectId(req.params.benevoleID);
    let matchId = { benevoleID: Id };
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.id !== req.params.benevoleID)
    ) {
      matchId.statut = "Publié";
    }
    const annonces = await Annonce.aggregate([
      { $match: matchId },
      {
        $lookup: {
          from: "benevoles",
          localField: "benevoleID",
          foreignField: "_id",
          as: "Benevoles",
        },
      },
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
    let matchId = { associationID: Id };
    if (
      !req.user ||
      (req.user.role !== "admin" && req.user.id !== req.params.associationID)
    ) {
      matchId.statut = "Publié";
    }
    const annonces = await Annonce.aggregate([
      { $match: matchId },
      {
        $lookup: {
          from: "associations",
          localField: "associationID",
          foreignField: "_id",
          as: "Association",
        },
      },
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
    { $match: { statut: "Publié" } }, //afficher que les annonces publié
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

  const totaleAnnonce = await Annonce.countDocuments({ statut: "Publié" }); //nbr de page ( juste les publier)<1-2>

  res.json({
    data: result,
    totalPages: Math.ceil(totaleAnnonce / limit),
    currentPage: page,
  });
  // console.log("la list des annonces publier par les associations : ", result);
});

//Route pour ajouter une annonce (av image stock partie serveur)
router.post(
  "/add_annonces",
  verifierToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // Utiliser l'ID de l'utilisateur connecté selon son rôle
      if (req.user.role === "association" && !req.body.associationID) {
        req.body.associationID = req.user.id;
        req.body.benevoleID = null; //selon le role donc benevole x asso v
      } else if (req.user.role === "benevole" && !req.body.benevoleID) {
        req.body.benevoleID = req.user.id;
        req.body.associationID = null;
      } else {
        return res.status(403).json({
          msg: "Seuls les associations et les bénévoles peuvent créer des annonces",
        });
      }

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

      await enregistrerActiviter(
        "annonce",
        "Nouvelle annonce",
        `Annonce créée: ${newAnnonce.titre}`,
        "annonce",
        req.user.id,
        req.user.role // 'benevole', 'association', etc.
      );

      res.status(201).json({ message: "Annonce ajoutée avec succès " }); //newAnnonce
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//put
router.put("/update/:id", verifierToken,upload.single("image"), async (req, res) => {
    try {
      const annonce = await Annonce.findById(req.params.id);
      if (!annonce) {
        return res.status(404).json({ msg: "Annonce nn trouvée" });
      }

      const isAllowe =
        (req.user.role === "association" &&
          annonce.associationID &&
          annonce.associationID.toString() === req.user.id) ||
        (req.user.role === "benevole" &&
          annonce.benevoleID &&
          annonce.benevoleID.toString() === req.user.id);
      if (!isAllowe) {
        return res
          .status(403)
          .json({ error: "vous n'etes pas autorisé à modifier cette annonce" });
      }

      const updateData = {
        titre: req.body.titre || annonce.titre,
        description: req.body.description || annonce.description,
        type: req.body.type || annonce.type,
        // categories: req.body.categories ? req.body.categories.split(",") : [], //convertit en tableau
        // => [["sante"]]
        categories: req.body.categories
          ? typeof req.body.categories === "string"
            ? req.body.categories.includes("[") //form JSon string
              ? JSON.parse(req.body.categories)
              : req.body.categories.split(",")
            : req.body.categories // c'est un
          : annonce.categories,
        ville: req.body.ville || annonce.ville,
        dateDebut: req.body.dateDebut
          ? new Date(req.body.dateDebut)
          : annonce.dateDebut,
        dateFin: req.body.dateFin
          ? new Date(req.body.dateFin)
          : annonce.dateFin,
        nbrBenevole: req.body.nbrBenevole || annonce.nbrBenevole,
        statut: req.body.statut || annonce.statut,
        niveauDurgence: req.body.niveauDurgence || annonce.niveauDurgence,
        infoContact: req.body.infoContact || annonce.infoContact,
      };

      if (req.file) {
        updateData.image = req.file.path; //si un new url est fournie en le change
      }

      // console.log("Données à mettre à jour:", updateData);

      const upAnnonce = await Annonce.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true, //retourn la version updated
          runValidators: true, // Exécute les validateurs du schéma
        }
      );
      await enregistrerActiviter(
        "annonce",
        "Modification d'annonce",
        `Annonce modifiée: ${upAnnonce.titre}`,
        "annonce",
        req.user.id,
        req.user.role
      );
      res.status(200).json({
        message: "Annonce mise a jour avec succès",
        annonce: upAnnonce,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

//suppression d'annonce
router.delete("/:id", verifierToken,async (req, res) => {
    try {
      const ID = req.params.id;
      const annonce = await Annonce.findById(ID);
      if (!annonce) {
        return res.status(404).json({ message: "Annonce non trouvée" });
      }

      //user est autoriser à faire la suppression
      const isAllowed = (req.user.role === "admin") ||
        (req.user.role === "association" && annonce.associationID && annonce.associationID.toString() === req.user.id)||
        (req.user.role === "benevole" && annonce.benevoleID && annonce.benevoleID.toString() === req.user.id);

        if(!isAllowed)
        {
          return res.status(403).json({ message: "Vous n'êtes pas autorisé à supprimer cette annonce" });
        }

        await Annonce.findByIdAndDelete(ID)
        await enregistrerActiviter(
          "annonce",
          "Suppression d'annonce",
          `Annonce supprimée: ${annonce.titre}`,
          "annonce",
          req.user.id,
          req.user.role
        );
        res.status(200).json({message:"Annonce supprimée avec succès"})
    } catch (error) {
      console.log("Erreur lors de la supp ",error);
      res.status(500).json({message:"Erreur lors de la suppression de l'annonce "})
    }
  })

  //affichet tt les annonces(gestionAssociation) 
  router.get("/allAnnonces/:associationID", verifierToken, async (req, res) => {
    try {
      // Vérifier si l'utilisateur est admin ou propriétaire de l'association
      if (req.user.role !== "admin" && req.user.id !== req.params.associationID) {
        return res.status(403).json({ message: "Accès non autorisé" });
      }
  
      const Id = new mongoose.Types.ObjectId(req.params.associationID);
      const annonces = await Annonce.aggregate([
        { $match: { associationID: Id } },
        {
          $lookup: {
            from: "associations",
            localField: "associationID",
            foreignField: "_id",
            as: "Association",
          },
        },
        // Tri par date de création (plus récentes d'abord)
        { $sort: { createdAt: -1 } }
      ]);
      
      res.json(annonces);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Route pour récupérer toutes les annonces liées à un bénévole
router.get("/allAnnoncesByBenevole/:benevoleID", verifierToken, async (req, res) => {
  try {
    // Vérifier si l'utilisateur est admin ou le bénévole concerné
    if (req.user.role !== "admin" && req.user.id !== req.params.benevoleID) {
      return res.status(403).json({ message: "Accès non autorisé" });
    }

    const Id = new mongoose.Types.ObjectId(req.params.benevoleID);
    const annonces = await Annonce.aggregate([
      { $match: { benevoleID: Id } },
      {
        $lookup: {
          from: "benevoles",
          localField: "benevoleID",
          foreignField: "_id",
          as: "Benevole",
        },
      },
      // Tri par date de création (plus récentes d'abord)
      { $sort: { createdAt: -1 } }
    ]);
    
    res.json(annonces);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
