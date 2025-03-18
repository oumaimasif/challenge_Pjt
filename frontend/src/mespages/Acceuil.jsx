import React from 'react'
import Hero from '../components/Hero'
import NoorWays from '../components/NoorWays'
// import Numbers from '../components/Chiffres/Numbers'
import Categories from "../components/Categories";


function Acceuil() {

    
    return (
        <>
            <Hero/>
            <NoorWays/> 
            {/* <Numbers/>  */}
            <Categories />
        </>

    )
}

export default Acceuil
