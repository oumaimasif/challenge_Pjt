import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';
import { MapPin } from 'lucide-react';
import CategoriesCard from '../components/formComponents/CategoriesCard';
import SearchBar from '../components/formComponents/SearchBar';


// import Notification from '../components/Notification';




// console.log("Composant Benevole chargé");

function Benevole() {
  const [benevoles, setBenevoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [search,setSearch] =useState('');


  // États pour la pagination
  const [limit] = useState(12) //nbr elements par page
  const [page, setPage] = useState(1);//current page
  const [totalPages, setTotalPages] = useState(1);

  // // Animation pour les cartes
  // const cardVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: (index) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: { delay: index * 0.2, duration: 0.4 },
  //   })
  // };
  useEffect(() => {
    const fetchBenevoles = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/benevoles?page=${page}&limit=${limit}&search=${search}`);
        console.log(response.data.dataBenevole);

        setBenevoles(response.data.dataBenevole || []);
        setTotalPages(response.data.totalPages);
        setLoading(false);

      } catch (error) {
        console.log("Erreur :", error);
        toast.error("Erreur lors du chargement des données. Veuillez réessayer.")
        setLoading(false);
      }
    };

    fetchBenevoles();

  }, [page, limit,search]);

  //changement des pages
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);

      window.scrollTo({ top: 1, behavior: 'smooth' })//remonter en haut de la page

    }
  }

  return (
    <div className="pt-24  bg-[#f7ece1] px-6  md:px-12  md:pt-26  min-h-screen">

      {/* <Notification/> */}

      <div className='bg-orange-400 p-4 rounded-2xl  my-6  md:text-xl '>
        <h1 className="text-2xl sm:text-3xl text-white font-bold mt-4 sm:mt-6 md:mt-8 mb-2 sm:mb-4 md:mb-6 text-start md:text-left">Bénévoles à l'honneur</h1>
        <p className="text-white text-base sm:text-lg text-start md:text-left">
          Découvrez nos <span className="font-bold text-lg sm:text-xl text-gray-800">Bénévoles</span> les plus actifs et engagés.
          Leurs compétences et leur disponibilité peuvent correspondre à vos besoins.
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-20 sm:mt-32 md:mt-40 lg:mt-52">
          <img src="/images/Spinner.svg" alt="Chargement..." className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40" />
        </div>
      ) : (
        <>
        <SearchBar search={search} setSearch={setSearch}/>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-5 ">
            {benevoles.length > 0 ? (
              benevoles.map((benevole, index) => (
                <div
                  key={benevole._id}
                  className="relative hover:scale-[1.01] bg-white space-y-2 sm:space-y-3 mb-4 sm:mb-5 border rounded-lg shadow-lg p-3 sm:p-4 flex flex-col justify-between"
                  // variants={cardVariants}
                  // initial="hidden"
                  // animate="visible"
                // custom={index}// affiche les cartes une apret l'autre
                // whileHover={{ scale: 1.03 }}//ci en hover sur la carte
                // whileTap={{ scale: 0.95 }}// si en click il n ouvre pas mais il fair un mouvement
                >
                  <div className=' '>
                    <div className='flex justify-between'>
                      <div className=''>
                        <img src={`http://localhost:5000/${benevole.image}`} alt={benevole.nom} className="rounded-full w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 border-4 border-purple-600 object-cover" />
                      </div>

                      <div>
                        <span className=' border-2 border-purple-500 p-1 font-semibold text-gray-600 bg-orange-100 text-[8px] sm:text-[10px] rounded-3xl'>
                          {benevole.annoncesCpt} annonce{benevole.annoncesCpt !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>

                    <div className=' space-x-2 '>
                      <h2 className="text-lg mt-2 sm:text-xl font-bold text-left text-gray-700">{benevole.nom || ''} {benevole.prenom || ''}</h2>
                      <div className='flex items-center gap-2 '>
                        <MapPin className='h-4 w-4 flex-shrink-0 text-orange-500' /> {benevole.ville && (<p className=" text-xs sm:text-sm">{benevole.ville}</p>)}
                      </div>
                    </div>

                    <div className=' mt-1 py-1 text-gray-700'>
                      {benevole.description && (
                        <p className="text-xs sm:text-sm line-clamp-2">
                          {benevole.description}
                        </p>
                      ) || 'Aucune description disponible.'}
                    </div>

                    <div className='pb-2'>
                      <CategoriesCard categories={benevole.categorie} />
                    </div>

                    <div className=" flex flex-wrap items-center gap-2 text-xs lg:text-xs">
                      {benevole.disponible && (
                        <span className="border border-orange-400 p-2 rounded-3xl ">{benevole.disponible}</span>
                      )}
                      {benevole.heure && (
                        <span className="border border-orange-400 p-2 rounded-3xl ">{benevole.heure}</span>
                      )}
                    </div>

                    <button
                      onClick={() => navigate(`/profileBenevole/${benevole._id}`)}
                      className="mt-2 hover:scale-[1.02] hover:border-orange-600 ease-in-out active:scale-[.98] active:duration-75 border-2 text-gray-900 font-semibold py-1 sm:py-2 px-3 sm:px-4 rounded-full w-full text-sm sm:text-base"
                    >
                      Voir le profil
                    </button>
                  </div>
                </div>

              ))
            ) : (
              <div className="col-span-full text-center py-6 sm:py-10">
                <p className="text-lg sm:text-xl text-gray-600">Aucun bénévole trouvé</p>
              </div>
            )}
          </div>
          {/* Pagination */}
          {benevoles.length > 0 &&
            (<Pagination page={page} totalPages={totalPages} onChangePage={changePage} />
            )}
        </>
      )}
    </div>
  );
}

export default Benevole;
