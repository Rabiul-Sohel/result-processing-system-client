import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useGetStudent = (session, exam, group) => {
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const {user} = useAuth()

    const { data:students=[], refetch, isPending } = useQuery({
        queryKey: ["marks", session, exam, group],
        queryFn: async() => {
         if(session && exam && group){
          const res = await 
            axiosSecure.get(`/students?session=${session}&&exam=${exam}&&group=${group}&&email=${user.email}`)
            return res.data
         }
        },
      });
    return {students, refetch, isPending}
};

export default useGetStudent;