const express =require("express");
const router = express.Router();
const Benevole = require("../models/benevoleModel");

//test 
router.get("/me", async(req, res) => {
    await res.send("je suis ds la routes des benevoles");
    console.log('voila la route du test')
});

// afficher
router.get("/",async(req,res)=>
{
    const dataBenevole = await Benevole.find();
    res.json({message: "Voila la list des benevoles ", dataBenevole});
})

//ajouter Benevole
router.post("/add_benevole",async(req,res)=>
{
    try {
        const newBenevole= new Benevole(req.body);
        await newBenevole.save();
        res.status(200).json({message :"Benevole enregistré avec succès "});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})

router.delete("/:id",async(req,res)=>
{
    try {
        const benevole = await Benevole.findByIdAndDelete(req.params.id)
        //id exist ou pas 
        if(!benevole)
            {
             return res.status(404).json({error:"Ce Benevole non touvée"});
            }
        res.json({message:"Benevole supprimé avec succès "})

    } catch (error) {
        res.status(400).json({error: error.message});
    }
})
module.exports = router;