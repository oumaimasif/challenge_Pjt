const mongoose = require ("mongoose");

const particulierSchema = new mongoose.Schema({
  civilite: {
        type: String,
        enum: ["Femme", "Homme"], // pour lister des valeurs possibles || autorisée il faut ajouter enum []
        required: true,
      },
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      profession: { type: String, required: true }, //etudient , parent ....
      email: { type: String, required: true },
      password: { type: String, required: true },
      numeTelephone: { type: String, required: true },
      dateDeNaissance: { type: Date, required: true }, //YYYY-MM-DD
      ville: { type: String, required: true },
      image: { type: String }, 
      role:{type:String, default:"Particulier",enum:["Particulier"]}
})

const Particulier = mongoose.model("Particulier",particulierSchema);
module.exports=Particulier;