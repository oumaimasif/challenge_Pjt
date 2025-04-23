import React from 'react'

export default function SelectInput({label, name, value, onChange, options, required = false}) {
  return (
    <div className='mb-4'>
      
      <label className="block text-gray-700 text-lg font-semibold  mb-2">{label}{required && <span className='text-red-500 font-semibold  ml-1'>*</span>}</label>
      <select name={name} value={value} onChange={onChange} className="w-full p-2 border rounded" required={required} >
        {options.map((o,index)=>(
            <option key={index} value={o.value}>{o.label||o.value}</option>// une fallback pr eviter les option vides
        ))}
      </select>

    </div>
  )
}
