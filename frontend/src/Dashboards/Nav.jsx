import React from 'react'
import { useLocation } from 'react-router-dom'
import { TodayDate } from '../components/dateAgeFormat';
import { Bell, Search } from 'lucide-react';



export default function Nav({ isOpenSide }) {
    const location = useLocation();
    const currentPath = location.pathname;

    let titre = 'Tableau de Bord';

    if (currentPath === '/adminDashboard') titre = 'Tableau de Bord';
    else if (currentPath === '/admin/benevoles') titre = 'Bénévoles';
    else if (currentPath === '/admin/particuliers') titre = 'Particuliers';
    else if (currentPath === '/admin/annonces') titre = 'Annonces';
    else if (currentPath === '/admin/demandesaide') titre = "Demandes d'aide";
    else if (currentPath === '/admin/approbation') titre = 'Approbation';

    return (
        <div className=' bg-white py-4 px-6 w-full border-b  '>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className='text-2xl font-semibold text-gray-800 '>{titre}</h1>
                    <TodayDate />
                </div>

                <div className='flex items-center  gap-4'>
                    <div className='relative'>
                        <input type='text' placeholder='Rechercher...' className='pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 w-64' />
                        <Search className='absolute left-3 top-2.5 text-gray-400 size-5' />
                    </div>

                    <div className='relative'>
                        <button className='relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full'>
                            <Bell className='size-5  ' />
                            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center w-5 h-5 '>
                                3
                            </span>
                        </button>
                    </div>
                    {/* btn app */}
                    {/* <div className='relative'> */}
                    <button type='' className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors'>
                        Action rapide
                    </button>
                    {/* </div> */}
                </div>
            </div>

        </div>
    )
}
