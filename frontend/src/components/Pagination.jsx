import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onChangePage }) {

  //ne pas afficher la pagination s il n y a qu une seule page
  if (totalPages <= 1) return null;

  return (
    <div className='flex justify-center py-12 bg-gray-10'>
      <div className='flex items-center bg-white rounded-lg shadow-lg overflow-hidden'>
        <button onClick={() => onChangePage(page - 1)} disabled={page === 1}
          className={`px-3 py-2 ${page === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 rounded-lx  hover:bg-purple-100'}`}
          aria-label='Page précédente' >
          <ChevronLeft className='h-6 w-6 ' />
        </button>
        <div className='px-4 py-2 border-l border-r font-semibold'>
           {page} sur {totalPages}
        </div>
        <button onClick={() => onChangePage(page + 1)} disabled={page === totalPages}
        className={`px-3 py-2 ${page === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'text-gray-700 rounded-lx  hover:bg-purple-100 transition-colors'}`}
        aria-label='Page suivante'>
        <ChevronRight className='h-6 w-6' />
      </button>
      </div>


    </div>
  )
}
