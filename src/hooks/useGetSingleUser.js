import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useGetSingleUser = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const {user, loading} = useAuth()

    const {data:singleUser={}, isPending} = useQuery({
        queryKey: ['singleUser'],
        enabled: !loading,
        queryFn: async()=>{
            const res = await axiosPublic.get(`/users?email=${user?.email}`)
            return res.data 
        }
    })
    return {singleUser, isPending}
};

export default useGetSingleUser;