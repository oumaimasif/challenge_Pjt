import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Notification from '../Notification';
import Confirmation from '../Confirmation';
import { Megaphone } from 'lucide-react';
import CategoriesDropDown from '../CategoriesDropDown';
import { Auth } from '../../context/Auth';

import ImageUploads from '../formComponents/ImageUploads';


function FormAnnonce() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(Auth)
  const modeEdition = !!id;
  const [formAnnonce, setFormAnnonce] = useState({
    titre: '', description: '', role: 'association', type: 'Besoin', ville: '', dateDebut: '', dateFin: '',
    nbrBenevole: 0, aideReçu: false, statut: 'brouillon', niveauDurgence: 'Moyen', infoContact: '',
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [notification, setNotification] = useState({ type: '', msg: '' });
  const [isConfirme, setIsConfirme] = useState(false);
  const [urlimge, setUrlImage] = useState('');


  //user est connecter ou pas
  useEffect(() => {
    if (!user) {
      setNotification({
        type: 'error',
        msg: "Vous devez etre connecté pour créer une annonce (bénévole , association)"
      })

      window.scrollTo({ top: 1, behavior: 'smooth' })//remonter en haut de la page
      setTimeout(() => {
        // setNotification({ type: '', msg: '' });
        navigate('/login')

      }, 8000);
    }
  }, [user, navigate])

  useEffect(() => {
    if (modeEdition && user) {
      const fetchData1 = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/annonces/annonceDetail/${id}`);
          const annonceData = response.data;

          const isAllowe =
            (user.role === "association" &&
              annonceData.associationID === user.id) ||
            (user.role === "benevole" &&
              annonceData.benevoleID === user.id);

          if (!isAllowe) {
            setNotification({
              type: 'error',
              msg: " Vous n'etes pas autorisé à modifier cette annonce"
            });
            window.scrollTo({ top: 1, behavior: 'smooth' })
            setTimeout(() => {
              navigate('/annonces')
            }, 3000);
            return;

          }

          // Formater les dates pour les champs date
          const formatDate = (dateString) => {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };

          setFormAnnonce({
            titre: annonceData.titre || '', description: annonceData.description || '', role: 'association', type: annonceData.type || 'Besoin', ville: annonceData.ville || '', dateDebut: formatDate(annonceData.dateDebut), dateFin: formatDate(annonceData.dateFin),
            nbrBenevole: annonceData.nbrBenevole || 0, aideReçu: annonceData.aideReçu || false, statut: annonceData.statut || 'brouillon', niveauDurgence: annonceData.niveauDurgence || 'Moyen', infoContact: annonceData.infoContact || ''

          })

          setSelectedCategories(annonceData.categories || []);

          if (annonceData.image) {
            setUrlImage(annonceData.image)
          }


        } catch (error) {
          console.error("Erreur lors du chargement de l'annonce:", error);
          setNotification({
            type: 'error',
            msg: "Erreur lors du chargement de l'annonce. Veuillez réessayer."
          });
          window.scrollTo({ top: 1, behavior: 'smooth' })
        }
      }
      fetchData1();
    }
  }, [id, modeEdition, user, navigate])

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
      window.scrollTo({ top: 1, behavior: 'smooth' })

      return;
    }


    try {
      const formData = new FormData();

      for (const key in formAnnonce) {
        if (key === "statut" && user.role !== "admin") {
          continue;
        }
        formData.append(key, formAnnonce[key]);
      }

      formData.append("categories", JSON.stringify(selectedCategories));

      if (image) {
        formData.append("image", image);
      }

      console.log("Données envoyées pour mise à jour:", {
        titre: formAnnonce.titre,
        categories: selectedCategories,
      });
      const token = localStorage.getItem('token');


      let response;
      if (modeEdition) {
        response = await axios.put(
          `http://localhost:5000/annonces/update/${id}`,
          formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}`
          }
        }
        )

        setNotification({
          type: 'Ok',
          msg: "Votre annonce a été mise à jour avec succès!"
        });
        window.scrollTo({ top: 1, behavior: 'smooth' })
      }
      else {
        response = await axios.post('http://localhost:5000/annonces/add_annonces', formData, {
          headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${token}` }
        });

        console.log("Annonce ajoutée avec succès", response.data);
        setNotification({
          type: 'Ok',
          msg: "Votre annonce a été publiée avec succès!"
        });
        window.scrollTo({ top: 1, behavior: 'smooth' })
      }


      // Réinitialiser le formulaire
      setFormAnnonce({
        titre: '', description: '', role: 'association', type: 'Besoin', ville: '', dateDebut: '', dateFin: '',
        nbrBenevole: 0, aideReçu: false, statut: 'brouillon', niveauDurgence: 'Moyen', infoContact: ''
      });
      setSelectedCategories([]);
      setImage(null);

      // Réinitialiser l'input de type file
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Redirection vers la page des annonces après un délai selon le role
      setTimeout(() => {
        // navigate(modeEdition ? `` : '/annonces');
        if (user.role === "association") {
          navigate(`/association/${user.id}/gestion`)
        } else if (user.role === "benevole") {
          navigate(`/profileBenevole/${user.id}/gestion`)
        } else {
          navigate("/annonceDetail/${id}")
        }


      }, 2000);

    } catch (error) {
      console.error("Erreur lors de l'ajout de l'annonce", error);
      const errormsg = error.response?.data?.error || error.response?.data?.msg || error.response?.data?.message ||
        `Erreur lors de ${modeEdition ? 'la modification' : 'la publication'} de l'annonce. Veuillez réessayer.`;
      setNotification({
        type: 'error',
        msg: errormsg
      });
      window.scrollTo({ top: 1, behavior: 'smooth' })
      setTimeout(() => {
        setNotification({ type: '', msg: '' });
      }, 6000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-32 pb-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-xl border-t-4 border-orange-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-orange-600">{modeEdition ? "Modifier l'annonce" : "Publication d'Annonce"}</h2>
          <p className="text-gray-600 mt-2">
            {modeEdition ? "Mettez à jour les informations de votre annonce" :
              "Créez votre annonce pour partager vos besoins ou services"}
          </p>
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
              type="text" name="titre"
              value={formAnnonce.titre} onChange={handleChange} placeholder="Titre décrivant votre annonce"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              required />
          </div>

          {/* Type et Niveau d'urgence */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-orange-50 p-4 rounded-lg">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Type d'annonce</label>
              <select
                name="type" value={formAnnonce.type} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all">
                <option value="Besoin">Besoin</option>
                <option value="Service">Service</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Niveau d'urgence</label>
              <select
                name="niveauDurgence" value={formAnnonce.niveauDurgence} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md h-40 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              required
            />
          </div>

          {/* Statut de publication */}
          <div className="flex items-center mb-6 bg-gray-50 p-4 rounded-md">
            <label className="block text-gray-700 font-medium mb-2 mr-4">Statut</label>
            {/* <select
              name="statut"
              value={formAnnonce.statut}
              onChange={handleChange}
              // disabled={user.role !== "admin"}
              className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all 
                ${user.role !== "admin" ? "bg-gray-100 cursor-not-allowed" : ""}`}
            > */}
            <select
              name="statut"
              value={formAnnonce.statut}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            >
              <option value="brouillon">Brouillon</option>
              <option value="publie">Publier immédiatement</option>
              {/* {user.role === "admin" && <option value="Rejeté">Rejeter</option>} */}
            </select>
            {user.role !== "admin" && (
              <p className='text-xs text-gray-500 mt-1'>
                Seul un administrateur peut modifier le statut de l'annonce
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-center mb-4">Image illustrative (optionnelle)</h3>
            <ImageUploads onChange={setImage} />
          </div>

          {/* Bouton de soumission */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-medium rounded-lg shadow-lg hover:bg-orange-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
              <Megaphone className='w-6 h-6 mr-2' />
              {modeEdition ? "Mettre à jour l'annonce" : "Publier mon annonce"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormAnnonce;

