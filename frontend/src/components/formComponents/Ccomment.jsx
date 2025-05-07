import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Auth } from '../../context/Auth';
import { DateString } from '../dateAgeFormat';
import { LogOut, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function Ccomment({ Type, typeId }) {
    const { user } = useContext(Auth);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [showMe, setShowMe] = useState(true);
    const [annonceOwner, setAnnonceOwner] = useState(null);
  
    // Charger les commentaires
    useEffect(() => {
      axios.get(`http://localhost:5000/comments/${Type}/${typeId}`)
        .then(res => setComments(res.data));
    }, [Type, typeId]);
    
    // Récupérer le propriétaire de l'annonce/demande
    useEffect(() => {
      const fetchOwner = async () => {
        try {
          let endpoint = '';
          if (Type === 'annonce') {
            endpoint = `http://localhost:5000/annonces/annonceDetail/${typeId}`
          } else if (Type === 'demande') {
            endpoint = `http://localhost:5000/demandeAide/${typeId}`
          }
          
          if (endpoint) {
            const response = await axios.get(endpoint);
            // Récupérer l'ID du propriétaire (association ou bénévole)
            const ownerId = response.data.associationID || response.data.benevoleID;
            setAnnonceOwner(ownerId);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du propriétaire:", error);
        }
      };
      
      fetchOwner();
    }, [Type, typeId]);
  
    const handleAdd = async e => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:5000/comments/add', 
          { Type, typeId, content: text, showMe },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setText('');
        // rechargement
        const res = await axios.get(`http://localhost:5000/comments/${Type}/${typeId}`);
        setComments(res.data);
        // console.log("dataa : ", res.data, " t",Type," H/ ",typeId);

        toast.success("Commentaire ajouté avec succès");
      } catch (error) {
        toast.error("Erreur lors de l'ajout du commentaire");
        console.error(error);
      }
    };
  
    const handleDelete = async (commentId) => {
      if (!commentId) return;
      
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `http://localhost:5000/comments/${commentId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        toast.success("Commentaire supprimé avec succès");
        setComments(comments.filter(c => c._id !== commentId));
      } catch (err) {
        console.error("Erreur suppression commentaire:", err);
        toast.error("Impossible de supprimer le commentaire");
      }
    };
    
    // Fonction pour déterminer si l'utilisateur peut voir le profil
    const canViewProfile = (comment) => {
      if (!user) return false;
      
      // Admin ou propriétaire de l'annonce peut toujours voir
      if (user.role === 'admin' || user.id === annonceOwner) {
        return true;
      }
      
      // Autres utilisateurs ne peuvent voir que si l'auteur l'a autorisé
      return comment.showMe;
    };
  
    return (
      <div className="mt-6">
        {user && (
          <form onSubmit={handleAdd} className="mb-4">
            <textarea
              className="w-full border p-2 rounded"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Laissez un commentaire…"
              required
            />
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={showMe}
                onChange={e => setShowMe(e.target.checked)}
                className="mr-2"
              />
              Afficher lien vers mon profil <span className='text-xs bg-red-50 rounded-md '>( Admin ou propriétaire de l'annonce peut toujours voir le lien de votre profil)</span> 
            </label>
            <button type="submit" className=" bg-[#fece0e] text-white py-2 px-6 rounded-full hover:bg-violet-600 transition-all duration-300 hover:shadow-lg">
              Commenter
            </button>
          </form>
        )}

        <div className="space-y-4">
          {comments.map(c => {
            // redirection en fonction du type d'utilisateur
            let basePath="profileBenevole" ; // Par défaut
            if (c.authorType === "association") {
              basePath = "association";
            } else if (c.authorType === "benevole") {
              basePath = "profileBenevole";
            } else if (c.authorType === "particulier") {
              basePath = "particulier";
            }
            
            return (
              <div key={c._id} className="border p-3 rounded relative bg-gray-50">
                {/* afficher l icon pour le proprieter de l'annonce ou demande et l'admin  */}
                {user && (user.id === c.authorId || user.role === 'admin') && (
                  <button 
                    className='absolute top-2 right-2 text-red-600 hover:text-red-700' 
                    onClick={() => handleDelete(c._id)}
                    title="Supprimer ce commentaire"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                
                {/* Afficher le lien vers le profil selon les conditions */}
                {c.authorId && canViewProfile(c) && (
                  <div className="mb-2">
                    <Link 
                      to={`/${basePath}/${c.authorId}`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <LogOut size={14} className="mr-1" /> Voir le profil
                    </Link>
                  </div>
                )}
                
                <p className="text-sm text-gray-700">{c.content}</p>
                <div className="text-xs text-gray-500">
                  {DateString ? DateString(c.createdAt) : new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}