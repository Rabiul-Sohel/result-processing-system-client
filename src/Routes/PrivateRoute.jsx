import { Navigate, useLocation,  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useGetSingleUser from "../hooks/useGetSingleUser";


const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth()
    const {singleUser,} = useGetSingleUser(user?.email)
    console.log(singleUser);
    const location = useLocation()
    // const navigate = useNavigate()
    if(loading){
        return <div className="flex min-h-[50vh] justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    }
    
    if(user){
        if(!singleUser?.isApproved){
            return <div className="flex items-center justify-center"><p>Please wait for account approval</p></div>
        }
        return children
        
    } 
   return <Navigate state={{from: location}} to='/login'></Navigate>
    
};

export default PrivateRoute;