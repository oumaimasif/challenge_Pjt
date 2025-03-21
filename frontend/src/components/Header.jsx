import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <nav className="bg-white z-50 fixed w-full flex justify-around py-6 gap-8 items-center shadow-custom ">
            <Link to="/">
                <img src="/images/logorange.png" alt="NoorWays Logo" className="w-52" />
            </Link>

            {/* Menu Prinsipale */}
            <ul className="hidden md:flex space-x-4 lg:space-x-9">
                <li className="relative group">
                    <Link to="/" className={`text-xl lg:text-2xl font-semibold px-1 py-2 ${location.pathname === "/" ? "text-purple-700" : "text-gray-700 hover-text-purple-700"}`}>
                        Accueil
                        <span className={`absolute -left-0 top-9 w-full  h-1 bg-[#f7932e] transition-transform duration-200 rounded-full origin-left ${location.pathname === "/" ? "scale-x-100" : "scale-x-50 group-hover:scale-x-100"} `}></span>


                    </Link>
                </li>

                <li className="relative group">
                    <Link to="/association" className={`text-xl lg:text-2xl font-semibold  py-2 ${location.pathname === "/association" ? "text-purple-700" : "text-gray-700 hover-text-purple-700"}`}>
                        Association
                        <span className={`absolute left-0 top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname === "/association" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                    </Link>
                </li>

                <li className="relative group">
                    <Link to="/benevole" className={`text-xl lg:text-2xl font-semibold  py-2 ${ location.pathname.includes("/benevole") || location.pathname.includes("/profileBenevole/") ? "text-purple-700" : "text-gray-700 hover-text-purple-700"}`}>
                        Bénévoles
                        <span className={`absolute left-0 top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname.includes("/benevole") || location.pathname.includes("/profileBenevole/") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                    </Link>
                </li >

                <li className="relative group">
                    <Link to="/particulier" className={`text-xl lg:text-2xl font-semibold  py-2 ${location.pathname === "/particulier" ? "text-purple-700" : "text-gray-700 hover-text-purple-700"}`}>
                        Particuliers
                        <span className={`absolute left-0 top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname === "/particulier" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                    </Link>
                </li >

                <li className="relative group">
                    <Link to="/annonces" className={`text-xl lg:text-2xl font-semibold  py-2 ${location.pathname === "/annonces" ? "text-purple-700" : "text-gray-700 hover-text-purple-700"}`}>
                        Annonces
                        <span className={`absolute left-0 top-9 w-full  h-1 bg-[#f7932e] 
                          transition-transform duration-200 rounded-full origin-left
                          ${location.pathname === "/annonces" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"} `}></span>

                    </Link>
                </li >

            </ul >


            <div className="md:ml-4 hidden md:block">
                <Link to="/login" className="bg-purple-700 text-white px-4 py-2 text-xl font-bold rounded-full hover:bg-[#872078] duration-500">
                    Connexion
                </Link>
            </div>


          <div>
              {/* btn icone menu de mobile */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden absolute top-5 right-5 z-50 text-gray-700 text-3xl focus:outline-none"
            >
{isOpen ? (
                        <MdClose className="h-8 w-8 text-purple-700" />
                    ) : (
                        <MdMenu className="h-8 w-8" />
                    )}            </button>

            {/*menu responsive */}

            {
                isOpen && (
                    <div className="absolute w-4/5 top-1 pt-2 -mt-1 sm:top-24 right-0  h-svh bg-white rounded-b-2xl shadow-lg md:hidden z-40">
                                  
                        <ul className="flex flex-col p-4 ">
                            <li className="border-b border-purple-500 py-2">
                                <Link to="/" className={`block text-lg font-semibold py-2 ${location.pathname === "/" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`} onClick={() => setIsOpen(false)}>
                                    Accueil
                                </Link>
                            </li>
                            <li className="border-b border-purple-500 py-2">
                                <Link to="/associations" className={`block text-lg font-semibold py-2 ${location.pathname === "/associations" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                    onClick={() => setIsOpen(false)}> Associations
                                </Link>
                            </li>
                            <li className="border-b border-purple-500 py-2">
                                <Link to="/benevole" className={`block text-lg font-semibold py-2 ${location.pathname === "/benevole" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                    onClick={() => setIsOpen(false)}> Bénévoles
                                </Link>
                            </li>
                            <li className="border-b border-purple-500 py-2">
                                <Link to="/particulier" className={`block text-lg font-semibold py-2 ${location.pathname === "/particulier" ? "text-[#f7932e]" : "text-purple-700 hover:text-[#f7932e]"}`}
                                    onClick={() => setIsOpen(false)}> Particuliers
                                </Link>
                            </li>

                            {/* //! Annonce partie */}

                            <li className=" p-6 border-t ">
                            <Link 
                                to="/login"
                                className="block w-full bg-purple-700 text-center text-white px-4 py-3 text-lg font-bold rounded-full hover:bg-[#872078] transition-colors duration-300 shadow-md"
                                onClick={() => setIsOpen(false)}
                            >
                                Connexion
                            </Link>
                            </li>
                        </ul>
                    </div>
                )
            }
          </div>
        </nav >
    )
}

export default Header;

