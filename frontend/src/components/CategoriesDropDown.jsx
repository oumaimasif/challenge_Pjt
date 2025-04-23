import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react';

export default function CategoriesDropDown({ selectedCtg = [], setSelectedCtg,required=false })//undefind =[] vide 
 {
    const [categories, setCategories] = useState([]);


    //charger les categories depuis la bd 
    useEffect(() => {
        const fetchCtg = async () => {

            try {
                const res = await axios.get("http://localhost:5000/categories");
                setCategories(res.data.categories)
            } catch (error) {
                console.log('Erreur lors du chargement des catégories', error)
            }
        }
        fetchCtg();
    }, [])


    return (
        <>
            <div className='mb-4'>
                <label className='block text-gray-700 text-lg font-semibold mb-2'>
                    Catégories qui vous intéressent{required && <span className='text-red-500 font-semibold  ml-1'>*</span>}
                </label>
                <select className='w-full p-2 border  rounded mb-2'
                    onChange={(e) => {
                        if (e.target.value && !selectedCtg.includes(e.target.value)) {
                            setSelectedCtg([...selectedCtg, e.target.value]);
                        }
                    }} value="">

                    <option value="" disabled>Séléctionnez une catégorie </option>
                    {categories.map((ctg) => (
                        <option value={ctg.nom} key={ctg._id} disabled={selectedCtg.includes(ctg.nom)} >{ctg.nom}</option>
                    ))}
                </select>

                {/* ici on affiche les ctg selectionées */}
                <div className='flex flex-wrap gap-2 mt-2'>
                    {selectedCtg.map((ctg, index) =>
                    (
                        <div key={index} className="bg-orange-500 text-white px-3 py-1 rounded-lg flex items-center">
                            {ctg}
                            <button type="button" onClick={() => setSelectedCtg(selectedCtg.filter(c => c !== ctg))} className='ml-2 text-white font-bold'>
                                <X className='w-3 h-3' />
                            </button>
                        </div>
                    )

                    )}
                    <p className='text-sm text-fuchsia-700 mt-1'>Vous avez la possibilité de sélectionner plusieurs catégories dans la liste déroulante.</p>

                </div>
            </div>
        </>

    )
}
