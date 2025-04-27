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
import FormDemandeAide from "./components/Demande/FormDemandeAide"
import DemandeAide from "./mespages/DemandeAide"
import DemandeAideModal from "./components/Demande/DemandeAideModal"
import ProfileParticulier from "./components/particulierDoc/ProfileParticulier"
import AdminDashboard from "./Dashboards/Espaceadmine/AdminDashboard"
import AssocaitionDashboard from "./Dashboards/EspaceAssociation/AssocaitionDashboard"
import BenevoleDashboard from "./Dashboards/EspaceBenevole/BenevoleDashboard"
import ParticulierDashboard from "./Dashboards/EspaceParticulier/ParticulierDashboard"
import ProtectedRoutes from "./components/ProtectedRoutes"
import { AuthProvider } from "./context/Auth"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthCheck from "./components/AuthCheck"








function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <AuthCheck />
        <Loc />
        <ToastContainer position="top-center" autoClose={5000} />

        <Routes>

          <Route path="/" element={<Acceuil />} />
          <Route path="/about" element={<Apropos />} />

          <Route path="/association" element={<Associations />} />
          <Route path="/formAssociation" element={<FormAssociation />} />
          <Route path="/association/:id" element={<Association />} />

          <Route path="/formBenevole" element={<FormBenevol />} />

          <Route path="/formAnnonce" element={
            <ProtectedRoutes allowedRoles={["association", "benevole"]}>
              <FormAnnonce />
            </ProtectedRoutes>
          } />

          <Route path="/add_annonces" element={<FormAnnonce />} />

          <Route path="/benevoles" element={<Benevole />} />
          <Route path="/annonces" element={<Annonces />} />
          <Route path="/benevole/:id" element={<Benevole />} />
          <Route path="/annonceDetail/:id" element={<PlusInfo />} />

          <Route path="profileBenevole/:id" element={<ProfileBenevole />} >
            <Route index element={<InfoProfile />} />
            <Route path="annonces" element={<AnnonceBenevole />} />
            <Route path="recomendation" element={<RecomendationBenevole />} />
          </Route>

          <Route path="/particuliers" element={<Particulier />} />
          <Route path="/formParticulier" element={<FormParticulier />} />
          <Route path="/particulier/:id" element={<ProfileParticulier />} />


          <Route path="/formDemandeAide" element={<FormDemandeAide />} />
          <Route path="/demandeAide" element={<DemandeAide />} />
          <Route path="/demandeDetail/:id" element={<DemandeAideModal />} />

          <Route path="/login" element={<Login />} />

          {/* routes protegees avec ProtectdRoute en indique le role */}

          {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
          <Route path="/adminDashboard" element={
            <ProtectedRoutes allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoutes>
          } />

          <Route path="/assocaitionDashboard" element={
            <ProtectedRoutes allowedRoles={["association"]}>
              <AssocaitionDashboard />
            </ProtectedRoutes>
          } />

          <Route path="/benevoleDashboard" element={
            <ProtectedRoutes allowedRoles={["benevole"]}>
              <BenevoleDashboard />

            </ProtectedRoutes>

          } />

          <Route path="/particulierDashboard" element={<ParticulierDashboard />} />


          {/* <Route path="/annonces/categorie/:id" element={<AnnoncesCategorie />} /> */}

        </Routes>

        <Footerlocation />
      </BrowserRouter>
    </AuthProvider>

    // <AuthProvider>    
    //   <div>
    //   <h1>Test basique sans AuthProvider</h1>
    //   </div>
    // </AuthProvider>


  )
}

function Loc() {
  const location = useLocation()
  // const location = useLocation()

  return (
    <>
      {(location.pathname != "/login" &&
        location.pathname != "/adminDashboard" &&
        location.pathname != "/benevoleDashboard" &&
        location.pathname != "/assocaitionDashboard" &&
        location.pathname != "/particulierDashboard"

      ) && (
          <Header />
        )}

    </>
  )
}

function Footerlocation() {
  const location = useLocation()
  // const location = useLocation()

  return (
    <>
      {(location.pathname != "/login" &&
        location.pathname != "/adminDashboard" &&
        location.pathname != "/benevoleDashboard" &&
        location.pathname != "/assocaitionDashboard" &&
        location.pathname != "/particulierDashboard"

      ) && (
          <Footer />
        )}

    </>
  )
}


export default App
