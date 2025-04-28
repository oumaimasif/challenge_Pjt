import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import { Auth } from '../context/Auth';
import Notification from '../components/Notification';
import { toast } from 'react-toastify';
import GoHome from '../components/formComponents/GoHome';





function Login() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [notification, setNotification] = useState({ type: '', msg: '' });
    const { login } = useContext(Auth);
    const navigate = useNavigate();

    useEffect(()=>{
        const queryPrams = new URLSearchParams(window.location.search);// ! acceder a url apres ? 
        const expired = queryPrams.get('expired')// / extraire value expired => login?exipred=true
        if(expired==="true"){
         toast.error('Votre session a expiré, veuillez vous reconnecter.')
        //nettoyager url+ indicateur wasLoggedIn apres msg affiche
         localStorage.removeItem('wasLoggedIn')
         window.history.replaceState({}, document.title, '/login');
        }
    },[])
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:5000/login`, { email, password })
            console.log(`email : ${email}, password :${password} `)
            const { token, user } = response.data;

            if (token) {
                login(token)
                setNotification({ type: "Ok", msg: "Connexion réussie" });
                console.log("connexion reussie!!!!!")


                // localStorage.setItem('token', token);

                setTimeout(() => {
                    const decoded = jwtDecode(token);

                    //redirection selon le role
                    if (decoded.role === "admin") {
                        navigate("/adminDashboard");
                    } else if (decoded.role === "association") {
                        navigate("/associationDashboard")
                    } else if (decoded.role === "benevole") {
                        navigate("/benevoleDashboard")
                    } else if (decoded.role === "particulier") {
                        navigate("/particulierDashboard")
                    } else {
                        // Par défaut, on redirige vers la page d'accueil
                        navigate('/');
                    }
                }, 1500);
            }
            else {
                console.log("Token non reçu !")
                setNotification({ type: 'Error', msg: "Token non reçu" });

                setTimeout(() => {
                    setNotification({ type: "", msg: "" });
                }, 6000);
            }
            setTimeout(() => {
                setNotification({ type: "", msg: "" });
            }, 3000);


        } catch (error) {
            console.error('Erreur de la connexion :', error)
            setNotification({
                type: 'Error',
                msg: error.response?.data?.msg || "Erreur de connexion"
            });

            setTimeout(() => {
                setNotification({ type: "", msg: "" });
            }, 6000);
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

                    {/* ---------Partie Notification--------- */}
                    <Notification type={notification.type} msg={notification.msg} onClose={() => setNotification({ type: "", msg: "" })} />

                    <form onSubmit={handleSubmit} className='mt-6 mr-5  space-y-4'>

                        <div>
                            <label className=" block text-lg font-medium text-gray-700">Voter email </label>
                            <input type="email" value={email} required
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 "
                                placeholder="votre@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                        </div>


                        <div>
                            <label className="block text-lg font-medium text-gray-700">Mot de Passe</label>
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
                        <div className='flex justify-center gap-3 mt-3'>
                            <button onClick={() => navigate('/formBenevole')} className='px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600  transition-all duration-200'>
                                Bénévole
                            </button>
                            <button onClick={() => navigate('/formAssociation')} className='px-4 py-2  rounded-md bg-orange-500 font-medium text-white hover:bg-orange-600 transition-all duration-200'>
                                Association
                            </button>
                            <button onClick={() => navigate('/formParticulier')} className='px-4 py-2  rounded-md bg-yellow-500 font-medium text-white hover:bg-yellow-500  transition-all duration-200'>
                                Particulier
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <GoHome/>
        </div>

    )
}

export default Login