// const mongoose = require('mongoose');
// const commentSchema = new mongoose.Schema({
//   annonceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Annonce', required: true },
//   authorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required: true },
//   content:   { type: String, required: true },
//   createdAt: { type: Date,   default: Date.now }
// });
// module.exports = mongoose.model('Comment', commentSchema);

const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  Type:   { type: String, enum: ['annonce','demande'], required: true },
  typeId:     { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'Type' },
  authorId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorType: { type: String, enum: ['benevole', 'association', 'particulier', 'admin'], required: true }, // redirection par type (ccomment.jsx)
  content:      { type: String, required: true },
  showMe:  { type: Boolean, default: true },
  createdAt:    { type: Date, default: Date.now }
});
module.exports = mongoose.model('Comment', commentSchema);