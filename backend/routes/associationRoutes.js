const express = require("express");
const router = express.Router();
const Association = require("../models/associationModel");


//test 
router.get("/me", async(req, res) => {
    await res.send("Liste des associations");
    console.log('liste des associaton ici console')
});

//afficher tt les association
router.get("/", async (req, res) => {
  const data = await Association.find();
  res.json(data);
});

//ajouter une association
router.post("/add_association", async (req, res) => {
  try {
    const newAssociation = new Association(req.body);
    await newAssociation.save();
    res.status(200).json({ message: "Bien ajoutée" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//supprimer une association
router.delete("/:id",async(req,res)=>
{ try {
    const IDToDelete = req.params.id;
      // Supprimer l'utilisateur dans la base de données (MongoDB)
    const association = await Association.findByIdAndDelete(IDToDelete)
   if(!association)
   {
    return res.status(404).json({error:"Association non touvée"})
   }
    res.json({message:"Association  supprimé avec succès "})
   
} catch (error) {
  res.status(400).json({ message : "Erreur lors de la suppression de l'association", error:error.message });
}
})




//afficher un message si cette route n'existe pas 
router.use((req,res)=>
{
  res.send("Cette route est inexistente");
})

module.exports = router;
