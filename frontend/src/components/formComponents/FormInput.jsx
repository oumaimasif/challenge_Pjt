import React from 'react'
// Composant pour un champ texte simple
export default function FormInput({label, name, value, onChange, placeholder , required=false,type="text"}) {
  return (

    <div className='mb-4'>
        <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
        </label>
        <input type={type} name={name} value={value} onChange={onChange} required={required} className='w-full p-2 border rounded ' placeholder={placeholder} />

    </div>
  )
}
