import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormAnnonce() {
 const navigate = useNavigate(); 
  const [annonce, setAnnonce] = useState({
    titre: '', description: '', role: 'association',
    type: 'Besoin', categories: [], ville: '', dateDebut: '',
    dateFin: '', nbrBenevole: 0, aideReçu: false, statut: 'brouillon', niveauDurgence: 'Moyen',
      infoContact: '', image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnnonce(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleCategoryChange = (e) => {
    const categories = e.target.value.split(',').map(cat => cat.trim());
    setAnnonce(prev => ({
      ...prev,
      categories
    }));
  }

  const handleImageUpload = (e) => { const file = e.target.files[0];
    setAnnonce(prev => ({...prev, image: file
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(annonce).forEach(key => {
      if (key === 'image' && annonce[key]) 
        {
            formData.append('image', annonce[key]);
        } else if (key !== 'image') {
        
            formData.append(key, annonce[key]);
        }
    });

    try {
      const response = await axios.post('http://localhost:5000/annonces/add_annonces', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Annonce ajoutée avec succès !');
      navigate('/annonces');
      
      // vider les champes
      setAnnonce({titre: '', description: '',role: 'association',
        type: 'Besoin',categories: [],
        ville: '', dateDebut: '',dateFin: '', nbrBenevole: 0,
        aideReçu: false,statut: 'brouillon',niveauDurgence: 'Moyen',
        infoContact: '',image: null
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce", error);
      alert("Erreur lors de l'ajout de l'annonce");
    }
  }

  return (
<div  className='pt-28 '>
<div className="p-24 rounded-2xl mx-auto max-w-fit bg-blue-100">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <div>
          <label className="block mb-2">Titre de l'Annonce</label>
          <input type="text" name="titre" 
            value={annonce.titre}onChange={handleChange}
            required className="w-full p-2 border rounded"
            placeholder="Titre de votre annonce"
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea name="description"
            value={annonce.description}
            onChange={handleChange} required 
            className="w-full p-2 border rounded"
            rows="4" placeholder="Détails de votre annonce"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Type</label>
            <select  name="type"value={annonce.type}
              onChange={handleChange}className="w-full p-2 border rounded" >
              <option value="Service">Service</option>
              <option value="Besoin">Besoin</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Niveau d'Urgence</label>
            <select 
              name="niveauDurgence"
              value={annonce.niveauDurgence} onChange={handleChange}
              className="w-full p-2 border rounded">
              <option value="Moyen">Moyen</option>
              <option value="Fiable">Fiable</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">Catégories (séparées par des virgules)</label>
          <input 
            type="text" 
            name="categories"
            value={annonce.categories.join(', ')}//
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded"
            placeholder="Éducation, Environnement, Santé"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Ville</label>
            <input 
              type="text" name="ville"
              value={annonce.ville} onChange={handleChange}
              required className="w-full p-2 border rounded"
              placeholder="Ville de l'événement ou la mission"
            />
          </div>

          <div>
            <label className="block mb-2">Nombre de Bénévoles Recherchés</label>
            <input type="number" 
              name="nbrBenevole" value={annonce.nbrBenevole}
              onChange={handleChange}
              className="w-full p-2 border rounded" min="0" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Date de Début</label>
            <input 
              type="date" name="dateDebut"
              value={annonce.dateDebut}
              onChange={handleChange} 
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Date de Fin</label>
            <input 
              type="date" name="dateFin" value={annonce.dateFin}
              onChange={handleChange}className="w-full p-2 border rounded"/>
          </div>
        </div>

        <div>
          <label className="block mb-2">Informations de Contact</label>
          <input 
            type="text"  name="infoContact"  value={annonce.infoContact} onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Téléphone ou email de contact"  />
        </div>

        <div>
          <label className="block mb-2">Image</label>
          <input 
            type="file"  name="image"
            onChange={handleImageUpload} accept="image/*"
            className="w-full p-2 border rounded"
          />
        </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" >
            Publier l'Annonce
             </button>
        </form>
    </div>
</div>
  );
}

export default FormAnnonce;