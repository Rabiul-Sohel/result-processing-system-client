import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import app from "../../../firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export const AuthContext = createContext();


const AuthProviders = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()

  const { data: singleUser = {}, isPending } = useQuery({
    queryKey: ["singleuser", user],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users?email=${user?.email}`)
      return res.data
    }
  });
  
  //  useEffect(()=>{
  //    axiosPublic.get('/users')
  //     .then(res => res.data)
  //  },[axiosPublic])
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutUser = () => {
    setLoading(true)
    return signOut(auth);
  };
  
  useEffect(() => {
    const unSubscribed = onAuthStateChanged(auth, (currentUser) => {
      console.log("observing", currentUser)
         
        if(currentUser){
          axiosSecure.post('/jwt', {user: currentUser.email})
        }
        setUser(currentUser);
        setLoading(false)
      });
    
    return () => {
      unSubscribed();
    };
  }, [auth, axiosSecure]);
  
  

 
  const authInfo = {
    createUser,
    userLogin,
    logoutUser,
    user,
    singleUser,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
