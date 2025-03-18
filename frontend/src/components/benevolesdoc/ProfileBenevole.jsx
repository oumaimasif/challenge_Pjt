import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


console.log("Partie Profile Benevole")
const ProfileBenevole = () => {

  const { id } = useParams();
  console.log("voila l'id :" ,id)
  const { profile, setProfile } = useState([]);
 
  useEffect(() => {
    const getInfo = async() => {
      const response= await axios.get(`http://localhost:5000/benevoles/${id}`);
      console.log("le resultat APi :" ,response.data)

      setProfile(response.data)
    }
    getInfo();
  }, [])
  return (
    <div>
     <p>helooooooooooooooooooooooooooooo</p>
     <p>helooooooooooooooooooooooooooooo</p>
     <p>helooooooooooooooooooooooooooooo</p>
     <p>helooooooooooooooooooooooooooooo</p>
     <p>heloooooooooooo{id}ooooooooooooooooo</p>

    </div>
  )
}

export default ProfileBenevole