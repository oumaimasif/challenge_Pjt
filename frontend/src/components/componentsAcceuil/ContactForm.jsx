// import { Contact2 } from 'lucide-react'
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser'

import axios from "axios"
import FormInput from '../formComponents/FormInput';

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

    setStatus({ loading: true, success: false, error: false, message: 'Envoi en cours...' });

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

      setStatus({ loading: false, success: true, error: false, message: "Message envoyé avec succès!" })

      //reset le formulaire
      setForm({ user_name: "", user_email: "", subject: "", message: "" });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: "" });
      }, 3000);

    } catch (error) {
      console.log("Erreur : ", error.message)
      setStatus({ loading: false, success: false, error: true, message: `Erreur lors de l'envoi du message. Veuillez réessayer. ${error.message}` })
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: "" });
      }, 5000);
    }
  }

  return (
    <>
      <div className='container mx-auto py-10 mt-10 bg-[#530e4722] rounded-tl-3xl  rounded-tr-3xl  '>

        <div className='flex flex-col items-center space-y-4 text-center mb-10'>
          <div>
            <h1 className='text-3xl text-fuchsia-800 font-semibold tracking-wide md:text-5xl'> Contactez-nous</h1>
            <p className='pt-2 mx-auto max-w-[500px] text-gray-700 md:text-lg'>Nous sommes là pour répondre à vos questions et vous aider dans votre démarche.</p>
          </div>
        </div>

        <div className='grid grid-cols-1 mx-8 md:grid-cols-2 gap-10'>
          {/* -----------1------------ */}
          <div className='bg-white border-2 border-gray-400 rounded-lg p-6 '>
            <h2 className='text-2xl  text-gray-900 flex gap-2 items-center justify-center font-bold mb-6'>Formulaire de contact
            </h2>
            {status.message && (
              <div className={` p-4 mb-4 rounded-md ${status.error ? 'bg-red-100 text-red-800' :
                status.success ? 'bg-green-100 text-green-800 ' : 'bg-blue-100 text-blue-800'}`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
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
                className="w-full px-3 py-2 border  rounded-md  "
                required
              ></textarea>
              <button type='submit' disabled={status.loading}
                className={`w-full ${status.loading ? 'bg-gray-400' : 'bg-black hover:bg-cyan-700'
                  } text-white py-3 px-4 rounded-md font-medium transition-colors`}
              >
                {status.loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </form>
          </div>
          {/* -----------2------------ */}



          {/* -----------3------------ */}



        </div>
      </div>
    </>
  )
}
