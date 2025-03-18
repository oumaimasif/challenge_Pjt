import React, { useState } from 'react'
import axios from 'axios';

function FormBenevol() {

  const [formbenevole, setFormbenevole] = useState({
    civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", competence: "", dateDeNaissance: "",
  });



  //mettre a jour les valeurs des inputs
  const handleChange = (e) => {
    setFormbenevole({ ...formbenevole, [e.target.name]: e.target.value })
  }

  //! Fonction pour envoyer les données au backend (ajouter benevole a la list )
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formbenevole);
    try {
      const res = await axios.post("http://localhost:5000/benevoles/add_benevole", formbenevole)
      console.log("bien ajoutée", res.data);
      alert("Bénévole ajoutée avec succès !");

      // vider les champes
      setFormbenevole({
        civilite: "", nom: "", prenom: "", email: "", numeTelephone: "", competence: "", dateDeNaissance: "",
      })
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
    }
  }








  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full md:w-2/3 bg-white p-6 mt-24 rounded-lg shadow-lg">

        <h2 className='mb-6'>Inscription</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Boutons radio pour Femme / Homme */}
          <div className="flex items-center space-x-4">
            <span className='text-gray-600'>Civilité</span>
            <label className=" text-gray-800 flex items-center">
              <input type="radio" name="civilite"
                value="Homme"
                onChange={handleChange}
                checked={formbenevole.civilite === "Homme"}
                // value={formbenevole.civilite} car c'est un tableau (enum 2 valeur )
                required />
              <span className="ml-2">Homme</span>
            </label>
            <label className="text-gray-900 flex items-center">
              <input type="radio" name="civilite" value="Femme"
                onChange={handleChange}
                checked={formbenevole.civilite === "Femme"}
                required />
              <span className="ml-2">Femme</span>
            </label>
          </div>


          {/* Adresse Email */}
          <div className="relative z-0 w-full mb-5 pt-1 group">
            <input type="email" name="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
            border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
              onChange={handleChange}
              value={formbenevole.email}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  
            duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4
             rtl:peer-focus:left-auto peer-focus:text-blue-600  peer-placeholder-shown:scale-100 
             peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Adresse Email</label>
          </div>


          {/* <div className="relative z-0 w-full mb-5 pt-1 group">
            <input type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Mot de passe</label>
          </div>
          <div className="relative z-0 w-full mb-5 pt-1 group">
            <input type="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Confirmer le mot de passe</label>
          </div> */}

          {/* Nom & Prenom */}
          <div className="grid md:grid-cols-2  md:gap-6 ">
            <div className="relative z-0 w-full mb-5 pt-1 group">
              <input type="text" name="prenom" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                onChange={handleChange}
                value={formbenevole.prenom} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100
               peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Prénom</label>
            </div>
            <div className="relative z-0 w-full pt-1 mb-5 group">
              <input type="text" name="nom" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required
                onChange={handleChange}
                value={formbenevole.nom} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 
               peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Nom de famille</label>
            </div>
          </div>

          <div className="grid md:grid-cols-2  md:gap-6">
            {/* Numero Tele & Date naissance */}

            <div className="relative z-0 w-full pt-1.5 mb-5 group">
              <input type="tel" name="numeTelephone" pattern="0[6-7][0-9]{8}" title="Entrez un numéro valide (ex: 0600040000)" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required

                onChange={handleChange} value={formbenevole.numeTelephone} />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6">Numéro de télénumeTelephone(10 chiffres)</label>
            </div>
            {/* <div className="relative z-0 w-full mb-5 pt-1 group">
              <input type="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
              peer-focus:scale-75 peer-focus:-translate-y-6"></label>
            </div> */}
            <div className="relative z-0 w-full mb-5 pt-1 group">
              <input type="date" name="dateDeNaissance"
                value={formbenevole.dateDeNaissance}
                onChange={handleChange} required
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Date de naissance
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            {/* Competence */}
            <div className="relative z-0 w-full mb-5 pt-1 group">
              <input
                type="text"
                name="competence"
                onChange={handleChange}
                value={formbenevole.competence}
                required
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Compétence principale
              </label>
            </div>

          </div>

          <button type="submit" className="text-white bg-orange-500 hover:bg-orange-600 font-bold rounded-lg 
          text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Envoyer</button>
        </form>

      </div >
    </div >
  )
}

export default FormBenevol