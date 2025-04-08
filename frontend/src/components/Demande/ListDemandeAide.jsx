

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ArrowDownLeftSquareIcon, Send } from "lucide-react";
import MenuParticulier from "../MenuParticulier";

const ListDemandeAide = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/demandeAide")
      .then((res) => setDemandes(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>    
    <MenuParticulier/>
    <div className="py-24 px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-4">
      {demandes.map((demande) => (
        <div key={demande._id} className="border rounded-xl p-4 shadow">
          <img
            src={`http://localhost:5000/${demande.image}`}
            alt={demande.titre}
            className="w-full h-48 object-cover rounded-lg mb-2"
          />
          <h2 className="text-xl font-bold">{demande.titre}</h2>
          <p className="text-sm text-gray-600 mb-2">{demande.description}</p>



          {/* Infos du particulier */}
          <div className="mt-2 text-sm">
            <span className="font-medium">Demandeur:</span>{" "}
            {demande.particulierInfo?.prenom} {demande.particulierInfo?.nom} {" "}
            {demande.particulierInfo?.ville}
          </div>
          <div className=" my-3 flex gap-3 items-center justify-center">
            <div className="bg-orange-100 py-3 max-w-fit px-2 rounded-lg items-center justify-center  flex ">
              <Send className="mr-2 w-4 h-4" />
              {demande.particulierInfo?.email}
            </div>
            {/* Priorité */}
            <div className=" bg-orange-100 py-3 flex items-center   px-2 rounded-lg  ">
              <p className="text-gray-500">Priorité:</p>
              <p className={`font-medium ${demande.priorite === 'Urgent' ? 'text-red-600' :
                demande.priorite === 'Faible' ? 'text-green-600' :
                  'text-yellow-600'
                }`}>
                {demande.priorite}
              </p>
            </div></div>
        </div>

      ))}
    </div>
    </>

  );
};

export default ListDemandeAide;
