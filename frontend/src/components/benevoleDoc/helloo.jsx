

import React, { useState } from 'react'
import axios from 'axios';
import Notification from '../Notification';
import Confirmation from '../Confirmation';

function helloo() {
  const [formbenevole, setFormbenevole] = useState({
    civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", dateDeNaissance: "", profession: "", ville: "",
    categorie: "", competence: "", formationExperiences: "", description: "", commentaires: "",
    disponible: "Flexible", heure: "", role: "Benevole"
  });
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);

  // Mettre à jour les valeurs des inputs
  const handleChange = (e) => {
    setFormbenevole({ ...formbenevole, [e.target.name]: e.target.value })
  }

  // Gestion du fichier image
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  }

  //la verification des info avant soumission
  const handleVrifyInfo = (e) => {
    e.preventDefault();
    setIsConfirme(true);
  }
  //Fonction pour fermer la notification
  const onCloseNotify = () => {
    setNotification({ type: '', msg: '' });
  }

  // ! Fonction pour envoyer les données au backend (ajouter benevole à la liste)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirme(false);

    try {
      // Créer un objet FormData pour envoyer à la fois les données et l'image
      const formData = new FormData();

      // Ajouter toutes les données du formulaire
      for (const key in formbenevole) {
        formData.append(key, formbenevole[key]);
      }

      // Ajouter l'image si elle existe
      if (image) {
        formData.append("image", image);
      }

      // Envoi au serveur avec le bon endpoint
      const res = await axios.post("http://localhost:5000/benevoles/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Bénévole ajouté avec succès", res.data);
      setNotification({
        type: 'Ok',
        msg: "Votre inscription a été ajoutée avec succès!"
      })
      // alert("Bénévole ajouté avec succès !");

      // Reset form
      setFormbenevole({
        civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", dateDeNaissance: "", profession: "", ville: "", categorie: "",
        competence: "", formationExperiences: "", description: "", commentaires: "", disponible: "Flexible", heure: "", role: "Benevole"
      });
      setImage(null);

      // Réinitialiser le champ de fichier (pour l'interface utilisateur)
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setNotification({
        type: 'error',
        message: "Erreur lors de l'ajout du bénévole. Veuillez réessayer."
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-36">
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg drop-shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription Bénévole</h2>
        {/* afficher la notification  */}
         <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify}/>
        
        {/* la confirmation  */}
        <Confirmation isOpen={isConfirme} onCancel={()=>setIsConfirme(false)} onConfirm={handleSubmit} 
        msg="Veuillez vérifier que toutes vos informations sont correctes avant de finaliser votre inscription."/>
        <form onSubmit={handleVrifyInfo} className="space-y-4" encType="multipart/form-data"> {/*// !encType="multipart/form-data" =obligatoire pour que le fichier soit bien envoyé au backend. */}
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Photo de profil
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Rest of the form remains the same */}
          {/* Civilité */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Civilité</span>
            <label className="text-gray-800 flex items-center">
              <input
                type="radio" name="civilite" value="Homme"
                onChange={handleChange}
                checked={formbenevole.civilite === "Homme"}
                required
              />
              <span className="ml-2">Homme</span>
            </label>
            <label className="text-gray-900 flex items-center">
              <input
                type="radio"
                name="civilite"
                value="Femme"
                onChange={handleChange}
                checked={formbenevole.civilite === "Femme"}
                required
              />
              <span className="ml-2">Femme</span>
            </label>
          </div>

          {/* Nom & Prénom */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Prénom</label>
              <input
                type="text" name="prenom"
                value={formbenevole.prenom} onChange={handleChange}
                required className="w-full p-2 border rounded"
                placeholder="Votre prénom"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Nom de famille</label>
              <input
                type="text" name="nom"
                value={formbenevole.nom} onChange={handleChange}
                required className="w-full p-2 border rounded" placeholder="Votre nom"
              />
            </div>
          </div>

          {/* Contact & Naissance */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                type="email" name="email"
                value={formbenevole.email} onChange={handleChange}
                required className="w-full p-2 border rounded" placeholder="votre.email@exemple.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Numéro de téléphone</label>
              <input
                type="tel"
                name="numeTelephone"
                pattern="0[6-7][0-9]{8}" value={formbenevole.numeTelephone}
                onChange={handleChange} required className="w-full p-2 border rounded" placeholder="0600000000"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Date de naissance</label>
              <input
                type="date" name="dateDeNaissance"
                value={formbenevole.dateDeNaissance} onChange={handleChange}
                required className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Profession</label>
              <input
                type="text" name="profession"
                value={formbenevole.profession} onChange={handleChange}
                className="w-full p-2 border rounded" placeholder="Votre profession (optionnel)" />
            </div>
          </div>

          {/* Compétences & Disponibilité */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Compétence principale</label>
              <input
                type="text" name="competence" value={formbenevole.competence}
                onChange={handleChange} className="w-full p-2 border rounded"
                placeholder="Votre compétence principale"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Disponibilité</label>
              <select name="disponible" value={formbenevole.disponible} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Flexible">Flexible</option>
                <option value="Temps partiel">Temps partiel</option>
                <option value="Temps plein">Temps plein</option>
              </select>
            </div>
          </div>

          {/* Adresse et heure */}
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Adresse</label>
              <input type="text" name="ville"
                value={formbenevole.ville} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Votre adresse principale"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Disponibilité (heures)</label>
              <input
                type="text"
                name="heure" value={formbenevole.heure}
                onChange={handleChange} className="w-full p-2 border rounded" placeholder="Ex: 2-3 heures par jour"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Formations et Expériences</label>
            <textarea
              name="formationExperiences" value={formbenevole.formationExperiences}
              onChange={handleChange} className="w-full p-2 border rounded"
              placeholder="Décrivez vos formations et expériences pertinentes" rows="3" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description personnelle</label>
            <textarea name="description"
              value={formbenevole.description} onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Parlez-nous un peu de vous" rows="3" />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Commentaires</label>
            <textarea
              name="commentaires" value={formbenevole.commentaires} onChange={handleChange}
              className="w-full p-2 border rounded" placeholder="Avez-vous des commentaires ou des attentes particulières ?"
              rows="3" />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition duration-300">
            S'inscrire comme Bénévole
          </button>
        </form>
      </div>
    </div>
  )
}

export default helloo


