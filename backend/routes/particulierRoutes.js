const express = require("express");
const router = express.Router();
const Particulier = require("../models/particulierModel");
const DemandeAide = require("../models/demandeAideModel");

const upload = require("../multerconfig");
const bcrypt = require("bcryptjs");
const { default: mongoose } = require("mongoose");

//test
router.get("/me", (req, res) => {
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
    // console.log("Fichier reçu:", req.header);
    console.log("Fichier reçu:", req.file);

    const pathImage = req.file
      ? req.file.path
      : "uploads/uploadsParticulier/avatar_particulier.jpg";
    const password = req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hashePassword = await bcrypt.hash(password, salt);

    console.log(
      "Mot de passe haché :",
      salt +
        " password Particulier: " +
        password +
        " hashePassword: " +
        hashePassword
    );
    const newParticulier = new Particulier({
      ...req.body,
      image: pathImage,
      password: hashePassword,
    });
    await newParticulier.save();

    res.status(201).json({ message: "Particulier bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: "ERReur " + error.message });
  }
});

//get all
router.get("/all", async (req, res) => {
  try {
    const dataAll = await Particulier.find()
    .select('-password').sort({createdAt:-1}) //n->a
    res.status(200).json(dataAll);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    // pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const data = await Particulier.aggregate([
      {
        //lookup pr joindre les annonces liées a chaque association
        $lookup: {
          from: "demandeaides",
          localField: "_id",
          foreignField: "particulier",
          as: "demandes",
        },
      },
      {
        $addFields: { demandesCpt: { $size: "$demandes" } },
      },
      { $project: { demandes: 0 } },
      //tri par date de cration
      { $sort: { createdAt: -1 } },
      //pagination
      { $skip: skip },
      { $limit: limit },
    ]);

    const totaleParticulier = await Particulier.countDocuments();
    console.log("totaleParticulier :",totaleParticulier ," data :",data)
    res.send({
      data: data,
      totalPages: Math.ceil(totaleParticulier / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//supprimer Particulier by id
router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params.id);

    const datatoDelete = await Particulier.findByIdAndDelete(req.params.id);
    if (!datatoDelete) {
      return res.status(404).json({ error: "Particulier non touvée" });
    }
    res.json({ message: "Particulier supprimé avec succès ", datatoDelete });
  } catch (error) {
    res.status(400).json({ error: "Erreur Serveur: " + error.message });
  }
});

// // Récupérer les demandes d'aide d'un particulier spécifique
router.get("/:id", async (req, res) => {
  try {
    const particulier = await Particulier.aggregate([

      {$match:{_id:new mongoose.Types.ObjectId(req.params.id)}},
      {$lookup:{
        from:"demandeaides",
        localField:"_id",
        foreignField:"particulier",
        as:"demandes"
      }},{
        $addFields:{
          demandesCpt :{$size :"$demandes"}
        }
      },{
        $project:{ demandes:0}
      }
    ]);
    if (particulier.length===0) {
      return res.status(404).json({error:"Particulier non trouvé"})
    }
    res.status(200).json(particulier[0])
  } catch (error) {
    res.status(500).json({error : error.message})
  }

  // try {
  //   const particulier = await Particulier.findById(req.params.id);
  //   if (!particulier) {
  //     return res.status(404).json({error:"Particulier non trouvé"})
  //   }
  //   res.status(200).json(particulier)
  // } catch (error) {
  //   res.status(500).json({error : error.message})
  // }
});


module.exports = router;
