import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User, Phone, Mail, MapPin, Calendar, Briefcase, ChevronLeft, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DateString } from '../dateAgeFormat';
import CategoriesCard from '../formComponents/CategoriesCard';
import DemandeAideModal from '../Demande/DemandeAideModal';


export default function ProfileParticulier() {
    const { id } = useParams();
    const [particulier, setParticulier] = useState(null);
    const [demandes, setDemandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected,setSelected] = useState(null);// btn voire plus de detail d une demandes d'aide selectionner

    useEffect(() => {
        const fetchParticulierData = async () => {
            try {
                // Récupérer les infos du particulier depuis la liste complète
                const particuliersResponse = await axios.get(`http://localhost:5000/particuliers`);
                const particulierFound = particuliersResponse.data.find(p => p._id === id);

                if (!particulierFound) {
                    console.error("Particulier non trouvé");
                    setLoading(false);
                    return;
                }

                setParticulier(particulierFound);

                // Récupérer toutes les demandes d'aide et filtrer celles du particulier
                try {
                    const allDemandesResponse = await axios.get(`http://localhost:5000/demandeAide`);
                    const particulierDemandes = allDemandesResponse.data.filter(
                        demande => demande.particulierInfo && demande.particulierInfo._id === id
                    );

                    console.log("Demandes filtrées pour le particulier:", particulierDemandes);
                    setDemandes(particulierDemandes || []);
                } catch (demandeError) {
                    console.error("Impossible de charger les demandes d'aide:", demandeError);
                    setDemandes([]);
                }

                setLoading(false);
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                setLoading(false);
            }
        };

        fetchParticulierData();
    }, [id]);

const OpenModal= (demandeID)=>{
    setSelected(demandeID);
}

const CloseModal= ()=>{
    setSelected(null);
}

    // Définir les styles selon la priorité pour les demandes
    const prioriteStyle = {
        "Urgent": { bg: "bg-red-200 text-red-800", icon: AlertTriangle },
        "Normale": { bg: "bg-blue-200 text-yellow-800", icon: Info },
        "Faible": { bg: "bg-green-200 text-green-800", icon: CheckCircle }
    };

    if (loading) {
        return (
            <div className="pt-24 flex justify-center items-center min-h-screen bg-purple-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    if (!particulier) {
        return (
            <div className="pt-24 flex justify-center items-center min-h-screen bg-purple-100">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl text-red-500">Particulier non trouvé</h2>
                    <Link to="/particuliers" className="mt-4 inline-block text-violet-600 hover:underline">
                        Retour à la liste des particuliers
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-32  min-h-screen pb-14">
            <div className=" mx-auto px-4 lg:p-10">
                <div className="mb-6">
                    <Link to="/particuliers" className="inline-flex items-center text-violet-600 hover:text-violet-800">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Retour à la liste des particuliers
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* En-tête avec image */}
                    <div className="h-48 bg-gradient-to-tr from-violet-500 to-yellow-200 relative">
                        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 ml-6">
                            <div className="rounded-full border-4 border-yellow-400 overflow-hidden w-36 h-36">
                                <img
                                    src={particulier.image ? `http://localhost:5000/${particulier.image}` : "uploads/uploadsParticulier/avatar_particulier.jpg"}
                                    alt={`${particulier.prenom} ${particulier.nom}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Informations du particulier */}
                    <div className="mt-20 px-6 py-4">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {particulier.civilite === "Femme" ? "Mme" : "M."} {particulier.prenom || ''} {particulier.nom || ''}
                            </h1>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                <h2 className="text-xl font-semibold text-violet-700 border-b pb-2">Informations personnelles</h2>

                                <div className="flex items-center gap-3">
                                    <Briefcase className="text-[#fece0e] w-5 h-5  " />
                                    <div>
                                        <span className="text-gray-600 font-medium">Profession:</span>
                                        <span className="ml-2">{particulier.profession || "Non renseigné "}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="text-[#fece0e] w-5 h-5 " />
                                    <div>
                                        <span className="text-gray-600 font-medium">Ville:</span>
                                        <span className="ml-2">{particulier.ville}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Calendar className="text-[#fece0e] w-5 h-5 " />
                                    <div>
                                        <span className="text-gray-600 font-medium">Date de naissance:</span>
                                        <span className="ml-2">{DateString(particulier.dateDeNaissance)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                <h2 className="text-xl font-semibold text-violet-700 border-b pb-2">Contact</h2>

                                <div className="flex items-center gap-3">
                                    <Mail className="text-[#fece0e] w-5 h-5 " />{/* flex-shrink-0 */}
                                    <div>
                                        <span className="text-gray-600 font-medium">Email:</span>
                                        <span className="ml-2">{particulier.email}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Phone className="text-[#fece0e] w-5 h-5 " />
                                    <div>
                                        <span className="text-gray-600 font-medium">Téléphone:</span>
                                        <span className="ml-2">{particulier.numeTelephone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Demandes d'aide */}
                        <div className="mt-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Demandes d'aide</h2>

                            {demandes.length > 0 ? (
                                <div className="space-y-4 ">
                                    {demandes.map(demande => {
                                        console.log("Affichage de la demande:", demande);
                                        const PrioriteIcon = prioriteStyle[demande.priorite]?.icon || Info;

                                        return (
                                            <div key={demande._id}  onClick={()=> OpenModal(demande._id)} className="border rounded-lg shadow-sm hover:shadow-md bg-[#f2f2d755] transition-shadow p-4">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-lg font-semibold text-violet-700">{demande.titre}</h3>
                                                    <div className={`flex items-center gap-1 py-1 px-2 rounded-full text-sm ${prioriteStyle[demande.priorite]?.bg || "bg-gray-200"}`}>
                                                        <PrioriteIcon className="w-4 h-4" />
                                                        <span>{demande.priorite || "Normale"}</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 mt-2">{demande.description || "Aucune description n'est disponible."}</p>

                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    <CategoriesCard categories={demande.categorie} />
                                                </div>

                                                <div className="mt-4 flex justify-between items-center">
                                                    <div className="text-sm flex flex-col space-y-2 text-gray-500">
                                                        <span> {demande.dateBesoin && `Besoin le: ${DateString(demande.dateBesoin)}`}</span>
                                                        <span>{demande.createdAt && `Créée le: ${DateString(demande.createdAt)}`}</span>
                                                    </div>

                                                    <button
                                                        onClick={()=> OpenModal(demande._id)}
                                                        className="text-violet-600 hover:text-violet-800 text-sm font-medium"
                                                    >
                                                        Voir les détails
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="bg-gray-50 p-6 rounded-lg text-center">
                                    <p className="text-gray-600">Ce particulier n'a pas encore fait de demandes d'aide.</p>
                                </div>
                            )}
                        </div>
                        {selected && (
                            <DemandeAideModal demandeId={selected} onClose={CloseModal}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}