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
        res.status(201).json({message :"Benevole enregistré avec succès ",newBenevole});

    } catch (error) {
        res.status(400).json({message: "Erreur lors de l'ajout", error});
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


router.put('/update/:id', async (req, res) => {
    try {
      const updatedBenevole = await Benevole.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedBenevole) {
        return res.status(404).json({ success: false, message: "undefind" });
      }
      res.status(200).json({ success: true, message: "update avec succée", data: updatedBenevole });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Erreur lors de la mise a jour" });
    }
  });


//
  
module.exports = router;