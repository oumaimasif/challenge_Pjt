import React, { useState } from 'react';
import axios from 'axios';
import Notification from '../Notification';
import Confirmation from '../Confirmation';
import CategoriesDropDown from '../CategoriesDropDown';
// formComponents
import BtnSubmit from '../formComponents/BtnSubmit';
import FormInput from '../formComponents/FormInput';
import GroupChamps from '../formComponents/GroupChamps';
import ImageUploads from '../formComponents/ImageUploads';
import TextArea from '../formComponents/TextArea';
import { Building } from 'lucide-react';

function FormAssociation() {
  const [formAssociation, setFormAssociation] = useState({
    nomAssociation: "", nomPrenomResponsable: "", description: "", fonctiondsAssociation: "", email: "",
    role: "Association", accreditee: false, numeTelephone: "", dateCreation: "", VilleAssociation: "", mission: "" });

  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);
  const [selectedCtg, setSelectedCtg] = useState([]);

  // Mettre à jour les valeurs des inputs
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormAssociation({ ...formAssociation, [e.target.name]: value });
  }

  //Fonction pour fermer la notification
  const onCloseNotify = () => {
    setNotification({ type: '', msg: '' });
  }

  // Fonction pour envoyer les données au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirme(false);
    try {
      // Créer un objet FormData pour envoyer à la fois les données et l'image
      const formData = new FormData();

      // Ajouter toutes les données du formulaire sf accreditée
      for (const key in formAssociation) {
        if (key !=="accreditee") {
          formData.append(key, formAssociation[key]);
        }
      }

      //formdata il convertit les valeurs en string dc accreditée peut etre envoyée sous forme de false ou "true"(prb tjr il envoie ds db false )
      formData.append("accreditee", formAssociation.accreditee ? "true" : "false");      //en backend req.body.accreditee convertie en boolean

      console.log("Valeur accreditée envoyée:", formData.get("accreditee"));


      formData.append("categorie", JSON.stringify(selectedCtg));

      //gestion de l image
      if (image) {
        formData.append("image", image);
      }

      const res = await axios.post("http://localhost:5000/associations/add_association", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Valeur accreditée avant envoi:", formAssociation.accreditee);
      console.log("Association ajoutée avec succès", res.data);
      setNotification({
        type: 'Ok',
        msg: "Votre association a été ajoutée avec succès!"
      });

      // Vider les champs
      setFormAssociation({
        nomAssociation: "", nomPrenomResponsable: "", description: "",
        fonctiondsAssociation: "", email: "", role: "Association", accreditee: false, numeTelephone: "", dateCreation: "",
        VilleAssociation: "",mission: "" });

      setSelectedCtg([]);
      setImage(null);

      // Réinitialiser le champ de fichier
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      console.error("Détails de l'erreur:", error.response?.data);
      setNotification({
        type: 'error',
        msg: `Erreur: ${error.response?.data?.message || error.message}`
      });
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-36">
      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg drop-shadow-xl">
<div className='flex  justify-center gap-2 text-teal-600'>
  <Building className='w-7 h-7  '/>
  <h2 className="text-2xl font-bold mb-6 text-center">Inscription Association</h2>
</div>
        {/* Notification */}
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />

        {/* Confirmation */}
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
          <ImageUploads
            onChange={(file) => setImage(file)}
          />

          {/* Nom de l'association */}
          <FormInput
            label="Nom de l'association"
            name="nomAssociation"
            value={formAssociation.nomAssociation}
            onChange={handleChange}
            placeholder="Nom de votre association"
            required={true}
          />

          {/* Responsable & Contact */}
          <GroupChamps>
            <FormInput
              label="Nom et prénom du responsable"
              name="nomPrenomResponsable"
              value={formAssociation.nomPrenomResponsable}
              onChange={handleChange}
              placeholder="Nom et prénom du responsable"
              required={true}
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              value={formAssociation.email}
              onChange={handleChange}
              placeholder="email@association.com"
              required={true}
            />
          </GroupChamps>

          <GroupChamps>
            <FormInput
              label="Numéro de téléphone"
              name="numeTelephone"
              type="tel"
              value={formAssociation.numeTelephone}
              onChange={handleChange}
              placeholder="0600000000"
              required={true}
            />
            <FormInput
              label="Ville"
              name="VilleAssociation"
              value={formAssociation.VilleAssociation}
              onChange={handleChange}
              placeholder="Ville de l'association"
              required={true}
            />
          </GroupChamps>

          {/* Date de création & Fonction */}
          <GroupChamps>
            <FormInput
              label="Date de création"
              name="dateCreation"
              type="date"
              value={formAssociation.dateCreation}
              onChange={handleChange}
              required={true}
            />
            <FormInput
              label="Fonction de l'association"
              name="fonctiondsAssociation"
              value={formAssociation.fonctiondsAssociation}
              onChange={handleChange}
              placeholder="Fonction principale de l'association"
              required={true}
            />
          </GroupChamps>

          {/* Catégories */}
          <CategoriesDropDown setSelectedCtg={setSelectedCtg} selectedCtg={selectedCtg} />

          {/* Accréditation */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="accreditee"
              checked={formAssociation.accreditee}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-gray-700 text-sm font-bold">
              Association accréditée
            </label>
          </div>

          {/* Description & Mission */}
          <TextArea
            label="Description de l'association"
            name="description"
            value={formAssociation.description} onChange={handleChange} placeholder="Décrivez votre association"
          />

          <TextArea
            label="Mission principale" name="mission" value={formAssociation.mission}
            onChange={handleChange} placeholder="Objectif ou mission principale de l'association" required={true} />

          {/* Submit button */}
          <BtnSubmit text="Inscrire l'Association" locationf="association"/>
        </form>
      </div>
    </div>
  )
}

export default FormAssociation