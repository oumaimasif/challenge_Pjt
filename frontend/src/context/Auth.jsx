import { createContext, useState,useEffect, Children } from "react";
import { jwtDecode } from "jwt-decode";

export const Auth = createContext();

export const AuthProvider =({Children})=>{
    const [user, setUser]=useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token)
            try {
                const decoded = jwtDecode(token);
                setUser(decoded)// constient les info id , nom , role...
            } catch (error) {
                setUser(null)
                console.log("Token invalide coté frontend");
            }
    },[])

    const login = (token)=>{
        localStorage.getItem("token", token)
        const decoded = jwtDecode(token);
        setUser(decoded)
    }

    const logout =()=>{
        localStorageremoveItem("token")
        setUser(null)
    }

    return(
        <Auth.Provider value={{user, login, logout}}>
            {Children}
        </Auth.Provider>
    )
}