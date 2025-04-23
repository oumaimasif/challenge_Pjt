import React from 'react'

export default function TextArea({label,name, value, onChange, placeholder, rows="3", required=false}) {
  return (
    <div className='mb-4'>
        <label className="block text-gray-700 text-lg font-semibold mb-2">{label}{required && <span className='text-red-500 font-semibold  ml-1'>*</span>}</label>
         <textarea name={name} value={value} onChange={onChange} className='w-full p-2 border rounded' placeholder={placeholder} rows={rows} required={required}></textarea>
    </div>
  )
}
