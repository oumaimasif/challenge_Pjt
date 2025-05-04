// import { Contact2 } from 'lucide-react'
import React, { useState } from 'react';
import emailjs from '@emailjs/browser'

import axios from "axios"
import FormInput from '../formComponents/FormInput';
import { Mail, Phone } from 'lucide-react';

export default function ContactForm() {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState({ loading: false, succes: false, error: false, message: "" })
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ loading: true, succes: false, error: false, message: 'Envoi en cours...' });

    try {

      const DonneesEnvoyer = {
        user_name: form.user_name,
        user_email: form.user_email,
        subject: form.subject,
        message: form.message
      }
      //envoi via Emailjs
      console.log("les données envoyer via EmailJs: ", DonneesEnvoyer)

      await emailjs.send('service_p76zq4o',//id de service
        'template_r4ydz2u',//id de template
        DonneesEnvoyer,
        "0WS_w-86jzG5E4OO_"//cle publique 0WS_w-86jzG5E4OO_
      )

      //enregistrer dans DB
      try {
        //les noms de champs == comme le backend
        const backendData = {
          user_name: form.user_name, user_email: form.user_email,
          subject: form.subject, message: form.message
        }
        console.log("data envoyer au backend: ", backendData)
        await axios.post('http://localhost:5000/contact', backendData)
        console.log('Message enregistré en BD')

      } catch (error) {
        console.error("Enregistrement échoué: ", error);
      }//ici en continue meme si la sauvegarde est echoué

      setStatus({ loading: false, succes: true, error: false, message: "Message envoyé avec succès!" })

      //reset le formulaire
      setForm({ user_name: "", user_email: "", subject: "", message: "" });

      setTimeout(() => {
        setStatus({ loading: false, succes: false, error: false, message: "" });
      }, 3000);

    } catch (error) {
      console.log("Erreur : ", error.message)
      setStatus({ loading: false, succes: false, error: true, message: `Erreur lors de l'envoi du message. Veuillez réessayer. ${error.message}` })
      setTimeout(() => {
        setStatus({ loading: false, succes: false, error: false, message: "" });
      }, 5000);
    }
  }

  return (
    <>
      <div className=' mx-4  lg:mx-12  py-10 lg:mt-24 mt-10 bg-[#530e4722] rounded-tl-3xl  rounded-tr-3xl  '>

        <div className='flex flex-col items-center space-y-4 text-center mb-10'>
          <div>
            <h1 className='text-3xl text-purple-700 font-semibold tracking-wide md:text-5xl'> Contactez-nous</h1>
            <p className='pt-2 mx-auto max-w-[500px] text-gray-700 md:text-lg'>Nous sommes là pour répondre à vos questions et vous aider dans votre démarche.</p>
          </div>
        </div>

        <div className='grid grid-cols-1 mx-4 lg:mx-8 md:grid-cols-2 gap-10'>
          {/* -----------1------------ */}
          <div className='bg-white border-2 border-gray-400 rounded-lg p-6 '>
            <h2 className='text-2xl font-semibold mb-4'>Formulaire de contact
            </h2>
            {status.message && (
              <div className={` p-4 mb-4 rounded-md ${status.error ? 'bg-red-100 text-red-800' :
                status.succes ? 'bg-green-100 text-green-800 ' : 'bg-blue-100 text-blue-800'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className='space-y-6'>
              <FormInput label="Nom" type="text" name="user_name" value={form.user_name} placeholder="Votre nom"
                required={true} onChange={handleChange} />

              <FormInput label="Email" name="user_email" type="email" value={form.user_email} placeholder="exemple@domain.com"
                required={true} onChange={handleChange} />

              <FormInput label="Sujet" type="text" name="subject" value={form.subject} placeholder="Sujet de votre message"
                required={true} onChange={handleChange} />
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                placeholder="Votre message..."
                className="w-full p-2 border rounded  "
                required
              ></textarea>
              <button type='submit' disabled={status.loading}
                className={`w-full ${status.loading ? 'bg-gray-400' : 'bg-black hover:bg-cyan-900'
                  } text-white py-3 px-4 rounded-md font-medium transition-colors`}
              >
                {status.loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>

          <div className='space-y-6'>
            {/* -----------2------------ */}
            <div className='bg-white border-2 border-gray-400 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold mb-4'>Contactez-nous directement</h2>
              <p className='text-gray-500 mb-6'> Vous pouvez également nous joindre par ces moyens.</p>

              <div className='space-y-4'>
                <div className='flex items-start gap-3'>
                  <Mail className='h-5 w-5 mt-0.5 text-fuchsia-800' />
                  <div>
                    <h3 className=' '>Email</h3>
                    <p className='text-sm text-gray-500'>Contact@entraide-solidaire.com</p>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Phone className='h-5 w-5 mt-0.5 text-fuchsia-800' />
                  <div>
                    <h3 className=' '>WhatsApp</h3>
                    <p className='text-sm text-gray-500'>+212 6 25 05 00 00</p>
                    <p className='text-xs text-gray-500'>Lundi au vendredi, 9h à 18h</p>
                  </div>

                </div>
              </div>
            </div>


            {/* -----------3------------ */}
            <div className='bg-white border-2 border-gray-400 rounded-lg p-6'>
              <h2 className='text-2xl font-semibold mb-4'>Foire aux questions</h2>
              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium'>Comment devenir bénévole ?</h3>
                  <p className='text-sm text-gray-500'> Il suffit de créer un compte sur notre plateforme et de vous inscrire en tant que bénévole.
                    Vous pourrez ensuite parcourir les missions disponibles.</p>
                </div>

                <div>
                  <h3 className='font-medium'>Comment publier une annoce ?</h3>
                  <p className='text-sm text-gray-500'>Les associations et les bénévoles enregistrées peuvent publier des annonces depuis leur tableau de bord
                    après connexion.</p>
                  {/* //! */}

                </div>

                <div>
                  <h3 className='font-medium'>Comment demander de l'aide ?</h3>
                  <p className='text-sm text-gray-500'> Créez un compte en tant que personne en difficulté, puis publiez une annonce 
                  détaillant le type d'aide dont vous avez besoin.</p>
                </div>
              </div>

            </div>
          </div>


        </div>
      </div>
    </>
  )
}
