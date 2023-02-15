import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
        
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    // <AuthContext.Provider value={{ auth, setAuth }}>
    // auth, setAuth passing to AuthContext @ AuthProvider
    return useContext(AuthContext);
}

export default useAuth;