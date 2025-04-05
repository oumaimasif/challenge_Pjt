import React from 'react'

export default function ParticulierCard({ particulier }) {
    return (
        <div className='grid grid-rows-3 border-2 w-64 h-96 '>
            <div className='flex flex-col '>
                <h1>Nom : {particulier.nom}</h1>
                <span>Prenom : {particulier.prenom}</span>
                <span>Email : {particulier.email}</span>
                <span>description : {particulier.email}</span>
            </div>
        </div>
    )
}
