import React from 'react'

export default function CategoriesCard({ categories }) {
    return (

        <div className='flex flex-wrap gap-2 mt-2'>
            {categories && categories.length > 0 ?
                (categories.map((cat, index) => (
                    <span key={index} className='px-2 py-1 border border-blue-300 bg-blue-50 text-blue-700 text-[8px] sm:text-[10px] rounded-full'>
                        {cat}
                    </span>
                ))) : (
                <span  className='px-2 py-1 border border-gray-300 bg-gray-50 text-gray-500 text-[8px] sm:text-[10px] rounded-full'>
                      Aucune catégorie
                </span>)
            }

        </div>
    )
}
