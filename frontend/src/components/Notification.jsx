import React from 'react'
import {AlertCircle, CheckCircle, X} from 'lucide-react';

export default function Notification({type, msg, onClose}) {
    if (!msg) return null;

    return (
    <>
     <div className={`mb-4 p-4 ${type==='Ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' } rounded-lg flex justify-between items-center `}>
      <div className='flex items-center '>
        {type ==="Ok" ? (
            <CheckCircle className=' w-5 h-5 mr-2'/>
        ): (
            <AlertCircle className='w-5 h-5 mr-2'/>
        )}

        <span>{msg}</span>
      </div>
      <button className={ type === 'Ok' ? 'text-green-800': 'text-red-800'} 
      onClick={onClose}>
         <X className='w-5 h-5'/>
      </button>
     </div>
    </>
  )
}
