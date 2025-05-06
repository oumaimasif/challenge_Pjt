import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";
import { Auth } from "../context/Auth";
import EspaceMenu from "./EspaceMenu";


function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { user } = useContext(Auth);
    return (
        <>
            <nav className="bg-white z-50 fixed w-full  -top-0.5 py-6 flex gap-6 lg:gap-12 justify-center  items-center shadow-custom ">
                {/* //!responcive logo et btn connexion */}
                <Link to="/" >
                    <img src="/images/logorange.png" alt="NoorWays Logo" className="hidden  md:block lg:w-52 md:w-40 sm:hidden w-32 ml-5 " />
                </Link>

                {/* Menu Prinsipale */}
                <ul className="hidden md:flex space-x-4 lg:space-x-9">
                    <li className="relative group">
                        <Link to="/" className={`text-sm lg:text-xl font-semibold  py-2 ${location.pathname === "/" ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
                            Accueil
                            <span className={`absolute left-0 top-6 lg:top-9 w-full  h-1 bg-[#f7932e] transition-transform duration-200 rounded-full origin-left ${location.pathname === "/" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>


                        </Link>
                    </li>

                    <li className="relative group">
                        <Link to="/associations" className={`text-sm lg:text-xl font-semibold  py-2 ${location.pathname.includes("/associations") || location.pathname.includes("/association/")
                            ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
                            Associations
                            <span className={`absolute left-0 top-6 lg:top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname.includes("/associations") || location.pathname.includes("/association/")
                                    ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>
                        </Link>
                    </li>

                    <li className="relative group">
                        <Link to="/benevoles" className={`text-sm lg:text-xl font-semibold  py-2 ${location.pathname.includes("/benevoles") || location.pathname.includes("/profileBenevole/") ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
                            Bénévoles
                            <span className={`absolute left-0 top-6 lg:top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname.includes("/benevoles") || location.pathname.includes("/profileBenevole/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                        </Link>
                    </li >

                    <li className="relative group">
                        <Link to="/particuliers" className={`text-sm lg:text-xl font-semibold  py-2 ${location.pathname === "/particuliers" || location.pathname.includes("/demandeAide") || location.pathname.includes("/particulier/") ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
                            Particuliers
                            <span className={`absolute left-0 top-6 lg:top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname === "/particuliers" || location.pathname.includes("/demandeAide") || location.pathname.includes("/particulier/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                        </Link>
                    </li >

                    <li className="relative group">
                        <Link to="/annonces" className={`text-sm lg:text-xl font-semibold  py-2 ${location.pathname === "/annonces" || location.pathname.includes("/annonceDetail/") ? "text-purple-700" : "text-gray-700 hover:text-purple-700"}`}>
                            Annonces
                            <span className={`absolute left-0 top-6 lg:top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname === "/annonces" || location.pathname.includes("/annonceDetail/")
                                    ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>
                        </Link>
                    </li >

                </ul >
                <div className=" hidden md:block">
                    {
                        user ? (
                            <EspaceMenu />
                        ) : (
                            <Link to="/login" className="bg-purple-700 text-white px-2 py-2 lg:px-4 text-sm lg:text-xl font-bold rounded-full hover:bg-[#841f75] duration-500">
                                Connexion
                            </Link>
                        )
                    }
                </div>


                <div className=" py-2 ">
                    <Link to="/" >
                        <img src="/images/minilogorange.png" alt="NoorWays Logo" className=" w-8 h-8  md:hidden absolute left-6 top-4 " />
                    </Link>
                    {/* btn icone menu mobile */}
                    <div className="absolute top-3 right-3 ">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden   text-gray-700 text-3xl  focus:outline-none"
                        >
                            {isOpen ? (
                                <MdClose className="h-8 w-8 text-purple-700" />
                            ) : (
                                <MdMenu className="h-8 w-8 text-purple-700" />
                            )}
                        </button>
                    </div>

                    {/*menu responsive */}

                    {
                        isOpen && (
                            <div className="absolute w-4/5 mt-6 top-10 bg-opacity-95 sm:top-[40px] right-0  bg-white rounded-b-2xl shadow-lg md:hidden z-40">

                                <ul className="flex flex-col p-4 ">
                                    <li className="border-b border-purple-500 pb-2">
                                        <Link to="/" className={`block text-lg font-semibold py-2 ${location.pathname === "/" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`} onClick={() => setIsOpen(false)}>
                                            Accueil
                                        </Link>
                                    </li>
                                    <li className="border-b  border-purple-500 py-2">
                                        <Link to="/associations" className={`block text-lg font-semibold py-2 ${location.pathname === "/associations" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                            onClick={() => setIsOpen(false)}> Associations
                                        </Link>
                                    </li>
                                    <li className="border-b border-purple-500 py-2">
                                        <Link to="/benevoles" className={`block text-lg font-semibold py-2 ${location.pathname === "/benevoles" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                            onClick={() => setIsOpen(false)}> Bénévoles
                                        </Link>
                                    </li>
                                    <li className="border-b border-purple-500 py-2">
                                        <Link to="/particuliers" className={`block text-lg font-semibold py-2 ${location.pathname === "/particuliers" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                            onClick={() => setIsOpen(false)}> Particuliers
                                        </Link>
                                    </li>

                                    <li className="border-b border-purple-500 py-2">
                                        <Link to="/annonces" className={`block text-lg font-semibold py-2 ${location.pathname === "/annonces" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                            onClick={() => setIsOpen(false)}> Annonces
                                        </Link>
                                    </li>
                                    <li className=" p-6 border-t ">
                                        {
                                            user ? (
                                                <div className="space-y-2">
                                                    <button className="bg-purple-700 text-center text-white px-4 py-3 text-lg font-bold rounded-full hover:bg-[#872078] transition-colors duration-300 shadow-md"
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            const { role } = user;
                                                            if (role === "admin") navigate('/adminDashboard')
                                                            else if (role === "association") navigate(`/association/${user._id}`)
                                                            else if (role === "benevole") navigate(`/profileBenevole/${user._id}`);
                                                            else if (role === 'particulier') navigate(`/particulier/${user._id}`);
                                                        }}>

                                                        Mon espace
                                                    </button>
                                                    <button onClick={() => {
                                                        logout();
                                                        navigate('/');
                                                        setIsOpen(false)
                                                    }} className="block w-full bg-gray-200 text-centre text-purple-700 px-4 py-3 text-lg font-bold rounded-full hover:bg-gray-300 transition-colors duration-300 shadow-md">
                                                        Déconnexion
                                                    </button>

                                                </div>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="block w-full bg-purple-700 text-center text-white px-4 py-3 text-lg font-bold rounded-full hover:bg-[#872078] transition-colors duration-300 shadow-md"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    Connexion
                                                </Link>
                                            )
                                        }

                                    </li>
                                </ul>
                            </div>
                        )
                    }
                </div>
            </nav >

        </>
    )
}
export default Header;