import axios from "axios";
import useAuth from "./useAuth";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Providers/Auth/AuthProviders";
import { Navigate, useNavigate } from "react-router-dom";




const useAxiosSecure = () => {
    const authInfo = useAuth()
    const logoutUser = authInfo?.logoutUser

    const axiosSecure = axios.create({
        baseURL: 'https://exam-management-system-server.vercel.app',
        withCredentials: true
    })
    axiosSecure.interceptors.response.use((response) => {
        return response
    }, (err) => {
      console.log(err.response.status);

        if(err.response.status === 401 || err.response.status === 403){
          logoutUser()
            .then(() => {
              axiosSecure.post('/jwt/logout')
              .then(res =>{Swal.fire({
                position: "top-end",
                icon: "success",
                title: "You have been Logged out Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              console.log(res)
            } )
          })
          .catch(err => console.log(err))
        }

    })

    return axiosSecure
};

export default useAxiosSecure;