import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import FormulaireBn from "./components/FormulaireBn";

const Hero = () => {
    const navformulaire = useNavigate();
    const handleclick = (path) => {
        navformulaire(path);
    }

    //la carousel 
    const slides = [
        {
            titre: "Engagez-vous pour faire la différence !",
            description: "| Faites une différence dans la vie des autres en proposant vos services.",
            citation: "« Celui qui fait vivre une âme, c'est comme s'il avait fait vivre l'humanité entière. » — Sourate Al-Maidah {32}.",
            image: "/images/donation.jpg",
            btn: "Rejoignez les bénévoles !",
            // bg:"bg-orange-100 ",
            theme:"bg-orange-500  shadow-orange-400 hover:bg-orange-600",
            path:"/formBenevol",

        },
        {
            titre: "Unissons nos forces pour avancer ensemble !",
            description: "| Développez votre association, gagnez en visibilité et attirez plus de bénévoles. Plus vous êtes visibles, plus vous impactez !",
            citation: "« L'union fait la force. » ",
            image: "/images/association.png",
            btn: "Inscrivez votre association !",
            theme :"bg-[#6b21a8] shadow-purpel-400 hover:bg-purpel-600", 
            path:"/formAssociation",

        }, {
            titre: "Besoin d'aide ? Nous sommes là.",
            description: "| Trouvez du soutien auprès de notre communauté solidaire.",
            citation:"« Demander de l'aide, c'est faire le premier pas vers un avenir meilleur. »",
            image: "/images/about-us.svg",
            btn: "Demander de l'aide !",
            theme:"bg-[#18b710]  shadow-bg-[#18b710] hover:bg-[#16a30e]",
            path:"/formPArticulier",

        }

    ];

    return (
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }} loop={true} className={`   lg:min-h-[500px] `}

        >

            {slides.map((slide, index) =>
            (
            <SwiperSlide key={index}>
                <div className=" md:h-svh text-center md:text-left flex justify-center items-center  py-24 px-8">
                    <div className=" grid md:grid-cols-2 max-w-7xl  ">
                        
                        <div className='w-[600] my-auto  h-[600]'>
                            <h3 className="mt-4 font-mono text-zinc-800 text-3xl lg:text-6xl px-2 uppercase font-semibold" > {slide.titre}</h3>
                            <p className="mt-2 text-gray-700 px-2">{slide.description}</p>
                            <p className="mt-4 text-lg italic px-2">{slide.citation}</p>
                            <button className={`${slide.theme} mx-8 mt-6 text-xl font-bold drop-shadow-md hover:shadow-lg  text-white px-2.5 py-2 rounded-full duration-300 `} onClick={()=>{handleclick(slide.path)}}>
                                {slide.btn}
                                {/* formulaire d'inscription */}
                            </button>
                        </div>
                        <div className=''>
                            <img src={slide.image} alt={slide.titre}  className="transform hover:rotate-2 transition  ease-in-out hover:scale-100 w-full h-[80%] mt-9" />
                        </div>
                    </div>

                </div>

            </SwiperSlide>
            ))
        }

        </Swiper>
    );
}

export default Hero;



















// {/* <section className="h-svh ">
//             {/* <div className=" bg-gradient-to-r from-purple-500 via-purple-700 to-purple-900 text-white flex flex-col justify-center items-center text-center py-20">
//                 <h1 className="text-4xlfont-bold mb-6"> Faites une différence avec NoorWays</h1>
//                 <p className="text-lg  mb-10">Engagez-vous pour aider, soutenir et changer des vies !</p>
//             </div> */}

// <div className="flex justify-center items-center py-20 px-4 bg-gray-100">
//     <div className="w-full sm:w-1/3 p-4">
//         <img src="pixelcut-export.jpg" alt="Bénévolat" />
//         <h3 className="mt-4 text-xl font-semibold">Bénévoles : Aidez les autres</h3>
//         <p className="mt-2 text-gray-700">Faites une différence dans la vie des autres en proposant vos services.</p>
//         <p className="mt-4 text-lg italic">"Celui qui fait vivre une âme, c'est comme s'il avait fait vivre l'humanité entière." — Coran</p>
//         <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
//             Devenez bénévole !
//             {/* formulaire d'inscription */}
//         </button>
//     </div>
// </div>

// {/* Section Associations */ }
// {/* <div className="flex justify-center items-center py-20 px-4 bg-gray-200">
//                 <div className="w-full  p-4">
//                     <img src="" alt="Association"  />
//                     <h3 className="mt-4 text-xl font-semibold">Associations : Unissez vos forces</h3>
//                     <p className="mt-2 text-gray-700">Travaillez avec des bénévoles pour créer un impact durable.</p>
//                     <p className="mt-4 text-lg italic">"L'union fait la force." — Citation mondiale</p>
//                     <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
//                         Rejoindre une association !
//                     </button>
//                 </div>
//             </div> */}

// {/* Section Particuliers */ }
// {/* <div className="flex justify-center items-center py-20 px-4 bg-gray-300">
//                 <div className="w-full sm:w-1/3 p-4">
//                     <img src="path_to_individual_image.jpg" alt="Particuliers" className="w-full h-60 object-cover rounded-md" />
//                     <h3 className="mt-4 text-xl font-semibold">Particuliers : Demandez de l'aide</h3>
//                     <p className="mt-2 text-gray-700">Vous avez besoin d'aide ? Nous sommes là pour vous soutenir.</p>
//                     <p className="mt-4 text-lg italic">"Aider quelqu'un aujourd'hui, c'est bâtir un monde meilleur pour demain." — Citation motivante</p>
//                     <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
//                         Demander de l'aide !
//                     </button>
//                 </div>
//             </div> 
//         </section> */}

//                     {/* <div className="flex justify-center items-center py-20  px-4 ">
//                 <div className="grid md:grid-cols-2 p-4">
//                     <div>
//                         <h3 className="mt-4 text-xl font-semibold">Engagez-vous pour faire la différence !</h3>
//                         <p className="mt-2 text-gray-700">| Faites une différence dans la vie des autres en proposant vos services.</p>
//                         <p className="mt-4 text-lg italic">"Celui qui fait vivre une âme, c'est comme s'il avait fait vivre l'humanité entière." — Coran</p>
//                         <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 duration-300" onClick={handleclick}>
//                             Devenez bénévole !
//                             {/* formulaire d'inscription 
//                         </button>
//                     </div>
//                     <div >
//                         <img src="/images/donate.jpg" alt="Bénévolat" />
//                     </div>
//                 </div>
//             </div> */}

//             {/* Section Associations */}
//             {/* <div className="flex justify-center items-center py-20 px-4 bg-gray-200">
//                 <div className="w-full  p-4">
//                     <img src="" alt="Association"  />
//                     <h3 className="mt-4 text-xl font-semibold">Associations : Unissez vos forces</h3>
//                     <p className="mt-2 text-gray-700">Travaillez avec des bénévoles pour créer un impact durable.</p>
//                     <p className="mt-4 text-lg italic">"L'union fait la force." — Citation mondiale</p>
//                     <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
//                         Rejoindre une association !
//                     </button>
//                 </div>
//             </div> */}