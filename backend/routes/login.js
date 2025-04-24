const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //bibliothèque qui permet de générer et vérifier les JWT (JSON Web Token)

const Admin = require("../models/admin");
const Benevole = require("../models/benevoleModel");
const Particulier = require("../models/particulierModel");
const Association = require("../models/associationModel");

//checher un user dans les 3 modeles
async function findByEmail(email) {
  const admin = await Admin.findOne({ email });
  if (admin) return { user: admin, role: "admin" };

  const benevole = await Benevole.findOne({ email });
  if (benevole) return { user: benevole, role: "benevole" };

  const particulier = await Particulier.findOne({ email });
  if (particulier) return { user: particulier, role: "particulier" };

  const association = await Association.findOne({ email });
  if (association) return { user: association, role: "association" };

  return null;
}

router.post("/", async (req, res) => {
  const { email, password } = req.body; //extrait email & password
  console.log("Requête login reçue:", req.body);
  try {
    const result = await findByEmail(email); // renvoie{ user, role} || null
    console.log("Result: ", result);

    if (!result) return res.status(400).json({ msg: "Utilisateur non trouvé" });
    console.log("result: ", result);

    const { user, role } = result;
    console.log("User: ", user);

    //compare password envoyé & password hashé

    const IsMtach = await bcrypt.compare(password, user.password);
    console.log("IsMtach for password:",IsMtach , " ,password:",password, " ,user.password",user.password);
    if (!IsMtach)
      return res.status(400).json({ msg: "Mot de passe incorrect" });

    //Créer le token JWT
    //ici en genere un token qui contient _id/ et le role et il va etre expirer dans 50s

    const token = jwt.sign(
      {
        id: user._id,
        role,
        nom: user.nom,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "40s",
      }
    );

    //reponse json envoyer (token , objet user{} utile pour le frontend sache qui est connecté)
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        nom: user.nom || user.nomAssociation || "",
        prenom: user.prenom || "",
        role: role,
      },
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;
