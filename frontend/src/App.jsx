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



function App() {

  // const hideforLogin = ["/login"]
  return (
    <BrowserRouter>
      {/* {
        !hideforLogin.includes(location.pathname) && <Header />
      } */}
      <Loc />
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/about" element={<Apropos />} />

        <Route path="/association" element={<Associations />} />
        <Route path="/formAssociation" element={<FormAssociation />} />

        <Route path="/benevole" element={<Benevole />} />
        <Route path="/formBenevole" element={<FormBenevol />} />
        <Route path="/profileBenevole/:id" element={<ProfileBenevole />} />

        <Route path="/particulier" element={<Particulier />} />
        <Route path="/formParticulier" element={<FormParticulier />} />

        <Route path="/login" element={<Login />} />

        {/* <Route path="/annonces/categorie/:id" element={<AnnoncesCategorie />} /> */}

      </Routes>
      {/* {
        !hideforLogin.includes(location.pathname) && <Footer />
      } */}
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
