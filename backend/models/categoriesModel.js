const mongoose = require("mongoose");


/*
associations: [
  { type: mongoose.Schema.Types.ObjectId, ref: 'Association' }
]
 */
const categorieSchema = new mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  description: { type: String,required: true },
  icone: { type: String },
});
const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;
