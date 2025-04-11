import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, MapPin, Calendar, Briefcase, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ParticulierCard({ particulier }) {


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
        </div>

        {/* Bouton pour voir le profil complet */}
        <div className=' flex items-center justify-center gap-2'>       
          <Link
          to={`/particulier/${particulier._id}`}
          className="block text-center text-violet-600 hover:text-violet-800 mt-3 font-medium"
        >
          
          Voir le profil complet
        </Link>
        <ArrowRight className='w-4 h-4 mt-2' /></div>
      </div>
    </div>
  );
}