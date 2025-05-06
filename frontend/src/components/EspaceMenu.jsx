import React, { useContext, useEffect, useRef, useState } from 'react'
import { Auth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
Auth

export default function EspaceMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useContext(Auth);
    const navigate = useNavigate();
    const menuRef = useRef(null);//fermer dehors

    useEffect(() => {
        const clickout = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", clickout);
        return () => {
            document.removeEventListener("mousedown", clickout)
        }
    }, [])

    const goToYourEspece = () => {
        if (!user || !user.role) return;
        console.log("user ", user._id)
        const userId = user.id || user._id;
        if (user.role === "admin") {
            navigate("/adminDashboard");
        } else if (user.role === "association") {
            navigate(`/association/${userId}`);
        } else if (user.role === "benevole") {
            navigate(`/profileBenevole/${userId}`);
        } else if (user.role === "particulier") {
            navigate(`/particulier/${userId}`);
        }

        setIsOpen(false);
    }

    const Logout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    }
    if (!user) {
        return null;
    }

    return (
        <div className='relative ' ref={menuRef}>
            <button onClick={() => setIsOpen(!isOpen)} className='flex items-center space-x-2 bg-purple-600 py-2 px-4 text-white rounded-lg hover:bg-purple-700 transition duration-300' >

                <User size={18} />
                <span>{user.nom || 'Mon compte'}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <button
                        onClick={goToYourEspece}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Mon espace
                    </button>
                    <button
                        onClick={Logout}
                        className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 "
                    >
                        <LogOut size={16} className="mr-2" />
                        Déconnecter
                    </button>
                </div>
            )}

        </div>
    )
}
