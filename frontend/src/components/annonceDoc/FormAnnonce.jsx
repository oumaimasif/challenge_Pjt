import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import Confirmation from '../Confirmation';
import { Megaphone } from 'lucide-react';
import CategoriesDropDown from '../CategoriesDropDown';

// Form Components
import ImageUploads from '../formComponents/ImageUploads';

function FormAnnonce() {
  const navigate = useNavigate();
  
  const [formAnnonce, setFormAnnonce] = useState({
    titre: '',
    description: '',
    role: 'association',
    type: 'Besoin',
    ville: '',
    dateDebut: '',
    dateFin: '',
    nbrBenevole: 0,
    aideReçu: false,
    statut: 'brouillon',
    niveauDurgence: 'Moyen',
    infoContact: ''
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormAnnonce({ ...formAnnonce, [name]: checked });
    } else {
      setFormAnnonce({ ...formAnnonce, [name]: value });
    }
  };

  const onCloseNotify = () => {
    setNotification({ type: '', msg: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirme(false);

    if (selectedCategories.length === 0) {
      setNotification({
        type: 'error',
        msg: "Veuillez sélectionner au moins une catégorie"
      });
      return;
    }

    try {
      const formData = new FormData();

      for (const key in formAnnonce) {
        formData.append(key, formAnnonce[key]);
      }

      formData.append("categories", JSON.stringify(selectedCategories));

      if (image) {
        formData.append("image", image);
      }

      const response = await axios.post('http://localhost:5000/annonces/add_annonces', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log("Annonce ajoutée avec succès", response.data);
      setNotification({
        type: 'Ok',
        msg: "Votre annonce a été publiée avec succès!"
      });

      // Réinitialiser le formulaire
      setFormAnnonce({
        titre: '',
        description: '',
        role: 'association',
        type: 'Besoin',
        ville: '',
        dateDebut: '',
        dateFin: '',
        nbrBenevole: 0,
        aideReçu: false,
        statut: 'brouillon',
        niveauDurgence: 'Moyen',
        infoContact: ''
      });
      setSelectedCategories([]);
      setImage(null);

      // Réinitialiser l'input de type file
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Redirection vers la page des annonces après un délai
      setTimeout(() => {
        navigate('/annonces');
      }, 2000);

    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce", error);
      setNotification({
        type: 'error',
        msg: "Erreur lors de la publication de l'annonce. Veuillez réessayer."
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-20 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Publication d'Annonce</h2>
          <p className="text-gray-600 mt-2">Créez votre annonce pour partager vos besoins ou services</p>
        </div>
        
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />

        <Confirmation 
          isOpen={isConfirme} 
          onCancel={() => setIsConfirme(false)} 
          onConfirm={handleSubmit}
          msg="Veuillez vérifier que toutes vos informations sont correctes avant de publier votre annonce." 
        />

        <form 
          onSubmit={(e) => { e.preventDefault(); setIsConfirme(true); }}
          className="space-y-6" 
          encType="multipart/form-data"
        >
          {/* Titre */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Titre de l'annonce</label>
            <input
              type="text"
              name="titre"
              value={formAnnonce.titre}
              onChange={handleChange}
              placeholder="Titre décrivant votre annonce"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Type et Niveau d'urgence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type d'annonce</label>
              <select
                name="type"
                value={formAnnonce.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="Besoin">Besoin</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Niveau d'urgence</label>
              <select
                name="niveauDurgence"
                value={formAnnonce.niveauDurgence}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="Faible">Faible</option>
                <option value="Moyen">Moyen</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Catégories avec le composant de dropdown */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
            <CategoriesDropDown 
              selectedCtg={selectedCategories} 
              setSelectedCtg={setSelectedCategories} 
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description détaillée</label>
            <textarea
              name="description"
              value={formAnnonce.description}
              onChange={handleChange}
              placeholder="Décrivez votre annonce en détail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            ></textarea>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date de début</label>
              <input
                type="date"
                name="dateDebut"
                value={formAnnonce.dateDebut}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date de fin (optionnelle)</label>
              <input
                type="date"
                name="dateFin"
                value={formAnnonce.dateFin}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Ville et Nombre de bénévoles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Ville</label>
              <input
                type="text"
                name="ville"
                value={formAnnonce.ville}
                onChange={handleChange}
                placeholder="Ville de l'événement ou mission"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nombre de bénévoles recherchés</label>
              <input
                type="number"
                name="nbrBenevole"
                min="0"
                value={formAnnonce.nbrBenevole}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Information de contact */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Informations de contact</label>
            <input
              type="text"
              name="infoContact"
              value={formAnnonce.infoContact}
              onChange={handleChange}
              placeholder="Email, téléphone ou autre moyen de contact"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required
            />
          </div>

          {/* Statut de publication */}
          <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-md">
            <label className="block text-gray-700 font-medium mb-2 mr-4">Statut</label>
            <select
              name="statut"
              value={formAnnonce.statut}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publier immédiatement</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-center mb-4">Image illustrative (optionnelle)</h3>
            <ImageUploads onChange={setImage} />
          </div>
          
          {/* Bouton de soumission */}
          <div className="text-center">
            <button 
              type="submit" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Megaphone className='w-6 h-6 mr-2'/>
              Publier mon annonce
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAnnonce;