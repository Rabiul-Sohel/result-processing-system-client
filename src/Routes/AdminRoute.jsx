import { useContext } from "react";
import useAuth from './../hooks/useAuth'
import useGetSingleUser from "../hooks/useGetSingleUser";


const AdminRoute = ({children}) => {
    const {singleUser, isPending} = useGetSingleUser()
    // const isAdmin = true
    // console.log(singleUser);
    if(isPending){
        return <div className="flex min-h-[50vh] justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
        </div> 
    }
    if(!singleUser.isAdmin){
        return <div>Sorry! <br /> You are not Admin</div>
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default AdminRoute;