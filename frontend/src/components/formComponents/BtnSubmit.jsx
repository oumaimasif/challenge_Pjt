import { UserCheck, UserCheck2Icon } from 'lucide-react';
import React from 'react'

export default function BtnSubmit({ text,locationf }) {
    const typeForm= ()=>{
        switch(locationf){
            case "benevole":
                return "bg-blue-500 hover:bg-blue-600";
            case "association":
                return "bg-teal-600 hover:bg-green-600";
            case "particulier":
                return "bg-orange-500 hover:bg-orange-600"
        }
    }
    return (
        <>
         <button type="submit" className= {`w-full flex items-center justify-center gap-3 ${typeForm()} text-white py-3 rounded-lg transition duration-300`} >
         <UserCheck className='w-5 h-5'/>
         {text}
         </button>
        </>
    )
}
