import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react'
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import CarteProfil from './CarteProfil';
import { Auth } from '../../context/Auth';


console.log("Partie Profile Benevole")
const ProfileBenevole = () => {

  const { id } = useParams();
  console.log("voila l'id :", id)
  const [profil, setProfil] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(Auth);

  //verifier si user connecté est propriétaire de cette association ou ps
  const isOwner = user && user.role === "benevole" && user.id === id;

  //afficher la zone 
  useEffect(() => {
    const getInfo = async () => {
      const response = await axios.get(`http://localhost:5000/benevoles/profileBenevole/${id}`);
      console.log("le resultat APi :", response.data)

      setProfil(response.data)
    }
    getInfo();
  }, [id]) //!fixer les 4 fois afficher

  const handleGestion = () => {
    navigate(`/profileBenevole/${id}/gestion`)
  }

  return (
    <div className='pt-24  min-h-screen'>
      <div>

        {/* *******!fixe Profile par defaut *********/}
        {/* navigation  */}
        <div className=''>
          <div className=' top-10 h-40 md:w-10/12 w-full bg-gradient-to-r from-orange-200 to-purple-300  flex flex-col  mb-6 justify-center items-center  shadow-md relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>
            <nav className=' flex flex-wrap justify-center items-center gap-y-2 md:gap-4'>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-2 py-1  md:p-2" to=""> Profile </Link>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-2 py-1  md:p-2" to="annonces"> Annonces </Link>
              <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-3 py-1  md:p-2" to="recomendation"> Recommandations </Link>
              {/* cette btn s'affiche selon le proprieter connecter  */}
              {isOwner && (
                      <button onClick={handleGestion}
                      className='md:text-xl text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-3 py-1  md:p-2'>
                       Gérer mon association
                      </button>
                     )}
            </nav>

          </div>

          {/* contenu principale */}
          <div className='flex justify-center items-start flex-wrap gap-6 pb-8 '>
            <CarteProfil profil={profil} />
            <Outlet context={{ profil }} />
          </div>

        </div>
      </div>
    </div>

  )
}

export default ProfileBenevole

