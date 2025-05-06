import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Notification from '../Notification';
import Confirmation from '../Confirmation';
import CategoriesDropDown from '../CategoriesDropDown';

// Form Components
import ImageUploads from '../formComponents/ImageUploads';
import { HeartHandshake } from 'lucide-react';
import { Auth } from '../../context/Auth';

function FormDemandeAide() {
  const [formDemande, setFormDemande] = useState({
    particulier: "", titre: "",description: "",
    dateBesoin: "", dateFin: "",lieu: "", priorite: "Normale",etreContacter: true,nombrebeneficiaires: 1
  });
  const {user}= useContext(Auth)
  const [selectedCtg, setSelectedCtg] = useState([]);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);
  const [particuliers, setParticuliers] = useState([]);

  // useEffect(() => {
  //   const fetchParticuliers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/particuliers/all');
  //       console.log('tt particulier :',response.data)
  //       setParticuliers(response.data);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des particuliers", error);
  //       setNotification({
  //         type: 'error',
  //         msg: "Impossible de charger la liste des particuliers"
  //       });
  //     }
  //   };

  //   fetchParticuliers();
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormDemande({ ...formDemande, [name]: checked });
    } else {
      setFormDemande({ ...formDemande, [name]: value });
    }
  };

  const onCloseNotify = () => {
    setNotification({ type: '', msg: '' });
  };

    useEffect(()=>{
      if (!user) {
        setNotification({
          type: 'error',
          msg: "Vous devez etre connecté pour créer une demande d'aide (particulier) "
        })
  
  
        window.scrollTo({ top: 1, behavior: 'smooth' })//remonter en haut de la page
        setTimeout(() => {
          // setNotification({ type: '', msg: '' });
          navigate('/login')
  
        },8000 );
      }
    },[user,navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsConfirme(false);

    if (selectedCtg.length === 0) {
      setNotification({
        type: 'error',
        msg: "Veuillez sélectionner au moins une catégorie"
      });
      return;
    }

    try {
      const formData = new FormData();

      for (const key in formDemande) {
        formData.append(key, formDemande[key]);
      }
      formData.append("categorie", JSON.stringify(selectedCtg));

      if (image) {
        formData.append("image", image);
      }

      const token = localStorage.getItem('token');

      const res = await axios.post("http://localhost:5000/demandeAide/add", formData, {
        headers: {
          'Content-Type': 'multipart/form-data','Authorization':`Bearer ${token}`
        }
      });

      console.log("Demande d'aide ajoutée avec succès", res.data);
      setNotification({
        type: 'Ok',
        msg: "Votre demande d'aide a été soumise avec succès!"
      });

      setFormDemande({
        particulier: "", titre: "", description: "",
        dateBesoin: "",dateFin: "",lieu: "",priorite: "Normale",etreContacter: true,nombrebeneficiaires: 1
      });
      setSelectedCtg([]);
      setImage(null);

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 4000);

    } catch (error) {
      console.error("Erreur lors de l'ajout de la demande", error);

      const errormsg = error.response?.data?.error || error.response?.data?.msg || error.response?.data?.message ||
      "Erreur lors de l'envoi de la demande d'aide. Veuillez réessayer.";
      setNotification({
        type: 'error',
        msg: errormsg
      });

      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 6000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border-t-4 border-blue-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">Demande d'Aide</h2>
          <p className="text-gray-600 mt-2">Complétez ce formulaire pour recevoir l'aide dont vous avez besoin</p>
        </div>
        
        <Notification type={notification.type} msg={notification.msg} onClose={onCloseNotify} />

        <Confirmation isOpen={isConfirme} onCancel={() => setIsConfirme(false)} onConfirm={handleSubmit}
          msg="Veuillez vérifier que toutes vos informations sont correctes avant de soumettre votre demande d'aide." />

        <form onSubmit={(e) => { e.preventDefault(); setIsConfirme(true); }}
          className="space-y-6" encType="multipart/form-data" >
          {/* Particulier
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
            <label className="block text-gray-700 font-medium mb-2">Sélectionnez votre profil</label>
            <select name="particulier" value={formDemande.particulier}
              onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required >
              <option value="">-- Sélectionnez votre profil --</option>
              {particuliers.map(p => (
                <option key={p._id} value={p._id}>
                  {p.prenom} {p.nom} ({p.email})
                </option>
              ))}
            </select>
          </div> */}

          {/* Titre */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Titre de la demande</label>
            <input type="text"
              name="titre" value={formDemande.titre}
              onChange={handleChange} placeholder="Titre décrivant votre besoin"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required />
          </div>

          {/* Catégories */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <CategoriesDropDown setSelectedCtg={setSelectedCtg} selectedCtg={selectedCtg} />

          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Description détaillée</label>
            <textarea
              name="description" value={formDemande.description} onChange={handleChange}
              placeholder="Décrivez votre besoin en détail..."
              className="w-full px-4 py-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required ></textarea>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date de besoin</label>
              <input
                type="date" name="dateBesoin"
                value={formDemande.dateBesoin} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Date limite (optionnelle)</label>
              <input type="date"
                name="dateFin" value={formDemande.dateFin} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Lieu et Priorité */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
            <label className="block text-gray-700 font-medium mb-2" >Lieu
            </label>
              <input type="text" name="lieu" value={formDemande.lieu}
                onChange={handleChange} placeholder="Adresse ou lieu concerné"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required /> 

            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Priorité</label>
              <select
                name="priorite" value={formDemande.priorite} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all" >
                <option value="Faible">Faible</option>
                <option value="Normale">Normale</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Nombre de bénéficiaires */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Nombre de bénéficiaires</label>
            <input
              type="number"
              name="nombrebeneficiaires"  min="1"
              value={formDemande.nombrebeneficiaires} onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              required />
          </div>

          {/* Option de contact */}
          <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-md">
            <input
              type="checkbox"
              id="etreContacter" name="etreContacter"
              checked={formDemande.etreContacter}
              onChange={handleChange} className="w-5 h-5 text-blue-600 mr-3"
            />
            <label htmlFor="etreContacter" className="text-gray-700">Je souhaite être contacté(e) concernant cette demande</label>
          </div>

          {/* Image Upload - Déplacé avant le bouton */}
          <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-center mb-4">Image (optionnelle)</h3>
            <ImageUploads onChange={setImage} />
          </div>
          
          {/* Bouton de soumission */}
          <div className="text-center">
            <button 
              type="submit" 
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <HeartHandshake className='w-6 h--6 mr-2'/>
              Soumettre ma demande d'aide
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormDemandeAide;