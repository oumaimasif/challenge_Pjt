import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Categories() {

    const [categories, setCategories] = useState([])
    const navigate = useNavigate();

    // useEffect(() => {
    //     // verifie que l'API renvoie les données correctement
    //     axios.get('http://localhost:5000/categories')
    //         .then(response => {setCategories(response.data)
    //                console.log(response.data)
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    // useEffect(() => {
    //     fetch("http://localhost:5000/categories")
    //         .then((res) => res.json())
    //         .then((result) => {

    //             console.log(result.categories)
    //             setCategories(result.categories || [])})
    //         .catch((err) => {
    //             console.log("Erreur est produit lors d'affichage : ", err)
    //         })
    //     }, []);

    useEffect(() => {
        const fetchCategorie = async () => {
            try {
                const dataCat = await axios.get("http://localhost:5000/categories");
                setCategories(dataCat.data.categories)
                console.log(dataCat.data.categories || [])
            } catch (err) {
                console.log("Erreur est produit lors d'affichage : ", err)
            }
        }
        fetchCategorie();
    }, [])

    return (
        <>
            <section className='py-8 px-2 bg-white relative -top-11 lg:w-1/2 w-8/12 m-auto rounded-md shadow-md'>
                <h1 className=" font-bold lg:text-center mb-2 text-[#252525] text-xl lg:text-3xl">Explorez par catégorie</h1>
                <p className="lg:text-center px-1 text-left text-gray-600 mb-12">
                    Découvrez des opportunités de bénévolat selon vos centres d'intérêt et vos compétences
                </p>

                <div className=" flex flex-wrap justify-center gap-2 lg:gap-5 ">

                    {categories && categories.length > 0 ? (
                        categories.map((categorie) => {
                            return (

                                <div key={categorie._id} className="relative group ">
                                    <button
                                        onClick={() => navigate(`/annonces/categorie/${categorie._id}`)}
                                        className="bg-[#18b710] text-white lg:px-4 text-xs lg:text-xl lg:py-2 p-2 rounded-lg hover:bg-white  hover:text-gray-600 hover:border-green-600 hover:border-2 hover:py-1.5 "
                                    >
                                        {categorie.nom}
                                    </button>
                                    <div className="absolute hidden group-hover:block bg-white  text-black p-2 rounded z-30 shadow-lg w-60 text-sm">
                                        {categorie.description}
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <p>Chargement des catégories...</p>
                    )}
                </div>
            </section>
        </>
    )
}
