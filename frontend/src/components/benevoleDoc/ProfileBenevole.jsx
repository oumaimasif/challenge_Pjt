import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MapPinned, Briefcase, UserRoundCheck, Clock3, CalendarHeart, MessageSquare } from "lucide-react"
import { useParams, Outlet, Link } from 'react-router-dom';
import CarteProfil from './CarteProfil';
import InfoProfile from './InfoProfile';


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
    <div className='pt-32  min-h-screen'>
      <div className='m-auto  mb-32'>

        {/* *******!fixe Profile par defaut *********/}
        <div className='flex flex-col  '>
          <div className=' h-40 w-10/12  bg-gradient-to-r from-orange-200 to-purple-300  flex flex-col  mb-6 justify-center items-center  shadow-md relative rounded-br-[40px] rounded-tl-[40px] mx-auto'>
            <nav className=''>
              <Link className="text-xl mx-4 bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg text-orange-600 p-2" to=""> Profile </Link>
              <Link className="text-xl mx-4 bg-white rounded-lg translate-x-3 duration-300 hover:shadow-lg  text-orange-600 p-2" to={`annonces`}> Annonces </Link>
              <Link className="text-xl mx-4 bg-white  rounded-lg translate-x-3 duration-300 hover:shadow-lg  text-orange-600 p-2" to={`recomendation`}> Recommandations </Link>
            </nav>

          </div>

          <div className=' flex gap-20  ml-44'>
            <CarteProfil profil={profil} />
            <Outlet  context={{profil}}/>

          </div>


        </div>



      </div>


    </div>
  )
}

export default ProfileBenevole
