import axios from 'axios';
import React, { useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom';



function Login() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.Axios(`http://localhost:5000/login`, { email, password })
            console.log(`email : ${email}, password :${password} `)
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);

                const decoded = jwtDecode(token);

                //redirection selon le role
                if (decoded.role === "admin") {
                    navigate("/admin_dashboard");
                } else if (decoded.role === "association") {
                    navigate("/association_dashboard")
                } else if (decoded.role === "benevole") {
                    navigate("/benevole_dashboard")
                } else if (decoded.role === "particulier") {
                    navigate("/particulier_dashboard")
                } else {
                    // Par défaut, on redirige vers la page d'accueil
                    navigate('/');
                }
            }
            else {
                console.log("Token non reçu !")
            }

        } catch (error) {
            console.error('Erreur de la connexion :', error)
        }
    }
    return (
        <div className=" bg-purple-300 text-white flex  justify-center max-w-full items-center min-h-screen ">
            <div className="flex  flex-wrap text-gray-900 max-w-5xl my-20 py-6 shadow-sm overflow-hidden bg-white rounded-xl">

                <div className=" md:w-1/2 p-5 w-full md:flex  md:justify-center">
                    <img src="/images/log.jpg" alt="logIn" className='w-full rounded-2xl shadow-md' />
                </div>

                <div className=' md:w-[500px] py-4 px-5 m-auto'>
                    <h1 className='text-3xl font-bold text-center'>Connectez-vous</h1>
                    <p className=' text-lx text-center text-gray-500 mt-4'>Entrez vos identifiants pour accéder à votre compte.</p>

                    <form onSubmit={handleSubmit} className='mt-6 mr-5  space-y-4'>

                        <div>
                            <label className=" block text-lg font-medium text-gray-700">Voter email </label>
                            <input type="email" value={email} required
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 "
                                placeholder="votre@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>


                        <div>
                            <label class="block text-lg font-medium text-gray-700">Mot de Passe</label>
                            <input type="password" value={password} required
                                className=" w-full px-4 py-2 border  rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700"
                                placeholder="********" onChange={(e) => setPassword(e.target.value)} />

                        </div>


                        <div className=' flex justify-between items-center text-sm'>
                            <label className='flex items-center '>
                                <input type="checkbox" id='remenber' className='mr-2' />
                                Se souvenir de moi !
                            </label>
                            <button type='button' className='hover:text-violet-600 text-indigo-700'> Mot de passe oublié ? </button>
                        </div>

                        <button type='submit' className=" hover:scale-[1.01] ease-in-out active:scale-[.98] active:duration-75 w-full py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition duration-300" >
                            Connexion
                        </button>

                    </form>

                    <div className='m-6'>
                        <p className='text-centre flex items-center justify-center space-y-8 text-gray-600'>Pas encore de compte ?</p>
                        <div className='flex justify-center gap-2 mt-2'>
                            <button onClick={() => navigate('/formBenevole')} className='px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600'>
                                Bénévole
                            </button>
                            <button onClick={() => navigate('/formAssociation')} className='px-4 py-2  rounded-md bg-green-500 text-white hover:bg-green-600'>
                                Association
                            </button>
                            <button onClick={() => navigate('/formParticulier')} className='px-4 py-2  rounded-md bg-yellow-500 text-white hover:bg-yellow-600'>
                                Particulier
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Login