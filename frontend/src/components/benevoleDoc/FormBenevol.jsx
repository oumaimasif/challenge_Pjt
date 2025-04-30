import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Notification from '../Notification';
import Confirmation from '../Confirmation';
import CategoriesDropDown from '../CategoriesDropDown';
//formComponants
import BtnSubmit from '../formComponents/BtnSubmit';
import CiviliteRadio from '../formComponents/CiviliteRadio';
import FormInput from '../formComponents/FormInput';
import GroupChamps from '../formComponents/GroupChamps';
import ImageUploads from '../formComponents/ImageUploads';
import SelectInput from '../formComponents/SelectInput';
import TextArea from '../formComponents/TextArea';
import { Eye, EyeOff } from 'lucide-react';
import ListVille from '../formComponents/ListVille';




function FormBenevol() {
  // const categories = [
  //   { _id: "1", nom: "Éducation" },
  //   { _id: "2", nom: "Santé" },
  //   { _id: "3", nom: "Social" },
  //   { _id: "4", nom: "Environnement" },
  //   { _id: "5", nom: "Professionnel" },
  //   { _id: "6", nom: "Culture" },
  //   { _id: "7", nom: "Art" },
  //   { _id: "8", nom: "Humanitaire" },
  // ];

  const [formbenevole, setFormbenevole] = useState({
    civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", dateDeNaissance: "", profession: "", ville: "",
    competence: "", formationExperiences: "", description: "", password: "",
    disponible: "Flexible", heure: "", role: "Benevole"
  });

  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);
  const [selectedCtg, setSelectedCtg] = useState([]);

  // Mettre à jour les valeurs des inputs
  const handleChange = (e) => {
    setFormbenevole({ ...formbenevole, [e.target.name]: e.target.value })
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
      const formData = new FormData();//pr envoyer une image,

      // Ajouter toutes les données du formulaire
      for (const key in formbenevole) {
        formData.append(key, formbenevole[key]);
      }
      //on ajoute les categories selectionées comme une chaine JSon; en envoie un tab via fromData il faut donc convertir en string JSON pour que le backend puisse le lire correctement. */
      formData.append("categorie", JSON.stringify(selectedCtg))

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
        civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", password: "", dateDeNaissance: "", profession: "", ville: "",
        competence: "", formationExperiences: "", description: "", disponible: "Flexible", heure: "", role: "Benevole"
      });
      setSelectedCtg([]);
      setImage(null);

      // Réinitialiser le champ de fichier(img..)
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      //la fermeture automatique de notification
      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 4000);

    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      setNotification({
        type: 'error',
        msg: "Erreur lors de l'ajout du bénévole. Veuillez réessayer."
      });

      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 6000);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-36">
      {/* la confirmation  */}
      <Confirmation isOpen={isConfirme} onCancel={() => setIsConfirme(false)} onConfirm={handleSubmit}
        msg="Veuillez vérifier que toutes vos informations sont correctes avant de finaliser votre inscription." />

      <div className="w-full md:w-2/3 bg-white p-8 rounded-lg shadow-lg drop-shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Inscription Bénévole</h2>
        {/* afficher la notification  */}
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />


        <form onSubmit={(e) => { e.preventDefault(); setIsConfirme(true); }}  // la verification des info avant soumission
          className="space-y-4" encType="multipart/form-data"> {/*// !encType="multipart/form-data" =obligatoire pour que le fichier soit bien envoyé au backend. */}

          {/* image Upload */}
          <ImageUploads onChange={setImage} />

          {/*civilité */}
          <CiviliteRadio value={formbenevole.civilite} onChange={handleChange} required />

          {/* Input pour Nom et prenom + Grouper les 2 champs*/}
          <GroupChamps>
            <FormInput label="Prénom" name="prenom" value={formbenevole.prenom} onChange={handleChange} placeholder="Votre Prénom" required />
            <FormInput label="Nom de famille" name="nom" value={formbenevole.nom} onChange={handleChange} placeholder="Votre nom" required />
          </GroupChamps>

          {/* Contact & email */}

          <GroupChamps>
            <FormInput label="Email" name="email" type="email" value={formbenevole.email} onChange={handleChange} placeholder="votre.email@exemple.com" required />
            <FormInput label="Numéro de téléphone" name="numeTelephone" type="tel" value={formbenevole.numeTelephone} onChange={handleChange} placeholder="0600000000" required />
            {/* Password hash */}
            <div className='relative '>
              <FormInput
                label="Mot de passe"
                type={show ? "text" : "password"}
                name="password"
                value={formbenevole.password}
                onChange={handleChange}
                required
                placeholder="Entrez un mot de passe"
              />
              <button type="button" onClick={() => setShow(prev => !prev)}
                className="absolute  right-2 bottom-6  ">
                {show ? <Eye className='h-5 w-5 text-slate-800' /> : <EyeOff className='h-5 w-5 text-slate-800' />}
              </button>
            </div>
          </GroupChamps>

          {/* Date de naissance & profession  */}
          <GroupChamps>
            <FormInput label="Date de naissance" name="dateDeNaissance" type="date" value={formbenevole.dateDeNaissance} onChange={handleChange} required />
            <FormInput label="Profession" name="profession" value={formbenevole.profession} onChange={handleChange} placeholder="Votre profession " required />
          </GroupChamps>

          {/* listes des categories */}
          <CategoriesDropDown setSelectedCtg={setSelectedCtg} selectedCtg={selectedCtg} />

          {/* Disponibilité & heures */}
          <GroupChamps>
            <SelectInput
              label="Jours disponibles" name="disponible" value={formbenevole.disponible} onChange={handleChange}
              options={[{ value: "Flexible", label: "Flexible" }, { value: "Temps Partiel", label: "Temps partiel" }, { value: "Temps plein", label: "Temps plein" }]}/>
            <FormInput label="Préférence horaire" name="heure" value={formbenevole.heure} onChange={handleChange} placeholder="Ex: Soir, Après-midi,2h/jr" />
          </GroupChamps>

          {/* Partie compétences & Ville */}
          <GroupChamps>
            <FormInput label="Compétence principale" name="competence" value={formbenevole.competence} onChange={handleChange} placeholder="votre compétence principale" required />
            <ListVille onChange={handleChange}  required value={formbenevole.ville}/>
          </GroupChamps>

          {/* plus info sur formation et experiences  */}
          <TextArea label="Formations et Expériences" name="formationExperiences" value={formbenevole.formationExperiences} onChange={handleChange} placeholder="Décrivez vos formations et expériences pertinentes" />

          {/* Description personnelle */}
          <TextArea label="Description personnelle" name="description" value={formbenevole.description} onChange={handleChange} placeholder="Parlez-nous un peu de vous" />

          {/* Commentaire */}
          {/* <TextArea label="Commentaire" name="commentaires" value={formbenevole.commentaires} onChange={handleChange} placeholder="Avez-vous des commentaires ou des attentes particulières ?" /> */}

          {/* Btn */}
          <BtnSubmit text="S'inscrire comme Particulier" locationf="benevole" />
        </form>
      </div>
    </div>
  )
}

export default FormBenevol