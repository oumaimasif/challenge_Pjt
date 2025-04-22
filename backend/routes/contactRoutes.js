const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

router.post("/", async (req, res) => {
  const { user_name, user_email, subject, message } = req.body;
  try {
    //sauvegarder ds la bd
    const newContact = new Contact({
      nom: user_name,
      email: user_email,
      subject: subject,
      message: message,
    });
    await newContact.save();
    res
      .status(200)
      .json({ success: true, msg: "Message enregistré avec succès" });
  } catch (error) {
    console.log("Erreur :",error)
    res.status(500).json({success: false, msg: "Erreur serveur (Contact us)" })
  }
});
module.exports = router;
