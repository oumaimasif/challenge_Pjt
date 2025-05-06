const express = require("express");
const router = express.Router();
const Activite = require("../models/activiteModel")

router.get("/Myhistorique",verifierToken,async(req,res)=>{
    try {
        const activites = await Activite.find({utilisateurId : req.user.id,
            typeUser: req.user.role
        })
        .sort({date:-1})
        .limit(20)

        res.json(activites);
    } catch (error) {
        console.log("Erreur historique activités", error)
        res.status(500).json({msg:"Erreur lors de la recupération de l'historique"})

    }
})


module.exports = router;
