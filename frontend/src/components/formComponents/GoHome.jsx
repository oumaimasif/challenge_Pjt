import React, { useState } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function GoHome() {
    const [showTooltip, setTooltip] = useState(false);
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate('/');
    }
    return (
        <div className='fixed bottom-9 left-9 z-50'>
            <button onClick={handleRedirect} onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)}
                className='bg-yellow-300  hover:bg-yellow-500  text-white p-3 rounded-full shadow-lg transition-all duration-30 flex items-centre justify-center  duration-200'
                aria-label='Retour au site'>
                <ArrowLeftIcon className='' />
            </button>
            {
                showTooltip && (
                    <div className='absolute text-center w-36  bg-gray-900 font-semibold bg-opacity-60 py-1 rounded bottom-full transition-all duration-300 mb-2 -left-6'> Retour au site </div>
                )
            }
        </div>
    )
}

/*
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Btnflech() {

}


*/