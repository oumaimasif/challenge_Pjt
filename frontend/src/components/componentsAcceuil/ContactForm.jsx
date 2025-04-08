import { Contact2 } from 'lucide-react';
import React from 'react';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full my-12 max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md ">
      <h2 className="text-2xl flex gap-2 items-center justify-center text-cyan-600 font-bold mb-6">
        <Contact2/> <span>Contactez-nous</span></h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <input type="text"
            id="name" name="user_name"
            placeholder="Votre nom" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            name="user_email" placeholder="exemple@domain.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Sujet
          </label>
          <input
            type="text" name="subject"
            placeholder="Sujet de votre message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message" rows="5"
            placeholder="Votre message..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-3 px-4 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition-colors"
        >
          Envoyer le message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
