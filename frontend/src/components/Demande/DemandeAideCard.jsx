import { AlertCircle, AlertTriangle, CheckCircle, Info, Tag, Users, } from "lucide-react";
import React from "react";
import CategoriesCard from "../formComponents/CategoriesCard";

// import { Link } from "react-router-dom";

export default function DemandeAideCard({ demande, onSelectDemande }) {
  // Définir les couleurs et icônes selon la priorité
  const prioriteStyle = {
    Urgent: { bg: "bg-red-200 text-red-800", icon: AlertTriangle },
    Normale: { bg: "bg-blue-200 text-yellow-800", icon: Info },
    Faible: { bg: "bg-green-200 text-green-800", icon: CheckCircle },
  };

  // Définir les couleurs selon le statut
  const statutStyle = {
    "En attente": "bg-yellow-300 text-yellow-800",
    Accepté: "bg-blue-300 text-blue-800",
    Refusé: "bg-red-300 text-red-800",
    Rasolu: "bg-green-300 text-green-800",
  };

  const PrioriteIcon = prioriteStyle[demande.priorite]?.icon || Info;

  return (

    <div className="relative flex flex-col justify-between w-full h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className={`absolute top-0 left-0 z-10 bg-purple-200 bg-opacity-75 text-gray-600 font-semibold py-1 px-2 rounded-br-xl flex items-center`}>
        <AlertCircle className="w-5 h-5" />
        <span className="text-gray-600 font-semibold  py-1 px-2 rounded-br-2xl"> Demande d'aide </span>
      </div>

      {/* Image de la demande */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={`http://localhost:5000/${demande.image}`}
          alt="Image de la demande d'aide"
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
      </div>

      <div className="space-y-3 p-4">
        <h1 className="text-purple-900 line-clamp-2 font-bold text-xl">
          {demande.titre}
        </h1>
        <p className="text-sm text-gray-700 line-clamp-3">
          {demande.description}
        </p>

        <div className=" flex-grow space-y-2">
          {/* Informations du particulier */}
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-purple-500 ml-3" />
            <span className="">Particulier</span>
            {/* utiliser demandes.particulierInfo */}
            {demande.particulierInfo ? (
              <span className="text-sm py-1 text-gray-700">: {demande.particulierInfo.nom} {demande.particulierInfo.prenom}</span>
            ) : (
              <span className="text-sm py-1 text-gray-700">: Créateur inconnu</span>
            )}
          </div>

          {/* Categories */}
          <div>
            <CategoriesCard categories={demande.categorie} />
          </div>

          {/* Nombre de bénéficiaires */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-500 ml-3" />
            <span className="text-sm py-1 text-gray-700">
              Bénéficiaires: {demande.nombrebeneficiaires}
            </span>
          </div>

          <div className="flex gap-3">
            {/* Priorité */}
            <div
              className={`flex items-center gap-2 py-1 w-fit pr-3 rounded-xl ${prioriteStyle[demande.priorite]?.bg || "bg-gray-200"
                }`}
            >
              {PrioriteIcon && (
                <PrioriteIcon className="w-4 h-4 text-violet-500 ml-3" />
              )}
              <span className="font-medium text-sm">
                {demande.priorite || "Priorité non spécifiée"}
              </span>
            </div>

            {/* Statut */}
            <div
              className={`inline-block py-1 px-3 rounded-full text-sm font-medium ${statutStyle[demande.statute] || "bg-gray-200 text-gray-800"
                }`}
            >
              {demande.statute}
            </div>
          </div>
        </div>

        {/* Bouton de détails */}
        <button
          onClick={() => onSelectDemande(demande._id)}
          className="flex items-center justify-center w-full mt-4 text-center bg-violet-500 text-white py-2 rounded-full hover:bg-violet-600 transition-all duration-300 hover:shadow-lg"
        >
          Voir les détails
        </button>
      </div>
    </div>
  );
}
