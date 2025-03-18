import React from "react"
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Acceuil from "./mespages/Acceuil"
import Associations from "./mespages/Associations"
import Benevole from "./mespages/Benevole"
import Particulier from "./mespages/Particulier"
import Login from "./mespages/Login"
import Header from "./components/Header"
import Footer from "./components/Footer"
import FormBenevol from "./components/FormBenevol"
import FormAssociation from "./components/FormAssociation"
import FormParticulier from "./components/FormParticulier"
import Apropos from "./mespages/Apropos"
import ProfileBenevole from "./components/benevolesdoc/ProfileBenevole"



function App() {

  const hideforLogin = ["/login"]
  return (
    <BrowserRouter>
      {
        !hideforLogin.includes(location.pathname) && <Header />
      }
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="/about" element={<Apropos />} />

        <Route path="/association" element={<Associations />} />
        <Route path="/formAssociation" element={<FormAssociation />} />

        <Route path="/benevole" element={<Benevole />} />
        <Route path="/formBenevol" element={<FormBenevol />} />
        <Route path="/profileBenevole/:id" element={<ProfileBenevole />} />

        <Route path="/particulier" element={<Particulier />} />
        <Route path="/formParticulier" element={<FormParticulier />} />

        <Route path="/login" element={<Login />} />

        {/* <Route path="/annonces/categorie/:id" element={<AnnoncesCategorie />} /> */}

      </Routes>
      {
        !hideforLogin.includes(location.pathname) && <Footer />
      }
    </BrowserRouter>
  )
}

export default App
