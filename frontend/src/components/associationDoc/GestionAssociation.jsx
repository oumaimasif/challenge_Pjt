
import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Auth } from "../../context/Auth";
import { Calendar, MapPin, Users, Clock, Tag, AlertTriangle, Pen } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { TodayDate } from '../dateAgeFormat';
import AnnonceFilter from '../formComponents/AnnonceFilter';



const GestionAssociation = () => {
  const { id } = useParams();
  const { user } = useContext(Auth);
  const [annonces, setAnnonces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [annoncesOriginales, setAnnoncesOriginales] = useState([]);


  // Vérifier si l'utilisateur a le droit d'accéder à cette page
  useEffect(() => {
    if (!user) {
      setError("Vous devez être connecté pour accéder à cette page");
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    if (user.role !== "association" || user.id !== id) {
      setError("Vous n'êtes pas autorisé à accéder à cette page");
      setTimeout(() => navigate('/'), 3000);
      return;
    }

    const fetchAnnonces = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/annonces/allAnnonces/${id}`,
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        setAnnonces(response.data || []);
        setAnnoncesOriginales(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des annonces:", error);
        setError("Impossible de charger les annonces");
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, [id, user, navigate]);

  const handleDelete = async (annonceId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette annonce?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/annonces/${annonceId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Mettre à jour la liste des annonces après suppression
        setAnnonces(annonces.filter(annonce => annonce._id !== annonceId));
        toast.success("Annonce bien supprimer")
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        toast.error("Erreur lors de la suppression de l'annonce");
      }
    }
  };

  // Formater la date
  const formatDate = (dateString) => {
    if (!dateString) return "Non spécifiée";
    try {
      return format(new Date(dateString), 'dd MMMM yyyy', { locale: fr });
    } catch (error) {
      return "Date invalide";
    }
  };

  // Déterminer la couleur du badge de statut
  const getStatusColor = (statut) => {
    switch (statut) {
      case 'Publié': return 'bg-green-100 text-green-800';
      case 'brouillon': return 'bg-gray-100 text-gray-800';
      case 'Rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Déterminer la couleur du badge d'urgence
  const getUrgencyColor = (niveau) => {
    switch (niveau) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'Moyen': return 'bg-yellow-100 text-yellow-800';
      case 'Faible': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-4">{error}</h2>
          <p className="text-gray-600">Redirection en cours...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className=" md:mx-14 lg:mx-20 pt-28 px-4 pb-10">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Gestion de mon association</h1>
          <TodayDate />
        </div>
        <Link
          to={`/association/${id}`}
          className="text-purple-600 hover:text-purple-800 flex items-center"
        >
          ← Retour au profil
        </Link>
      </div>

      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between flex-wrap gap-2 items-center">
          <h2 className="text-2xl font-semibold text-purple-700">Mes annonces</h2>
          <Link
            to="/formAnnonce"
            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-sm"
          >
            + Créer une nouvelle annonce
          </Link>
        </div>

        <div className='w-fit mt-4'>
          <AnnonceFilter onFilter={(filters) => {
            const { ville, type, statut } = filters;

            const annoncesFiltrées = annoncesOriginales.filter((annonce) => {
              return (
                (ville ? annonce.ville?.toLowerCase().includes(ville.toLowerCase()) : true) &&
                (type ? annonce.type?.toLowerCase().includes(type.toLowerCase()) : true) &&
                (statut ? annonce.statut === statut : true)
              );
            });

            setAnnonces(annoncesFiltrées);
          }} />
        </div>


        {annonces.length === 0 ? (
          <div className="mt-8 text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">Vous n'avez pas encore créé d'annonces.</p>
            <p className="text-gray-400 text-sm">Les annonces que vous créez apparaîtront ici.</p>
          </div>
        ) : (
          <div className="mt-6 overflow-y-auto" style={{ maxHeight: "60vh" }}>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {annonces.map(annonce => (
                <div key={annonce._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                  <div className="p-4 border-b">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-xl text-gray-800">{annonce.titre}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(annonce.statut)}`}>
                        {annonce.statut}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <Tag className="w-4 h-4 mr-1" />
                      <span>{annonce.type}</span>

                      <div className="mx-2">•</div>

                      <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${getUrgencyColor(annonce.niveauDurgence)}`}>
                        <AlertTriangle className="w-3 h-3 inline mr-1" />
                        {annonce.niveauDurgence}
                      </div>
                    </div>
                  </div>

                  <div className="p-4">

                    <div className='border-b pb-4 mb-4'>
                      {annonce.createdAt && (<div className="flex items-center text-gray-500">
                        <MdAdd className="w-4 h-4 mr-1" />
                        <span>Créé le: {formatDate(annonce.createdAt)}</span>
                      </div>)}
                      {annonce.updatedAt && (<div className="flex items-center text-gray-500">
                        <Pen className="w-4 h-4 mr-1" />
                        <span>Dernière modification: {formatDate(annonce.updatedAt)}</span>
                      </div>)}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-4">


                      {annonce.dateDebut && (<div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Date de début: {formatDate(annonce.dateDebut)}</span>
                      </div>)}
                      {annonce.dateFin && (<div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Date de fin: {formatDate(annonce.dateFin)}</span>
                      </div>)}

                      <div className="flex items-center text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{annonce.ville}</span>
                      </div>

                      <div className="flex items-center text-gray-500">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{annonce.nbrBenevole} bénévoles requis</span>
                      </div>

                      <div className="flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{annonce.terminer}</span>
                      </div>
                    </div>

                    {annonce.categories && annonce.categories.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-1">
                        {annonce.categories.map((cat, idx) => (
                          <span key={idx} className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            {cat}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t">
                      <Link
                        to={`/annonceDetail/${annonce._id}`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        Voir
                      </Link>
                      <Link
                        to={`/editAnnonce/${annonce._id}`}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                      >
                        Modifier
                      </Link>
                      <button
                        onClick={() => handleDelete(annonce._id)}
                        className="px-3 py-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-200  rounded-lg shadow-md p-6 mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Informations de mon compte</h2>
        <p className="text-gray-600 mb-4">Vous pouvez mettre à jour vos informations personnelles et les détails de votre association.</p>
        <Link
          to={`/editAssociation/${id}`}
          className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 shadow-sm"
        >
          Modifier mes informations
        </Link>
      </div>
    </div>
  );
};

export default GestionAssociation;