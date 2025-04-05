import React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Acceuil from "./mespages/Acceuil"
import Associations from "./mespages/Associations"
import Benevole from "./mespages/Benevole"
import Particulier from "./mespages/Particulier"
import Login from "./mespages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FormBenevol from "./components/benevoleDoc/FormBenevol"
import FormAssociation from "./components/associationDoc/FormAssociation"
import FormParticulier from "./components/particulierDoc/FormParticulier"
import Apropos from "./mespages/Apropos"
import ProfileBenevole from "./components/benevoleDoc/ProfileBenevole"
import AnnonceBenevole from "./components/benevoleDoc/AnnonceBenevole"
import RecomendationBenevole from "./components/benevoleDoc/RecomendationBenevole"
import InfoProfile from "./components/benevoleDoc/InfoProfile"
import Annonces from "./mespages/Annonces"
import PlusInfo from "./components/annonceDoc/PlusInfo"
import Association from "./components/associationDoc/Association"
import FormAnnonce from "./components/annonceDoc/FormAnnonce"




function App() {

  return (
    <BrowserRouter>

      <Loc />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/about" element={<Apropos />} />

        <Route path="/association" element={<Associations />} />
        <Route path="/formAssociation" element={<FormAssociation />} />
        <Route path="/association/:id" element={<Association />} />

        <Route path="/formBenevole" element={<FormBenevol />} />
        <Route path="/formAnnonce" element ={<FormAnnonce/>}/>
        <Route path="/add_annonces" element={<FormAnnonce />} />

        <Route path="/benevole" element={<Benevole />} />
         <Route path="/annonces" element ={<Annonces/>}/>
         <Route path="/benevole/:id" element ={<Benevole/>}/>
         <Route path="/annonceDetail/:id" element={<PlusInfo/>}/>

        <Route path="profileBenevole/:id" element={<ProfileBenevole />} >
         <Route index element={<InfoProfile />}/> 
         <Route path="annonces" element={<AnnonceBenevole />} />
         <Route path="recomendation" element={<RecomendationBenevole />} />
        </Route>

        <Route path="/particuliers" element={<Particulier />} />
        <Route path="/formParticulier" element={<FormParticulier />} />

        <Route path="/login" element={<Login />} />

        {/* <Route path="/annonces/categorie/:id" element={<AnnoncesCategorie />} /> */}

      </Routes>

     <Footerlocation/> 
    </BrowserRouter>
  )
}

function Loc() {
  const location = useLocation()
  // const location = useLocation()

  return (
    <>
      {((location.pathname != "/login" ) && (location.pathname != "/formBenevol") )  && (
        <Header />
      )}

    </>
  )
}

function Footerlocation()
{
  const location = useLocation()
  // const location = useLocation()

  return (
    <>
      {(location.pathname != "/login") && (
        <Footer />
      )}

    </>
  )
}


export default App
