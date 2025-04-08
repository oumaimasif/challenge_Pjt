import React from 'react'
import Hero from '../components/componentsAcceuil/Hero'
import NoorWays from '../components/componentsAcceuil/NoorWays'
// import Numbers from '../components/Chiffres/Numbers'
import Categories from "../components/Categories";
import BtnAddannonce from '../components/annonceDoc/BtnAddannonce';
import BtnDemandeAide from '../components/Demande/BtnDemandeAide';
import ContactForm from '../components/componentsAcceuil/ContactForm';


function Acceuil() {


    return (
        <>
            <Hero />
            <NoorWays />
            {/* <Numbers/>  */}
            <Categories />
            <div className='grid md:grid-cols-2 md:gap-8'>
                <BtnAddannonce />
                <BtnDemandeAide />
            </div>
            <ContactForm/>
        </>

    )
}

export default Acceuil
