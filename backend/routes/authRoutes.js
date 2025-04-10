const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const Association = require("../mpdels/associationModel");
const Benevole = require("../models/benevoleModel");
// const Particulier = require("../models/particulierModel");
// const bcrypt = require("bcrypt") il faut que je l installe

router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    switch (role) {
      case "Admin":
        user = await Admin.findOne({ email });
        break;
      case "Benevole":
        user = await Benevole.findOne({ email });
        break;
      case "Particulier":
        user = await Particulier.findOne({ email });
        break;
      case "Association":
        user = await Association.findOne({ email });
        break;
      default:
        return res.status(400).json({ message: "Role Invalide" });
    }
    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {}
});
