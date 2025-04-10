import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ParticulierCard({ particulier, showDemandes = false }) {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDemandesList, setShowDemandesList] = useState(false);

  // Format de la date de naissance
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Calcul de l'âge
  const calculerAge = (dateNaissance) => {
    const aujourdhui = new Date();
    const dateDeNaissance = new Date(dateNaissance);
    let age = aujourdhui.getFullYear() - dateDeNaissance.getFullYear();
    const mois = aujourdhui.getMonth() - dateDeNaissance.getMonth();
    
    if (mois < 0 || (mois === 0 && aujourdhui.getDate() < dateDeNaissance.getDate())) {
      age--;
    }
    
    return age;
  };

  // Charger les demandes d'aide du particulier
  const fetchDemandesParticulier = async () => {
    if (!particulier._id) return;
    
    setLoading(true);
    try {
      // Supposons que vous avez un endpoint pour récupérer les demandes d'un particulier spécifique
      const response = await axios.get(`http://localhost:5000/demandeAide/particulier/${particulier._id}`);
      setDemandes(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des demandes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour basculer l'affichage des demandes
  const toggleDemandesList = () => {
    if (!showDemandesList && demandes.length === 0) {
      fetchDemandesParticulier();
    }
    setShowDemandesList(!showDemandesList);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Badge du rôle */}
      <div className="absolute top-0 right-0 z-10 bg-violet-500 text-white py-1 px-3 rounded-bl-xl">
        {particulier.role}
      </div>

      {/* Image de profil */}
      <div className="relative h-56 bg-gradient-to-b from-violet-400 to-violet-600 flex justify-center items-end pb-8">
        <div className="absolute bottom-0 transform translate-y-1/2 rounded-full border-4 border-white overflow-hidden w-32 h-32">
          <img 
            src={particulier.image ? `http://localhost:5000/${particulier.image}` : "uploads/uploadsParticulier/avatar_particulier.jpg"} 
            alt={`${particulier.prenom} ${particulier.nom}`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Informations du particulier */}
      <div className="mt-16 p-4 space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-900">
            {particulier.civilite === "Femme" ? "Mme" : "M."} {particulier.prenom} {particulier.nom}
          </h2>
          <p className="text-gray-600">{calculerAge(particulier.dateDeNaissance)} ans</p>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-3">
            <Briefcase className="text-violet-500 w-5 h-5" />
            <span>{particulier.profession}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <MapPin className="text-violet-500 w-5 h-5" />
            <span>{particulier.ville}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="text-violet-500 w-5 h-5" />
            <span className="text-sm truncate">{particulier.email}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="text-violet-500 w-5 h-5" />
            <span>{particulier.numeTelephone}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="text-violet-500 w-5 h-5" />
            <span>Né(e) le {formatDate(particulier.dateDeNaissance)}</span>
          </div>
        </div>

        {/* Bouton pour afficher les demandes */}
        <button 
          onClick={toggleDemandesList}
          className="w-full mt-4 bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
        >
          {showDemandesList ? "Masquer les demandes" : "Voir les demandes d'aide"}
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Liste des demandes d'aide du particulier */}
        {showDemandesList && (
          <div className="mt-4 border-t pt-4">
            <h3 className="font-semibold text-lg mb-3 text-purple-900">Demandes d'aide</h3>
            
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-700"></div>
              </div>
            ) : demandes.length > 0 ? (
              <div className="space-y-3">
                {demandes.map(demande => (
                  <div key={demande._id} className="border rounded-lg p-3 hover:bg-purple-50 transition-colors">
                    <h4 className="font-medium text-purple-800">{demande.titre}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{demande.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className={`text-xs px-2 py-1 rounded ${
                        demande.priorite === "Urgent" ? "bg-red-100 text-red-800" :
                        demande.priorite === "Normale" ? "bg-yellow-100 text-yellow-800" :
                        "bg-green-100 text-green-800"
                      }`}>
                        {demande.priorite}
                      </span>
                      <Link 
                        to={`/demandeDetail/${demande._id}`}
                        className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                      >
                        Détails
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 py-3">
                Aucune demande d'aide trouvée pour ce particulier.
              </p>
            )}
          </div>
        )}
        
        {/* Bouton pour voir le profil complet */}
        <Link
          to={`/particulier/${particulier._id}`}
          className="block text-center text-violet-600 hover:text-violet-800 mt-3 font-medium"
        >
          Voir le profil complet
        </Link>
      </div>
    </div>
  );
}