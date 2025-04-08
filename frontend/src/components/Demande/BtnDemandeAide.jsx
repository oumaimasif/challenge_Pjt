import { HeartPulse, HelpCircle } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function BtnDemandeAide() {
    const navigate = useNavigate();
    const handleAdddemande = () => {
        navigate('/formDemandeAide');
    }
    return (
        <div className=' flex flex-col mr-12 items-center justify-center p-6 my-12 bg-gradient-to-b from-blue-50 to-white rounded-xl shadow-md'>
            <div className='text-centre mb-4'>
                <h2 className="mb-3 text-xl md:text-2xl font-bold text-orange-600 ">Bession d'un coup de main</h2>
                <p className='text-gray-600 mb-5 max-w-2xl mx-auto'>
                    Nous sommes là pour vous aider. Remplissez une demande d'aide et notre communauté
                    de bénévoles sera informée de votre besoin. Que ce soit pour une assistance ponctuelle
                    ou un soutien régulier, n'hésitez pas à nous solliciter.
                </p>
            </div>
             <button onClick={handleAdddemande}
             className='flex items-center justify-center px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white
             rounded-lg font-bold transition shadow-md  duration-300 transform hover:scale-105 '>
             <HelpCircle className='mr-2' />
             Faire une demande d'aide
             </button>
        </div>
    )
}
