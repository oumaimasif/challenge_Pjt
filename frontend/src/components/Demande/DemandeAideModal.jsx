import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle, Info, MapPin, Calendar, Users, X, Tag } from 'lucide-react';

export default function DemandeAideModal({ demandeId, onClose }) {
    const [demande, setDemande] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Définir les styles selon la priorité
    const prioriteStyle = {
        "Urgent": { bg: "bg-red-200 text-red-800", icon: AlertTriangle },
        "Normale": { bg: "bg-blue-200 text-yellow-800", icon: Info },
        "Faible": { bg: "bg-green-200 text-green-800", icon: CheckCircle }
    };

    useEffect(() => {
        const fetchDemandeDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/demandeAide/${demandeId}`);
                setDemande(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des détails de la demande:", error);
                setError("Impossible de charger les détails de la demande");
            }
        };

        if (demandeId) {
            fetchDemandeDetail();
        }
    }, [demandeId]);

    // Formatage de la date
    const formatDate = (dateString) => {
        if (!dateString) return "Non spécifiée";
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const PrioriteIcon = demande && prioriteStyle[demande.priorite]?.icon || Info;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                    </div>
                ) : error ? (
                    <div className="p-6 text-center text-red-500">{error}</div>
                ) : demande ? (
                    <>
                        {/* Image de la demande */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={`http://localhost:5000/${demande.image}`}
                                alt="Image de la demande d'aide"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                                <h1 className="text-white text-2xl font-bold">{demande.titre}</h1>
                            </div>
                            <button onClick={onClose}
                                className="absolute z-50 top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100">
                                <X className="w-6 h-6 text-gray-700" />
                            </button>
                        </div>


                        <div className="p-6 space-y-5">
                            {/* Description */}
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
                                <p className="text-gray-700">{demande.description}</p>
                            </div>

                            {/* Informations du particulier */}
                            <div className="bg-purple-50 rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Demandeur</h2>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <Tag className="w-5 h-5 text-purple-500" />
                                        <span className="text-gray-700">Nom: {demande.particulier.nom} {demande.particulier.prenom}</span>
                                    </div>
                                    {demande.etreContacter && (
                                        <p className="text-green-600 text-sm font-medium mt-1">
                                            ✓ Ce particulier souhaite être contacté pour sa demande
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Détails de la demande */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Catégories */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Catégories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {demande.categorie && demande.categorie.length > 0 ? (
                                            demande.categorie.map((cat, index) => (
                                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                                                    {cat}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-gray-500">Aucune catégorie</span>
                                        )}
                                    </div>
                                </div>

                                {/* Priorité */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Priorité</h3>
                                    <div className={`flex items-center gap-2 py-1 px-3 w-fit rounded-xl ${prioriteStyle[demande.priorite]?.bg || "bg-gray-200"}`}>
                                        {PrioriteIcon && <PrioriteIcon className="w-5 h-5" />}
                                        <span className="font-medium">{demande.priorite || "Non spécifiée"}</span>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Date du besoin</h3>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#fece0e]" />
                                        <span>{formatDate(demande.dateBesoin)}</span>
                                    </div>
                                </div>

                                {/* Lieu */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Lieu</h3>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#fece0e]" />
                                        <span>{demande.lieu || "Non spécifié"}</span>
                                    </div>
                                </div>

                                {/* Nombre de bénéficiaires */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Bénéficiaires</h3>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[#fece0e]" />
                                        <span>{demande.nombrebeneficiaires || 1} personne(s)</span>
                                    </div>
                                </div>

                                {/* Statut */}
                                <div>
                                    <h3 className="text-md font-medium text-gray-700 mb-2">Statut</h3>
                                    <span className={`inline-block py-1 px-3 rounded-full text-sm font-medium 
                    ${demande.statute === "En attente" ? "bg-yellow-300 text-yellow-800" :
                                            demande.statute === "Accepté" ? "bg-blue-300 text-blue-800" :
                                                demande.statute === "Refusé" ? "bg-red-300 text-red-800" :
                                                    demande.statute === "Rasolu" ? "bg-green-300 text-green-800" :
                                                        "bg-gray-200 text-gray-800"}`}>
                                        {demande.statute || "En attente"}
                                    </span>
                                </div>
                            </div>

                            {/* Bouton d'action en bas */}
                            <div className="flex justify-center pt-4">
                                <button className="bg-[#fece0e] text-white py-2 px-6 rounded-full hover:bg-violet-600 transition-all duration-300 hover:shadow-lg">
                                    Proposer mon aide
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="p-6 text-center text-gray-500">Demande non trouvée</div>
                )}
            </div>
        </div>
    );
}

