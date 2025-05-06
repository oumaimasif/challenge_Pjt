const mongoose = require ("mongoose");

const demandeSchema = new mongoose.Schema({
    particulier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Particulier',
        requierd: true
      },
      titre: { type: String, required: true },
      categorie: [{ type: String, required: true ,default:[]}], 
      description:{type:String,required:true},
      dateBesoin:{type:Date} ,
      dateFin:{type:Date, required:false},
      statute:{type :String,enum:["En attente", "Accepté", "Refusé"],
        default:"En attente"
      },
      terminer:{type :String,enum:["En cours", "Terminé"],
        default:"En cours"},
      lieu:{type:String, requierd: false},
      priorite: { type: String,
        enum: [ "Faible", "Normale","Urgent"], default: "Normale" }, // Priorité de la demande
      image: { type: String, default: "uploads/uploadsDemandes/default_demande.jpg" },
      etreContacter :{type: Boolean,default:true},// Si le particulier souhaite être contacté
      nombrebeneficiaires:{type:Number, default:1}
}, {timestamps:true})

const DemandeAide = mongoose.model("DemandeAide",demandeSchema);
module.exports=DemandeAide;