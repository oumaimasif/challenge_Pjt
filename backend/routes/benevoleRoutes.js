const express = require("express");
const router = express.Router();
const Benevole = require("../models/benevoleModel");
const upload = require("../multerconfig");
const bcrypt = require("bcryptjs");

//test
router.get("/me", async (req, res) => {
  await res.send("je suis ds la routes des benevoles");
  console.log("voila la route du test");
});

// afficher la lists les bénévoles
// router.get("/", async (req, res) => {
//   const dataBenevole = await Benevole.find();
//   res.json({ message: "Voila la list des benevoles ", dataBenevole });
// });

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //page actuelle (pr defaut:1)
    const limit = parseInt(req.query.limit) || 12; //nbr de benevoles par page
    const skip = (page - 1) * limit; //element à sauter

    const benevoles = await Benevole.aggregate([
      {
        $lookup: {
          from: "annonces",
          localField: "_id",
          foreignField: "benevoleID",
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

    const totalBen = await Benevole.countDocuments(); //pr calculer nbr de pages
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

// //ajouter Benevole
// router.post("/add_benevole", async (req, res) => {
//   try {
//     const newBenevole = new Benevole(req.body);
//     await newBenevole.save();
//     res
//       .status(201)
//       .json({ message: "Benevole enregistré avec succès ", newBenevole });
//   } catch (error) {
//     res.status(400).json({ message: "Erreur lors de l'ajout", error });
//   }
// });

//ajouter avec image (=> uploadsBenevole)
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

module.exports = router;
