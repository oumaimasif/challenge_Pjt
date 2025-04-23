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
import { Building, Eye, EyeOff } from 'lucide-react';



function FormAssociation() {
  const [formAssociation, setFormAssociation] = useState({
    nomAssociation: "", nomPrenomResponsable: "", description: "", fonctiondsAssociation: "", email: "", password: "",
    role: "Association", accreditee: false, numeTelephone: "", dateCreation: "", VilleAssociation: "", mission: ""
  });

  const [show, setShow] = useState(null);
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
        if (key !== "accreditee") {
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
        nomAssociation: "", nomPrenomResponsable: "", description: "", password: "",
        fonctiondsAssociation: "", email: "", role: "Association", accreditee: false, numeTelephone: "", dateCreation: "",
        VilleAssociation: "", mission: ""
      });

      setSelectedCtg([]);
      setImage(null);

      // Réinitialiser le champ de fichier
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 5000);

    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      console.error("Détails de l'erreur:", error.response?.data);
      setNotification({
        type: 'error',
        msg: `Erreur: ${error.response?.data?.message || error.message}`
      });
      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 6000);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-36">
      <Confirmation isOpen={isConfirme} onCancel={() => setIsConfirme(false)} onConfirm={handleSubmit}
        msg="Veuillez vérifier que toutes vos informations sont correctes avant de finaliser votre inscription." />

      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg drop-shadow-xl">
        <div className='flex  justify-center gap-2 text-teal-600'>
          <Building className='w-7 h-7  ' />
          <h2 className="text-2xl font-bold mb-6 text-center">Inscription Association</h2>
        </div>
        {/* Notification */}
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />


        <form
          onSubmit={(e) => { e.preventDefault(); setIsConfirme(true); }}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* image Upload */}
          <ImageUploads onChange={setImage} />

          <GroupChamps >
            {/* Nom de l'association */}
            <FormInput label="Nom de l'association" name="nomAssociation" value={formAssociation.nomAssociation} onChange={handleChange} placeholder="Nom de votre association" required={true} />
            {/* Accréditation */}
            <div className="flex items-center space-x-3 pt-4 ">
              <input type="checkbox" name="accreditee" checked={formAssociation.accreditee} onChange={handleChange} className="w-3 h-3" />
              <label className="text-gray-700 text-xl font-semibold ">
                Association accréditée
              </label>
            </div>
          </GroupChamps>
          {/* Responsable & Contact */}
          <GroupChamps>
            <FormInput label="Nom et prénom du responsable" name="nomPrenomResponsable" value={formAssociation.nomPrenomResponsable} onChange={handleChange} placeholder="Nom et prénom du responsable" required={true} />
            <FormInput label="Email" name="email" type="email" value={formAssociation.email} onChange={handleChange} placeholder="email@association.com" required={true} />
          </GroupChamps>

          <GroupChamps>
            <FormInput label="Numéro de téléphone" name="numeTelephone" type="tel" value={formAssociation.numeTelephone} onChange={handleChange} placeholder="0600000000" required={true} />
            <FormInput label="Où se trouve votre association ? " name="VilleAssociation"
              value={formAssociation.VilleAssociation} onChange={handleChange} placeholder="Ville, adresse exacte" required={true} />
          </GroupChamps>

          {/* Date de création & Fonction */}
          <GroupChamps>
            <FormInput label="Date de création" name="dateCreation" type="date" value={formAssociation.dateCreation} onChange={handleChange} required={true} />
            <FormInput label="Fonction de l'association" name="fonctiondsAssociation"  value={formAssociation.fonctiondsAssociation} placeholder="Fonction principale de l'association" onChange={handleChange} required={true} />
          </GroupChamps>

          {/* Catégories */}
          <CategoriesDropDown setSelectedCtg={setSelectedCtg} selectedCtg={selectedCtg} required />

          <GroupChamps>
            {/* Password hash */}
            <div className='relative '>
              <FormInput
                label="Mot de passe"
                type={show ? "text" : "password"}
                name="password"
                value={formAssociation.password}
                onChange={handleChange}
                required
                placeholder="Entrez un mot de passe"
              />
              <div className='absolute inset-y-14 right-0 flex items-center pr-3 mb-2'>
                <button type="button" onClick={() => setShow(prev => !prev)} >
                  {show ? <Eye className='h-5 w-5 text-slate-800' /> : <EyeOff className='h-5 w-5 text-slate-800' />}
                </button>
              </div>
            </div>
          </GroupChamps>

          {/* Description & Mission */}
          <TextArea
            label="Description de l'association"
            name="description"
            value={formAssociation.description} onChange={handleChange} placeholder="Décrivez votre association"
          required/>

          <TextArea
            label="Mission principale" name="mission" value={formAssociation.mission}
            onChange={handleChange} placeholder="Objectif ou mission principale de l'association" required={true} />

          {/* Submit button */}
          <BtnSubmit text="Inscrire l'Association" locationf="association" />
        </form>
      </div>
    </div>
  )
}

export default FormAssociation