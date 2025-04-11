import React, { useState } from 'react'

function Login() {

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`email : ${email}, password :${password} `)
    }
    return (
            <div className=" bg-purple-300 text-white flex  justify-center max-w-full items-center min-h-screen ">
                <div className="flex  flex-wrap text-gray-900 max-w-5xl my-20 py-6 shadow-sm overflow-hidden bg-white rounded-xl">

                    <div className=" md:w-1/2 p-5 w-full md:flex  md:justify-center">
                        <img src="/images/log.jpg" alt="logIn" className='w-full rounded-2xl shadow-md' />
                    </div>

                    <div className=' md:w-[500px] py-4 px-5 m-auto'>
                        <h1 className='text-3xl font-bold text-center'>Connectez-vous</h1>
                        <p className=' text-lx text-center text-gray-500 mt-4'>Entre votre email et mot de passe .</p>

                        <form onSubmit={handleSubmit} className='mt-6 mr-5  space-y-4'>

                            <div>
                                <label className=" block text-lg font-medium text-gray-700">Voter email </label>
                                <input type="email" value={email} required
                                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-700 "
                                    placeholder="name@gmail.com" onChange={(e) => setEmail(e.target.value)} />
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

                            <button
                                type="button"
                                className="w-full py-3 mt-2 bg-gray-200 text-gray-800 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-gray-300 transition duration-300"
                            >
                                <img src="/images/google-icon.png" alt="Google" className="h-5 w-5" />
                                <span>Se connecter avec Google</span>
                            </button>
                        </form>
                        {/* sign up  */}
                        <p className="text-center text-gray-600 mt-4"> Pas encore de compte ?
                        <button className="text-purple-600 hover:underline ml-1">Créer un compte</button>
                        </p>
                    </div>
                </div>
            </div>

    )
}

export default Login