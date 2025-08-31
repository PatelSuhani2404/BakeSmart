import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

function AuthProvider({ children }){
    const [currentUser,setCurrentUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const storedUser=localStorage.getItem('bakesmart_user');
        if(storedUser){
            setCurrentUser(JSON.parse(storedUser));
        }
        setLoading(false);
    },[])

    const login = async( username,email,password )=>{
            try{
                const res = await
                axios.post("http://127.0.0.1:8000/api/token/",{ email,password });
                const { access, refresh } = res.data;
                if(!access){
                    throw new Error("No access token returned.")
                }
                const userRes = await axios.get("http://127.0.0.1:8000/api/user/",{
                    headers : {
                        Authorization : `Bearer ${access}`
                    }
                });

                const userData = {
                    username : userRes.data.username,
                    email : userRes.data.email,
                    token : access,
                    refreshToken : refresh,
                    role : userRes.data.role || "user"
                };
                setCurrentUser(userData);
                localStorage.setItem("bakesmart_user",JSON.stringify(userData));
                localStorage.setItem("access",res.data.access)
                localStorage.setItem("refresh",res.data.refresh)
                return true;
            }catch(error){
                console.error("Login failed :",error.message || error.response?.data);
                return false;
            }
        }

    const logout=()=>{
        setCurrentUser(null);
        localStorage.removeItem("bakesmart_user");
    }

    if(loading)
        return null;

    return(
        <>
        <AuthContext.Provider value={{currentUser,login,logout}}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export const useAuth = () => useContext(AuthContext);
export default AuthProvider