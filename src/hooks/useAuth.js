import { useContext } from "react";
import { AuthContext } from "../Providers/Auth/AuthProviders";


const useAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo 
};

export default useAuth;