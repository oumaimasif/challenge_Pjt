import React, { useState } from 'react'

function FormAssociation() {
  const [formAssociation, setFormAssociation] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Données envoyées :", formAssociation);
    try {
      const res = await axios.post("http://localhost:5000/associations/add_association", formAssociation)
      console.log("Association ajoutée", res.data);
      alert("Association ajoutée avec succès !");

      // Reset form
      setFormAssociation({
        nomAssociation: "",  nomPrenomResponsable: "", email: "", 
        telephone: "", description: "", 
        fonctionAssociation: "", categories: [],
        accreditée: false, image: "",
        role: "Association", 
        siteWeb: "",//fr instg 
        dateCreation: ""
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout", error);
      alert("Erreur lors de l'enregistrement de l'association");
    }
  }
  return (
    <>
     <div className=''>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
       <h2 className="text-2xl font-bold mb-6 text-center">Inscription Association</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Logo/Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Logo de l'Association
            </label>
          </div>




          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300">
            S'inscrire comme Association
          </button>
        </form>
    </div>
     </div>
    </>
  )
}

export default FormAssociation