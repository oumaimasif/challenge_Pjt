import axios from 'axios';
import React, { useEffect, useState } from 'react'
import PagePrincipal from '../PagePrincipal'
import { toast } from 'react-toastify';
import { Users, Building2, User2, Bell, HelpCircle } from 'lucide-react';
import ActiviteRecente from '../ActiviteRecente';


const Card = ({ titre, number, icon }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow '>
      <div className='flex justify-between items-center mb-3'>
        <h2 className='text-gray-700 font-medium'>{titre}</h2>
        <div className='p-2 rounded-full bg-gray-100'>
          {icon}
        </div>
      </div>
      <p className='text-3xl font-bold '>{number}</p>
    </div>
  )

}



export default function AdminDashboard() {
  const [statistique, setStatistique] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/admin/dashboard-statistiques')
        setStatistique(res.data);
        setLoading(false)
      } catch (error) {
        console.log('Erruer Dashboard: ', error);
        toast.error("Impossible de charger les statistiques");
        setLoading(false)

      }
    }
    fetchData();
  }, [])


  if (loading) {
    return (
      <PagePrincipal>
        <div className=' flex items-center justify-center h-60'>
          <p className='text-2xl text-gray-800 '>Chargement...</p>
        </div >
      </PagePrincipal >
    )
  }

  return (
    <PagePrincipal>
      <h1 className="text-2xl font-bold mb-4">Statistiques générales</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card titre="Bénévoles" number={statistique.benevoles}
          icon={<Users size={24} className="text-blue-600" />} />
        <Card titre="Associations" number={statistique.associations}
          icon={<Building2 size={24} className="text-green-600" />} />
        <Card titre="Particuliers" number={statistique.particuliers}
          icon={<User2 size={24} className="text-purple-600" />} />
        <Card titre="Annonces" number={statistique.annonces}
          icon={<Bell size={24} className="text-orange-600" />} />
        <Card titre="Demandes d'aide" number={statistique.demandes}
          icon={<HelpCircle size={24} className="text-red-600" />} />
      </div>

      <div className='mt-20'>
      <ActiviteRecente isAdmin={true} />
      </div>
    </PagePrincipal>

  )
}
