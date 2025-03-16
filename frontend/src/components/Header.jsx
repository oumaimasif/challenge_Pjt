import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu, MdClose } from "react-icons/md"; 

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white z-50 fixed w-full flex justify-around py-2 gap-8 items-center shadow-custom ">
            <Link to="/">
                <img src="/images/Noorwayslogo2.png" alt="NoorWays Logo" className="h-20" />
            </Link>

            <ul className="hidden md:flex space-x-9">
                <li className="relative group">
                    <Link to="/" className="text-gray-700 text-2xl font-semibold px-1 py-2 ">
                        Accueil
                        <span className="absolute -left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-50 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>
                    </Link>
                </li>
                {/* <li >
                    <Link to="/" className="text-gray-700 text-2xl font-semibold px-3  hover:py-2  hover:bg-[#db3de033] duration-300 rounded-lg">
                        Accueil
                    </Link>
                    <div className="border-b-4 w-7 border-yellow-200 "></div>
                </li> */}
                {/* <li>
                    <Link to="/" className="text-gray-700 text-2xl font-semibold px-3 py-2 hover:bg-[#db3de033] duration-300 rounded-lg">
                        Accueil
                    </Link>
                </li> */}
                <li className="relative group">
                    <Link to="/association" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">
                        Associations
                        <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

                    </Link>
                </li>
                <li className="relative group">
                    <Link to="/benevole" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">
                        Bénévoles
                        <span className="absolute left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

                    </Link>
                </li>
                <li className="relative group">
                    <Link to="/particulier" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">

                        Particuliers
                        <span className="absolute left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

                    </Link>
                </li>

            </ul>

            <div className="md:ml-4 hidden md:block">
                <Link to="/login" className="bg-purple-700 text-white px-4 py-2 text-xl font-bold rounded-full hover:bg-[#872078] duration-500">
                    Connexion
                </Link>
            </div>
            {/* Munu en responsive */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="md:hidden text-gray-700 text-3xl focus:outline-none"
            >
                {isOpen ? <MdClose /> : <MdMenu />}
            </button>

            {isOpen && (
                <div className="absolute top-24 left-0 w-full bg-[#872078] rounded-b-2xl shadow-md md:hidden z-40">
                    <ul className="flex flex-col space-y-4 p-4 ">
                        <li >
                            <Link to="/" className="block text-lg font-semibold py-2 text-white hover:text-[#f7932e]" onClick={() => setIsOpen(false)}>
                             Accueil
                            </Link>
                        </li>
                         <li>
                         <Link to="/associations" className="block text-lg font-semibold py-2 text-white hover:text-[#f7932e]"
                          onClick={() => setIsOpen(false)}> Associations
                          </Link>
                          </li>
                          <li>
                         <Link to="/benevole" className="block text-lg font-semibold py-2 text-white hover:text-[#f7932e]"
                          onClick={() => setIsOpen(false)}> Bénévoles
                          </Link>
                          </li>
                          <li>
                          <Link to="/particulier" className="block text-lg font-semibold py-2 text-white hover:text-[#f7932e]"
                          onClick={() => setIsOpen(false)}> Particuliers
                          </Link>
                          </li>

                        <li>
                            <Link to="/login" 
                                className="block text-center bg-[#18b710] text-white px-5 py-3 text-lg font-bold rounded-full hover:bg-green-500 duration-500"
                                onClick={() => setIsOpen(false)}>
                                Connexion
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Header;






// import React, { useState } from "react";
// import { Link } from "react-router-dom"; // pour la navigation
// import { MdMenu, MdClose } from "react-icons/md";
// import { motion, AnimatePresence } from "framer-motion";

// function Header() {
//     const [isOpen, setIsOpen] = useState(false);
//     return (
//         <nav className="bg-white fixed w-full flex justify-around py-2 gap-8 items-center shadow-custom ">
//             <Link to="/">
//                 <img src="/images/Noorwayslogo2.png" alt="NoorWays Logo" className="h-20" />
//             </Link>
//             {/* Menu de navigation */}
//             <ul className="hidden md:flex space-x-9">
//                 <li className="relative group">
//                     <Link to="/" className="text-gray-700 text-2xl font-semibold px-1 py-2 ">
//                         Accueil
//                         <span className="absolute -left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-50 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>
//                     </Link>
//                 </li>
//                 {/* <li >
//                     <Link to="/" className="text-gray-700 text-2xl font-semibold px-3  hover:py-2  hover:bg-[#db3de033] duration-300 rounded-lg">
//                         Accueil
//                     </Link>
//                     <div className="border-b-4 w-7 border-yellow-200 "></div>
//                 </li> */}
//                 {/* <li>
//                     <Link to="/" className="text-gray-700 text-2xl font-semibold px-3 py-2 hover:bg-[#db3de033] duration-300 rounded-lg">
//                         Accueil
//                     </Link>
//                 </li> */}
//                 <li className="relative group">
//                     <Link to="/association" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">
//                         Associations
//                         <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

//                     </Link>
//                 </li>
//                 <li className="relative group">
//                     <Link to="/benevole" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">
//                         Bénévoles
//                         <span className="absolute left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

//                     </Link>
//                 </li>
//                 <li className="relative group">
//                     <Link to="/particulier" className="text-gray-700 text-2xl font-semibold  py-2  duration-300 ">

//                         Particuliers
//                         <span className="absolute left-0 top-9 w-full h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left"></span>

//                     </Link>
//                 </li>

//             </ul>

//             <div className="md:ml-4 hidden md:block">
//                 <Link to="/login" className="bg-[#18b710] text-white px-4 py-3 text-2xl font-bold rounded-full hover:bg-green-500  duration-500">
//                     Connexion
//                 </Link>
//             </div>
//             {/* Menu Mobile */}
//             <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl focus:outline-none">
//                 {isOpen ? <MdClose /> : <MdMenu />}
//             </button>

//             {/* Sidebar section */}


//             <AnimatePresence>
//                 {isOpen && (
                   
//                    <>
//                     <motion.div
//                         initial={{ opacity: 0, y: -100 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0 }}
//                         transition={{ type: "spring", stiffness: 100 }}
//                         className="absolute top-24 left-0 w-full  h-screen z-20 bg-[#872078] p-6"
//                     >
//                         <ul className="flex flex-col justify-center  pl-10 gap-6">
//                             <li className="relative group" >
//                                 <Link to="/" className=" text-3xl text-white font-semibold block  " onClick={() => setTimeout(() => setIsOpen(false), 300)}
//                                 >
//                                     Accueil
//                                     <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e]  scale-x-0 group-hover:scale-x-100 transform duration-300 rounded-full origin-left"></span>
//                                 </Link>
//                             </li>
//                             <li className="relative group" >
//                                 <Link
//                                     to="/association"
//                                     className="text-3xl text-white font-semibold"
//                                     onClick={() => setIsOpen(false)}>
//                                     Associations
//                                     <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100  duration-500 rounded-full origin-left"></span>

//                                 </Link>
//                             </li>
//                             <li className="relative group" >
//                                 <Link
//                                     to="/benevole"
//                                     className="text-3xl text-white font-semibold"
//                                     onClick={() => setIsOpen(false)}>
//                                     Bénévoles
//                                     <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100  duration-500 rounded-full origin-left"></span>
//                                 </Link>
//                             </li>
//                             <li className="relative group" >
//                                 <Link
//                                     to="/particulier"
//                                     className="text-3xl text-white font-semibold"
//                                     onClick={() => setIsOpen(false)}>
//                                     Particuliers
//                                     <span className="absolute left-0 top-9 w-full  h-1 bg-[#f7932e] transform scale-x-0 group-hover:scale-x-100  duration-500 rounded-full origin-left"></span>
//                                 </Link>
//                             </li>
//                         </ul>
//                    </motion.div>
//                    <div> 
//                     <Link
//                         to="/login" className="bg-[#18b710] mt-5 block text-white px-4 py-3 text-2xl font-bold rounded-full hover:bg-green-500 duration-500"
//                         onClick={() => setIsOpen(false)}>
//                         Connexion
//                     </Link>
//                     </div>
//                    </>
//                 )}
//             </AnimatePresence>

//         </nav>
//     );
// }

// export default Header;