import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Auth } from '../../context/Auth';
import { toast } from 'react-toastify';
import { DateString } from '../dateAgeFormat';
import { MdOutlineRateReview, MdReviews } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';

export default function RecomendationAssociation() {
  const { id: sendToId } = useParams();  // l'ID de l'association/bénévole 
  const { user } = useContext(Auth);     // utilisateur connecté
  const [recs, setRecs] = useState([]);  // liste des recommandations
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [content, setContent] = useState("");
  const [score, setScore] = useState(0);
  // const [currentPage, setCurrentPage] = useState("association"); // Par défaut association, à modifier si besoin

  useEffect(() => {
    const fetchRecs = async () => {
      try {
        // let roleType = window.location.pathname.includes('/association/') ? 'association' : 'benevole';//indiquer ou en se trouve 
        // setCurrentPage(roleType);

        const res = await axios.get(`http://localhost:5000/recommendation/association/${sendToId}`);
        setRecs(res.data);
      } catch (err) {
        console.error("Erreur fetch recs:", err);
        toast.error("Impossible de charger les recommandations");
      } finally {
        setLoading(false);
      }
    };

    fetchRecs();
  }, [sendToId]);

  //si il a déjà recommender ou pas
  const hasUserRecommended = user ? recs.some(rec => rec.authorId === user.id) : false;
  const userRecommendation = user ? recs.find(rec => rec.authorId === user.id) : null;

  const handleAdd = async () => {
    if (!user) {
      toast.error("Vous devez être connecté pour ajouter une recommandation");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        "http://localhost:5000/recommendation/add", { sendToId, roleType: "association", content, score },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowAddModal(false);
      setContent("");
      toast.success("Recommandation ajoutée avec succès");

      // afficher tt 
      const res = await axios.get(`http://localhost:5000/recommendation/association/${sendToId}`);
      setRecs(res.data);
    } catch (error) {
      console.error("Erreur ajout recommandation:", error);
      const msgError = error.response?.data.message || error.response?.data.error || "Impossible d'ajouter la recommandation.";
      toast.error(msgError);
    }
  };

  // a supprimer
  const handleDelete = async () => {
    if (!userRecommendation) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `http://localhost:5000/recommendation/${userRecommendation._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setShowDeleteModal(false);
      toast.success("Recommandation supprimée avec succès");

      setRecs(recs.filter(r => r._id !== userRecommendation._id));//!
    } catch (err) {
      console.error("Erreur suppression recommandation:", err);
      toast.error("Impossible de supprimer la recommandation");
    }
  };

  if (loading) {
    return (
      <div className='bg-white mt-4 shadow-lg w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
        <p className='text-center py-4'>
          Chargement des recommandations...
        </p>
      </div>
    );
  }

  return (
    <div className='bg-white mt-4 shadow-lg w-[340px] md:w-[800px] relative -top-2 rounded-lg p-6'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-700">Recommandations</h2>
        {user && (
          hasUserRecommended ? (
            <button onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition" >
              Supprimer ma recommandation
            </button>
          ) : (
            <button onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" >
              + Ajouter une recommandation
            </button>
          )
        )}
      </div>
      <hr className='my-4' />
      {/* Liste des recommandations */}
      {recs.length === 0 ? (
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-600">Aucune recommandation pour le moment.</p>
          {user && !hasUserRecommended && (
            <p className="text-gray-500 mt-2 text-sm">
              Soyez le premier à laisser une recommandation !
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
          {recs.map((rec) => (
            <div key={rec._id}
              className={`border relative rounded-lg p-4 ${rec.authorId === (user?.id || '') ? 'bg-purple-50 border-purple-200' : 'bg-gray-50 border-gray-200'}`} >
              <MdOutlineRateReview className='absolute right-5 bottom-2 text-orange-300 ' size={24} />

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center">

                  <div className="w-20 h-20 rounded-full border-4 overflow-hidden mr-3  border-orange-300">
                    {rec.authorImage ? (
                      <img src={`http://localhost:5000/${rec.authorImage}`}
                        alt={rec.authorName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                        {rec.authorName}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className='flex space-x-1 mb-2'>
                      {[1, 2, 3, 4, 5].map(note => (
                        <FaStar key={note} size={16} className={` ${note <= rec.score ?
                          "text-yellow-400" : "text-gray-300"} 
                    mr-1`} onClick={() => setScore(note)} />
                      ))}
                    </div>
                    <div className="font-medium text-gray-900">{rec.authorName}</div>
                    <div className="text-xs text-gray-500">{DateString(rec.createdAt)}</div>
                  </div>
                </div>
                <div className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {rec.authorType === 'benevole' ? 'Bénévole' :
                    rec.authorType === 'association' ? 'Association' : 'Particulier'}
                </div>

              </div>
              <p className="text-gray-700">{rec.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Modale d'ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">Ajouter une recommandation</h3>

            <div className='flex space-x-1 mb-4'>
              {[1, 2, 3, 4, 5].map(note => (
                <FaStar key={note} size={24} className={` ${note <= score ?
                  "text-yellow-400" : "text-gray-300"} 
                    cursor-pointer`} onClick={() => setScore(note)} />
              ))}
            </div>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Partagez votre expérience..."
              className="w-full border rounded-lg p-3 mb-4  focus:outline-none focus:ring-2 focus:ring-purple-500" rows={4} />
            <div className="flex justify-end space-x-3">

              <button onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50" >
                Annuler
              </button>

              <button onClick={handleAdd}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Publier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modale de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">Supprimer votre recommandation</h3>
            <p className="mb-6">Êtes-vous sûr de vouloir supprimer votre recommandation ?</p>

            {/* Afficher le contenu de la recommandation à supprimer */}
            {userRecommendation && (
              <>
                <div className='flex space-x-1 mb-2'>
                  {[1, 2, 3, 4, 5].map(note => (
                    <FaStar key={note} size={16} className={` ${note <= userRecommendation.score ?
                      "text-yellow-400" : "text-gray-300"} 
                              mr-1`} onClick={() => setScore(note)} />
                  ))}
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4 text-gray-700">
                  "{userRecommendation.content}"
                </div>
              </>
            )}

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
