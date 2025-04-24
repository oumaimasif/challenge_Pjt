import { UserCheck, UserCheck2Icon } from 'lucide-react';
import React from 'react'

export default function BtnSubmit({ text,locationf }) {
    const typeForm= ()=>{
        switch(locationf){
            case "benevole":
                return "bg-orange-500 hover:bg-orange-600";
            case "association":
                return "bg-blue-600 hover:bg-blue-600";
            case "particulier":
                return "bg-[#fece0e]  hover:bg-[#f9c10b]"
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
