import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { DateString } from '../components/dateAgeFormat';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertCircle, Bell, FileText, User, X } from 'lucide-react';


export default function ActiviteRecente({ isAdmin = false }) {
    const [activites, setActivites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetshActivites = async () => {
            try {
                const url = isAdmin
                    ? 'http://localhost:5000/admin/historiques' : 'http://localhost:5000/Myhistorique';
                    console.log("URL utilisée :", url);
                    console.log("isAdmin :", isAdmin);

                const res = await axios.get(url);
                setActivites(res.data)
                setLoading(false);
            } catch (error) {
                console.log("Erreur chargement activités: ", error);
                setLoading(false)
            }
        }
        fetshActivites();
    }, [isAdmin]);

    const getIcon = (type) => {
        switch (type) {
            case 'inscription': return <User className="text-blue-500" size={20} />;
            // case 'approbation': return <Check className="text-green-500" size={20} />;
            case 'annonce': return <Bell className="text-green-500" size={20} />;
            case 'suppression': return <X className="text-red-500" size={20} />;
            case 'modification': return <FileText className="text-purple-500" size={20} />;
            case 'demande': return <AlertCircle className="text-orange-500" size={20} />;
            default: return <FileText className="text-gray-500" size={20} />;
        }
    };

    const formatDate = (dateString) => {
        return formatDistanceToNow(parseISO(dateString), {
            addSuffix: true,
            locale: fr
        })
    }

    if (loading) {
        return (
            <div className=' flex items-center justify-center h-60'>
                <p className='text-2xl text-gray-800 '>Chargement...</p>
            </div >
        )
    }

    return (
        <div className='bg-white rounded-lg shadow'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-semibold'>{isAdmin ? 'Activités Récentes ' : 'Vos activites récentes'}</h2>
            </div>

            <div className=' max-h-96 overflow-y-auto'>
                {
                    activites.map((activite) =>
                    (
                        <div key={activite._id} className='p-3 hover:bg-gray-50 border-b border-gray-100'>
                            <div className='flex'>
                                <div className='mr-3 mt-1'>
                                    {getIcon(activite.type)}
                                </div>
                                <div >
                                    <p className='font-medium'>{activite.titre}</p>
                                    <p className="text-sm text-gray-600">{activite.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{formatDate(activite.date)}</p>

                                </div>

                            </div>
                        </div>
                    )
                    )
                }

                {
                    activites.length === 0 && (
                        <div className='p-4 text-center text-gray-500'>
                            Aucune activité trouvée
                        </div>
                    )
                }
            </div>


        </div>
    )
}
