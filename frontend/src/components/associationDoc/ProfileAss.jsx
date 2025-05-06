

import React, { useEffect, useState, useContext } from 'react';
import { Link, Outlet, useParams, useNavigate } from 'react-router-dom';
// import AssociationCard from './AssociationCard';
import CarteAssociation from './CarteAssociation';
import axios from 'axios';
import { Auth } from '../../context/Auth';

const ProfileAss = () => {

  const { id } = useParams();
  const [profil, setProfile] = useState({});
  const navigate = useNavigate();
  const { user } = useContext(Auth);


  //verifier si user connecté est propriétaire de cette association ou ps
  const isOwner = user && user.role === "association" && user.id === id;

  useEffect(() => {
    const getInfo = async () => {
      try {
        const responce = await axios.get(`http://localhost:5000/associations/association/${id}`)
        setProfile(responce.data)
      } catch (error) {
        console.error("Erreur lors de la récupération de profil: ", error);
      }
    }
    getInfo();
  }, [id])

  const handleGestion = () => {
    navigate(`/association/${id}/gestion`)
  }
  return (

    <div className='pt-24 min-h-screen '>
      <div>
        {/* navigation  */}
        <div className=''>
          <div className=' top-10 h-40 md:w-10/12 w-full bg-gradient-to-r from-orange-200 to-blue-300  flex flex-col  mb-6 justify-center items-center  shadow-md relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>

            <nav className=' flex flex-wrap justify-center items-center gap-y-2 md:gap-4'>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-2 py-1  md:p-2" to=""> Profile </Link>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-2 py-1  md:p-2" to="annonces"> Annonces </Link>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-3 py-1  md:p-2" to="recomendation"> Recommandations </Link>
              {isOwner && (
                      <button onClick={handleGestion}
                      className='md:text-xl text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-3 py-1  md:p-2'>
                       Gérer mon association
                      </button>
                     )}
            </nav>

          </div>

          <div className='md:flex md:items-start  gap-8 ml-6 pb-8 md:ml-44'>
            <CarteAssociation profil={profil} className="self-center" />
            <Outlet context={{ profil }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAss;








// import React, { useEffect, useState ,useContext} from 'react';
// import { Link, Outlet, useParams,useNavigate } from 'react-router-dom';
// // import AssociationCard from './AssociationCard';
// import CarteAssociation from './CarteAssociation';
// import axios from 'axios';
// import { Auth } from '../../context/Auth';

// // import {DateString} from '../dateAgeFormat';




// const ProfileAss = () => {

//   const { id } = useParams();
//   const [profil, setProfile] = useState({});
//   const navigate = useNavigate();
//   const {user} = useContext(Auth);




//   useEffect(() => {
//     const getInfo = async () => {
//       try {
//         const responce = await axios.get(`http://localhost:5000/associations/association/${id}`)
//         setProfile(responce.data)
//       } catch (error) {
//         console.error("Erreur lors de la récupération de profil: ", error);
//       }
//     }
//     getInfo();
//   }, [id])


//   return (

//     <div className='pt-24 min-h-screen '>
//       <div>
//         {/* navigation  */}
//         <div className=''>
//           <div className=' top-10 h-40 md:w-10/12 w-full bg-gradient-to-r from-orange-200 to-blue-300  flex flex-col  mb-6 justify-center items-center  shadow-md relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>

//             <nav className=' flex flex-wrap justify-center items-center gap-y-2 md:gap-4'>
//               <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-2 py-1  md:p-2" to=""> Profile </Link>
//               <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-2 py-1  md:p-2" to="annonces"> Annonces </Link>
//               <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-blue-600 px-3 py-1  md:p-2" to="recomendation"> Recommandations </Link>
//             </nav>

//           </div>

//           <div className='md:flex md:items-start  gap-8 ml-6 pb-8 md:ml-44'>
//             <CarteAssociation profil={profil} className="self-center" />
//             <Outlet context={{ profil }} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileAss;