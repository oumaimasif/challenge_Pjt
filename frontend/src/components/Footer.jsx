

import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-purple-800 text-gray-300   py-10">
  <div className='px-12  md:flex md:items-center md:justify-between gap-8'>
       <div className="text-center pb-3 md:text-left">
          <h2 className='text-2xl font-semibold text-white'>NoorWays</h2>
          <p className='text-sm mt-2'>
            Plateforme de mise en relation entre associations, bénévoles et particuliers .
          </p>
        </div>

        <div className="flex flex-col  pb-4 md:flex-row md:space-x-6 items-center  ">
          <Link to="/" className="hover:text-orange-400 transition duration-300">Accueil</Link>
          <Link to="/association" className="hover:text-orange-400 transition duration-300">Associations</Link>
          <Link to="/benevole" className="hover:text-orange-400 transition duration-300">Bénévoles</Link>
          <Link to="/particulier" className="hover:text-orange-400 transition duration-300">Particuliers</Link>
        </div>

        <div className="flex justify-center   space-x-4">
          <a href="#" className="hover:text-orange-400 transition"><FaFacebook className="h-5 w-5" /></a>
          <a href="#" className="hover:text-orange-400 transition"><FaInstagram className="h-5 w-5" /></a>
          <a href="#" className="hover:text-orange-400 transition"><FaTwitter className="h-5 w-5" /></a>
        </div>

      </div>
      <div className="border-t border-gray-500 mt-6 pt-4 text-center text-sm">
        © {new Date().getFullYear()} NoorWays. Tous droits réservés ❤️.
        <div className="mt-2">
          <Link to="/" className="hover:text-orange-400 transition">Mentions légales</Link> | 
          <Link to="/" className="hover:text-orange-400 transition"> Politique de confidentialité</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
