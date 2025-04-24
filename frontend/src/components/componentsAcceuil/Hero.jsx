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
            path:"/formBenevole",

        },
        {
            titre: "Unissons nos forces pour avancer ensemble !",
            description: "| Développez votre association, gagnez en visibilité et attirez plus de bénévoles. Plus vous êtes visibles, plus vous impactez !",
            citation: "« L'union fait la force. » ",
            image: "/images/association.png",
            btn: "Inscrivez votre association !",
            theme :"bg-blue-500 shadow-blue-400 hover:bg-blue-600", 
            path:"/formAssociation",

        }, {
            titre: "Besoin d'aide ? Nous sommes là.",
            description: "| Trouvez du soutien auprès de notre communauté solidaire.",
            citation:"« Demander de l'aide, c'est faire le premier pas vers un avenir meilleur. »",
            image: "/images/give_help2.png",
            btn: "Demander de l'aide !",
            theme:"bg-[#fece0e]  shadow-yellow-400 hover:bg-[#f9c10b]",
            path:"/formParticulier",

        }

    ];

    return (
        <Swiper modules={[Navigation, Pagination, Autoplay]} navigation pagination={{ clickable: true }}
            autoplay={{ delay: 6000 }} loop={true} className={ ` lg:min-h-[500px] `}

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