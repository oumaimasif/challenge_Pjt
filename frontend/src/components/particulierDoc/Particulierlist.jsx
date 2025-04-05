import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ParticulierCard from './ParticulierCard';

export default function Particulierlist() {
    const [particuliers, setParticulier] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:5000/particuliers")
            console.log("listes des particuliers", result.data);
            setParticulier(result.data);
        }
        fetchData();
    }, [])
    return (
        <div>

            {particuliers && particuliers.map((particulier)=>
               <ParticulierCard key={particulier._id} particulier={particulier}/>
            )

            }
        </div>
    )
}
