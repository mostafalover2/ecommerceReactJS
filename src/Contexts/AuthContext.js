import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
    let [isUserLoggedIn, setIsUserLoggedIn] = useState(false)


    useEffect(() => {
        if (localStorage.getItem("token") != null) {
            setIsUserLoggedIn(true)
        }
    }, [])


    return <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
        {children}
    </AuthContext.Provider>
}