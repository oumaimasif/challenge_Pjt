import React from 'react'

export default function ListVille({ value, onChange, name = "ville", required = false, label = "Ville",
    placeholder = "Séléctionnez votre ville", className = "" }) {
    const villes = [
        "Agadir", "Al Hoceima", "Azrou", "Béni Mellal", "Berrechid", "Casablanca",
        "Chefchaouen", "Dakhla", "El Jadida", "Errachidia", "Essaouira", "Fès",
        "Guelmim", "Ifrane", "Kénitra", "Khémisset", "Khouribga", "Ksar El Kébir",
        "Laâyoune", "Larache", "Marrakech", "Meknès", "Mohammedia", "Nador",
        "Oujda", "Ouarzazate", "Rabat", "Safi", "Settat", "Sidi Kacem",
        "Tanger", "Tan-Tan", "Taroudant", "Taourirt", "Taza", "Témara",
        "Tétouan", "Tiznit", "Youssoufia", "Zagora"
    ]
    return (
        <div className={`w-full ${className}`}>
            <div className='flex items-center ' >     
            <label htmlFor={name} className=' text-gray-700 text-lg font-semibold mb-2'>
                {label}{required && <span className='text-red-500  ml-1'>*</span>}
            </label>

                {!value ? <p className='text-fuchsia-600 text-sm  mb-2 ml-3'>
                    {placeholder}
                </p> : <p className='ml-3 mb-2 text-blue-700 text-sm '> {value}</p>}
            </div>
            <div className=" ">
                <select id={name} name={name} value={value} onChange={onChange} required={required}
                    className=' w-full p-2 border rounded mb-2 ' size="3">
                    <option value="" disabled hidden>{placeholder}</option>
                    {villes.map((ville, index) => (
                        <option key={index} value={ville}>{ville}</option>
                    ))}

                </select>
            </div>


        </div>
    )
}
