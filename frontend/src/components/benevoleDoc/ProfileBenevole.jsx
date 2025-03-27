import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Outlet, Link } from 'react-router-dom';
import CarteProfil from './CarteProfil';



console.log("Partie Profile Benevole")
const ProfileBenevole = () => {

  const { id } = useParams();
  console.log("voila l'id :", id)
  const [profil, setProfil] = useState([]);
  //afficher la zone 


  useEffect(() => {
    const getInfo = async () => {
      const response = await axios.get(`http://localhost:5000/benevoles/profileBenevole/${id}`);
      console.log("le resultat APi :", response.data)

      setProfil(response.data)
    }
    getInfo();
  }, [id]) //!fixer les 4 fois afficher

  return (
    <div className='bg-purple-100'>
      <div className='pt-24 m-auto min-h-screen'>
        <div>

          {/* *******!fixe Profile par defaut *********/}
          {/* navigation  */}
          <div className='w-full'>
            <div className=' top-10 h-40 md:w-10/12 w-full bg-gradient-to-r from-orange-200 to-purple-300  flex flex-col  mb-6 justify-center items-center  shadow-md relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>
              <nav className=' flex flex-wrap justify-center items-center gap-y-2 md:gap-4'>
                <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-2 py-1  md:p-2" to=""> Profile </Link>
                <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-2 py-1  md:p-2" to={`annonces`}> Annonces </Link>
                <Link className="md:text-xl  text-lg md:mx-4 mx-3  bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 px-3 py-1  md:p-2" to={`recomendation`}> Recommandations </Link>
              </nav>

            </div>
            
            {/* contenu principale */}
            <div className='md:flex md:items-start gap-8 ml-6 pb-8 md:ml-44'>
              <CarteProfil profil={profil} className="self-center " />
              <Outlet context={{ profil }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileBenevole

