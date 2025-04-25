import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Ajouter un état de chargement

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Token decode; ", decoded)
                setUser(decoded)// constient les info id , nom , role...
                localStorage.setItem("wasLoggedIn", "true")   //marquer que user etait connecte     
            } catch (error) {
                console.log("Erreur décodage token: ", error);
                setUser(null)

                localStorage.removeItem("token");//efface token 
            }
        }
        setLoading(false)
    }, [])

    //Ecoute des changement de localstorage ds d'autre ongles

    useEffect(() => {

        const handleStorage = (e) => {
            //si le token a changé ds un autre ongles

            if (e.key === 'token') {
                if (!e.newValue) {
                    setUser(null);

                } else {
                    try {
                        const decoded = jwtDecode(e.newValue);
                        setUser(decoded)
                    } catch (error) {
                        setUser(null)
                    }
                }
            }
        }

        window.addEventListener('storage', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage)
        }

    }, [])

    const login = (token) => {

        localStorage.setItem("token", token)
        localStorage.setItem("wasLoggedIn", "true")   //marquer que user est connecte     

        const decoded = jwtDecode(token);
        setUser(decoded)
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("wasLoggedIn")   //nettoyer l'indicateur  

        setUser(null)
    }

    return (
        <Auth.Provider value={{ user, login, logout,loading }}>
            {children}
        </Auth.Provider>
    )
}