import { Search } from 'lucide-react'
import React from 'react'

export default function SearchBar({ search, setSearch }) {
    return (
        <div className='mb-6 flex items-center justify-center  '>
            <div className='flex items-center bg-white w-1/4 rounded-lg overflow-auto'>

                {/* <Search size={16} className="text-gray-400 mr-2 " /> */}
                <input type='text' value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder='Rechercher par ville, nom, categorie...'
                    className='w-full relative pl-12  py-3 border border-gray-300 rounded-lg ' />
                <Search  className="absolute border-r-2 h-7 w-7 px-1 mx-2  text-gray-500  " />
            </div>
        </div>
    )
}

