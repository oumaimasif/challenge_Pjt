import React, { useState } from 'react'
import axios from 'axios';
import Notification from '../Notification';
import Confirmation from '../Confirmation';


// Form Components
import BtnSubmit from '../formComponents/BtnSubmit';
import CiviliteRadio from '../formComponents/CiviliteRadio';
import FormInput from '../formComponents/FormInput';
import GroupChamps from '../formComponents/GroupChamps';
import ImageUploads from '../formComponents/ImageUploads';
import { Eye, EyeOff } from 'lucide-react';

function FormParticulier() {
  const [formParticulier, setFormParticulier] = useState({
    civilite: "",
    nom: "",
    prenom: "",
    email: "",
    numeTelephone: "",
    dateDeNaissance: "",
    profession: "",
    ville: "",
    password: "",
    role: "Particulier"
  });
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);

  // Mettre à jour les valeurs des inputs
  const handleChange = (e) => {
    setFormParticulier({ ...formParticulier, [e.target.name]: e.target.value })
  }

  // Fonction pour fermer la notification
  const onCloseNotify = () => {
    setNotification({ type: '', msg: '' });
  }

  // Fonction pour envoyer les données au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirme(false);

    // Créer un objet FormData pour envoyer à la fois les données et l'image
    const formData = new FormData();

    // Ajouter toutes les données du formulaire
    for (const key in formParticulier) {
      formData.append(key, formParticulier[key]);
    }

    // Ajouter l'image si elle existe
    if (image) {
      formData.append("image", image);
    }
    try {
      // Envoi au serveur avec le bon endpoint
      const res = await axios.post("http://localhost:5000/particuliers/add_particulier", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Particulier ajouté avec succès", res.data);
      setNotification({
        type: 'Ok',
        msg: "Votre inscription a été ajoutée avec succès!"
      });

      // Reset form
      setFormParticulier({
        civilite: "",
        nom: "",
        prenom: "",
        email: "",
        numeTelephone: "",
        dateDeNaissance: "",
        profession: "",
        ville: "",
        password: "",
        role: "Particulier"
      });
      setImage(null);

      // Réinitialiser le champ de fichier
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setNotification({
        type: 'error',
        msg: "Erreur lors de l'ajout du particulier. Veuillez réessayer."
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-36">
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg drop-shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription Particulier</h2>

        {/* Afficher la notification */}
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />

        {/* La confirmation */}
        <Confirmation
          isOpen={isConfirme}
          onCancel={() => setIsConfirme(false)}
          onConfirm={handleSubmit}
          msg="Veuillez vérifier que toutes vos informations sont correctes avant de finaliser votre inscription."
        />

        <form
          onSubmit={(e) => { e.preventDefault(); setIsConfirme(true); }}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* Image Upload */}
          <ImageUploads onChange={setImage} />

          {/* Civilité */}
          <CiviliteRadio value={formParticulier.civilite} onChange={handleChange} required />

          {/* Nom et prénom */}
          <GroupChamps>
            <FormInput
              label="Prénom"
              name="prenom"
              value={formParticulier.prenom}
              onChange={handleChange}
              placeholder="Votre Prénom"
              required
            />
            <FormInput
              label="Nom de famille"
              name="nom"
              value={formParticulier.nom}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </GroupChamps>

          {/* Email et téléphone */}
          <GroupChamps>
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formParticulier.email}
              onChange={handleChange}
              placeholder="votre.email@exemple.com"
              required
            />
            <FormInput
              label="Numéro de téléphone"
              name="numeTelephone"
              type="tel"
              value={formParticulier.numeTelephone}
              onChange={handleChange}
              placeholder="0600000000 & 0700000000"
              required
            />

          </GroupChamps>

          {/* Date de naissance et profession */}
          <GroupChamps>
            <FormInput
              label="Date de naissance"
              name="dateDeNaissance"
              type="date"
              value={formParticulier.dateDeNaissance}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Profession"
              name="profession"
              value={formParticulier.profession}
              onChange={handleChange}
              placeholder="Votre profession"
              required
            />
          </GroupChamps>
          <GroupChamps>
            {/* Ville */}
            <FormInput
              label="Ville"
              name="ville"
              value={formParticulier.ville}
              onChange={handleChange}
              placeholder="Votre ville"
              required
            />

            <div className='relative '>
              <FormInput
                label="Mot de passe"
                type={show ? "text":"password"}
                name="password"
                value={formParticulier.password}
                onChange={handleChange}
                required
                placeholder="Entrez un mot de passe"
              />
              <button type="button" onClick={() => setShow(prev => !prev)}
                className="absolute  right-2 bottom-6 ">
                {show ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </GroupChamps>
          {/* Bouton de soumission */}
          <BtnSubmit text="S'inscrire comme Particulier" locationf="particulier" />
        </form>
      </div>
    </div>
  )
}

export default FormParticulier