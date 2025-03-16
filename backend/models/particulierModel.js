const mongoose = require ("mongoose");

const particulierSchema = new mongoose.Schema({
    civilité: {
        type: String,
        enum: ["Femme", "Homme"], // pour lister des valeurs possibles || autorisée il faut ajouter enum []
        required: true,
      },
      nom: { type: String, required: true },
      prenom: { type: String, required: true },
      profession: { type: String, required: true },//etudient , parent ....
      email: { type: String, required: true },
      // passeword: { type: String, required: true },
      numeTelephone: { type: String, required: true },
      dateDeNaissance: { type: Date, required: true }, //YYYY-MM-DD
      ville: { type: String, required: true },
      besoins:{ type:String ,required:true,} ,
      description:{type:String,required:true},
      dateBesoin:{type:Date,required:true} ,
      statutDemende:{type :String,enum:["En attente", "Accepté","Refusé"],
        default:"En attente"
      },
      etreContacter :{type: Boolean,default:false},
},{timestamps:true});

const Particulier= mongoose.model("Particulier",particulierSchema);
module.exports=Particulier;