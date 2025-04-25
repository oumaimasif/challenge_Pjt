
import React, { useContext, useEffect } from 'react'
import { Navigate, replace, useNavigate } from 'react-router-dom'
import { Auth } from '../context/Auth'
import isTokenValide from './isTokenValide'



export default function ProtectedRoutes({ children, allowedRoles }) {

    const { user, loading } = useContext(Auth);//user , login ;logout
    const navigate = useNavigate();

    // console.log("---- user:", user);
    // console.log("----- - token:", token);
    useEffect(() => {
        if (!loading) {
            const token = localStorage.getItem("token")//recupere le token

            if (!token || !isTokenValide(token)) {
                localStorage.removeItem("token")//efface le

                navigate("/login", { replace: true })
                return
            }// else 
            if (!user || !allowedRoles.includes(user.role)) {
                navigate("/", { replace: true })
                return;
            }
        }
    }, [user, allowedRoles, navigate])

    if (loading) return null;
    
    const token = localStorage.getItem("token")//recupere le token
    if (!token || !isTokenValide(token)|| !user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace/>    }

    // if (!user || !allowedRoles.includes(user.role)) {
    //     return <Navigate to="/" />
    // }

    return children; //si tt ok 
}

