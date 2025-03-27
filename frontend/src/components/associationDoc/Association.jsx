// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams, Routes, Route, Link } from "react-router-dom";

// export default function Association() {
//   const { id } = useParams();
//   const [association, setAssociation] = useState(null);

//   useEffect(() => {
//     const fetchdata = async()=>{
//       const res= await axios.get(`http://localhost:5000/associations/association/${id} `)
//     console.log("les information d'association",res.data )
//     setAssociation(res.data)
//     }
//     fetchdata();
   
//   }, [id]);

//   return (
//     <>
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">{association.nom}</h1>
//       <p>{association.description}</p>

//       {/* Menu */}
//       <nav className="flex space-x-4 mt-4">
//         <Link to="" className="text-blue-500">Profil</Link>
//         <Link to="annonces" className="text-blue-500">Annonces</Link>
//         <Link to="commentaires" className="text-blue-500">Commentaires</Link>
//       </nav>

//       {/* Routes imbriquées */}
//       <Routes>
//         <Route path="" element={<p>{association.description}</p>} />
//         <Route path="annonces" element={<p>Liste des annonces</p>} />
//         <Route path="commentaires" element={<p>Liste des commentaires</p>} />
//       </Routes>
//     </div>
    
//     </>
//   )
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { MapIcon, ChevronLeftIcon } from "lucide-react";
import ProfileAss from "../associationDoc/ProfileAss";
import AnnonceAssociation from "../associationDoc/AnnonceAssociation";
import ContactAss from "../associationDoc/ContactAss";

export default function Association() {
  const { id } = useParams();
  const [association, setAssociation] = useState(null);
  const [activeSection, setActiveSection] = useState('profil');

  useEffect(() => {
    const fetchAssociationDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/associations/association/${id}`);
        setAssociation(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des détails de l'association", error);
      }
    };

    fetchAssociationDetails();
  }, [id]);

  if (!association) {
    return <div className="p-6 text-center">Association non trouvée</div>;
  }

  const renderContent = () => {
    switch(activeSection) {
      case 'profil':
        return <ProfileAss association={association} />;
      case 'missions':
        return <AnnonceAssociation association={association} />;
      case 'contact':
        return <ContactAss association={association} />;
      default:
        return null;
    }
  };

  return (
    // <div className="flex justify-center items-center min-h-screen">
    //     <img 
    //       src="/images/Spinner.svg" 
    //       alt="Chargement..." 
    //       className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
    //     />
    //   </div>
<div className=" w-full bg-gradient-to-r from-blue-200 to-purple-400 to- pt-24 pb-5">
<div className=" max-w-4xl bg-white  h-screen mx-[300px] p-6 rounded-lg">
      <div className="flex items-center mb-6">
        <Link to="/association" 
          className="mr-4 p-2 hover:bg-gray-100 rounded-full transition">
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </Link>
        
        <div className="flex items-center">
          <div className="bg-gray-200 h-14 w-14 mr-4 border flex rounded-md items-center justify-center">
            <span className='bg-black text-slate-300'>
              { 'hello'}
            </span>
          </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-800">{association.nomAssociation}</h1>
            <div>
            <span className="text-xl font-medium text-purple-400">{association.nomPrenomResponsable}</span>
            <span className="text-xl font-medium text-purple-400">{association.fonctiondsAssociation}</span>

            </div>
           <div className='flex items-center text-gray-700 text-sm mt-1.5'>
              <MapIcon className='mr-1 h-4 w-4 text-gray-500' />
              <span className='text-sm'>{association.VilleAssociation}</span>
          </div>
          <div className="bg-orange-300 ">
            {association.accreditée}
          </div>
          </div>
        </div>
      </div>

      {/* Navigation avec cet methode  */}
      <div className="flex bg-blue-100 justify-center rounded-lg text-xl p-2 space-x-4 mb-6 border-b pb-2">
        {[
          { key: 'profil', label: 'Profil' },
          { key: 'missions', label: 'Missions' },
          { key: 'contact', label: 'Contact' }
        ].map(section => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`
              pb-2 
              ${activeSection === section.key 
                ? 'bg-white p-2 rounded-xl text-gray-700 font-semibold' 
                : 'text-gray-500 hover:text-blue-500'}
            `}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Contenu a afficher comme outlet*/}
      <div>
        {renderContent()}
      </div>
    </div>
</div>
  );
}