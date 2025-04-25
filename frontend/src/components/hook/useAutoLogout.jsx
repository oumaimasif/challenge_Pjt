import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import isTokenValide from '../../components/isTokenValide';
import { toast } from 'react-toastify';


export default function useAutologout() {
    const nevigate = useNavigate();
    
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            const wasLoggedIn =localStorage.getItem('wasLoggedIn')
           
            //verifier si user a un token invalide et etait précedement connecté
            if (token && !isTokenValide(token) && wasLoggedIn==="true" ) {
                localStorage.removeItem('token');
                
                // toast.error("Votre session a expiré, veuillez vous reconnecter.")
                    nevigate('/login?expired=true')//! **
            }
        }, 3000)//verifie tt les 3sc
        return () => clearInterval(interval);
    }, [nevigate])
    // return {sessionExpired}

}
    
//! ** Transmettez l'information d'expiration de session via l'URL lors de la redirection (query parameters)
