import React from 'react'

const RecomendationBenevole = () => {
  return (
    <>
          <div className="bg-white shadow-lg w-full rounded-lg p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Commentaires</h2>
      <p className="bg-purple-400 p-5 text-white rounded-lg mb-6">{profil.commentaires || "Aucun commentaire pour le moment."}</p>
      
      {/* Add a comment form section */}
      <div className="mt-6">
        <h3 className="text-xl font-medium text-purple-700 mb-3">Laisser un commentaire</h3>
        <textarea 
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows="4"
          placeholder="Écrivez votre commentaire ici..."
        ></textarea>
        <button className="mt-3 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Envoyer
        </button>
      </div>
    </div>
    </>
  )
}

export default RecomendationBenevole