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

export const AuthContext = createContext();
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const auth = getAuth(app);
  const axiosPublic = useAxiosPublic();

  const { data: singleUser = {} } = useQuery({
    queryKey: ["singleuser", user],
    queryFn: async() =>{
        const res = await axiosPublic.get(`/users?email=${user.email}`)
        return res.data     
    }
  });
  console.log(singleUser);

  //  useEffect(()=>{
  //    axiosPublic.get('/users')
  //     .then(res => res.data)
  //  },[axiosPublic])
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unSubscribed = () => {
      onAuthStateChanged(auth, (currentUser) => {
        console.log("observing", currentUser);
        setUser(currentUser);
      });
    };
    return () => {
      unSubscribed();
    };
  }, [auth]);

  const logoutUser = () => {
    return signOut(auth);
  };
  const authInfo = {
    createUser,
    userLogin,
    logoutUser,
    user,
    singleUser
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
