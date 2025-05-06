const express = require("express");
const router = express.Router();
const Benevole = require('../models/benevoleModel')
const Association =require('../models/associationModel');
const Particulier =require('../models/particulierModel')
const DemandeAide =require('../models/demandeAideModel');
const Annonce = require("../models/annonceModel");
const Admin = require("../models/admin");
const {verifierToken, checkRole}= require("../auth")
const { enregistrerActiviter } = require("./activiteUtils");
const Activite = require("../models/activiteModel")


router.get('/adminDashboard',verifierToken,checkRole(["admin"]),async(req,res)=>{
    // console.log("page Admin")
    const admin = await Admin.find()
    // console.log("adminnnn: ",admin[0].nom)+
    res.send(`Bienvenu sur le dashboard de l'admin : ${admin[0].nom}`)
})
router.get('/admin/benevoles',verifierToken,checkRole(["admin"]),async(req,res)=>{
    // console.log("page Admin")
    const admin = await Admin.find()
    // console.log("adminnnn: ",admin[0].nom)+
    res.send(`Bienvenu sur le dashboard de l'admin : ${admin[0].nom}`)
})

//



// Route get : pour afficher les statistique 
router.get("/dashboard-statistiques",async (req,res)=>{
    try {
        const  nbrBv = await Benevole.countDocuments();
        const  nbrAss = await Association.countDocuments();
        const  nbrAn = await Annonce.countDocuments();
        const  nbrDa = await DemandeAide.countDocuments();
        const  nbrPr = await Particulier.countDocuments();
        // const dateParMois =new Date();
        // dateParMois.setDate(1);
        // dateParMois.setHours(0,0,0,0);
  
        // const newBenevoles = await Benevole.countDocuments({
        //     createdAt:{$gte:{date}}
        // })
        res.json({benevoles:nbrBv, associations:nbrAss, annonces: nbrAn, demandes: nbrDa, particuliers: nbrPr})
    

    } catch (error) {
        console.log("Erreur statistique: ", error)
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques" });

    }
})

//route pour les avtiviter faite (platforme)
router.get("/admin/historiques",verifierToken,checkRole(["admin"]),async(req,res)=>{
    try {
        const activites = await Activite.find()
        .sort({date:-1})
        .limit(50)

        res.json(activites);
    } catch (error) {
        console.log("Erreur historique activités", error)
        res.status(500).json({msg:"Erreur lors de la recupération de l'historique"})

    }
})

module.exports = router;


