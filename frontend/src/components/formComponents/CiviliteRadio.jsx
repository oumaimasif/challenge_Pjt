import React from 'react'

export default function CiviliteRadio({value, onChange,required=false}) {
  return (
    <div className='flex items-center space-x-4 mb-4'>
       <span className='text-gray-600'>Civilité</span>
       <label className="text-gray-800 flex items-center">
        <input type="radio" name="civilite" value="Homme" onChange={onChange} checked={value==="Homme"} required={required}/>
        <span className='ml-2'>Homme</span>
       </label>
       <label className="text-gray-800 flex items-center">
        <input type="radio" name="civilite" value="Femme" onChange={onChange} checked={value==="Femme"} required={required} />
        <span className='ml-2'>Femme</span>
       </label>
    </div>
  )
}
