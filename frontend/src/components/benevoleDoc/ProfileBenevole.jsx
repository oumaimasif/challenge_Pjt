import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


console.log("Partie Profile Benevole")
const ProfileBenevole = () => {

  const { id } = useParams();
  console.log("voila l'id :" ,id)
  const { profil, setProfil } = useState([]);
 
  useEffect(() => {
    const getInfo = async() => {
      const response= await axios.get(`http://localhost:5000/benevoles/profil/${id}`);
      console.log("le resultat APi :" ,response.data)
      
      setProfil(response.data)
    }
    getInfo();
  }, [])
  return (
    <div>


    </div>
  )
}

export default ProfileBenevole