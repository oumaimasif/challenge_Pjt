import React from 'react'

export default function ImageUploads({ onChange }) {
  return (
    <div className='mb-4'>
      <label className="block text-gray-700 text-lg font-semibold mb-2  ">
        Photo de Profil
      </label>
      <input type="file" name="image" accept='image/*' onChange={(e) => onChange(e.target.files[0])} className='w-full p-2 border rounded' />
    </div>
  )
}
