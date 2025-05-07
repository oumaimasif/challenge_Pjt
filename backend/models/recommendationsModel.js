const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {

    roleType: {type: String, required: true, enum: ["benevole", "association"],//a qui en va faire recommendation
    },
    sendToId: {
        type: mongoose.Schema.Types.ObjectId,required: true,refPath: "roleType",//son Id
      },
    authorId: { type: mongoose.Schema.Types.ObjectId,// qui va ecrire cette recommendation
      required: true, refPath: "authorType",
    },
    authorType: {
      type: String,required: true,
      enum: ["benevole", "association", "particulier"],//son role (auth)
    },
    authorName: { type: String,required: true, },
    authorImage: { type: String,},
    content: { type: String,required: true, maxlength: 500,},
    score: { type: Number,required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
