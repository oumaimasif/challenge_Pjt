
const Activite = require("../models/activiteModel");
const enregistrerActiviter = async( type, titre , description , categorie, utilisateurId=null ,typeUser='system')=>{
    try {
        const newActivite= new Activite({
            type, titre , description , categorie, utilisateurId ,typeUser
        })

        await newActivite.save();
        console.log("Acitité saved", titre);
        return newActivite
    } catch (error) {
        console.log("Erreur lors de l'enregistrement de l'activité: ", error)
        return null;
    }
}


module.exports = {enregistrerActiviter};

