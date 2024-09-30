import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";


const useGetPassMark = (subject) => {
  const axiosSecure = useAxiosSecure()

    const { data: passMark = {}, refetch} = useQuery({
        queryKey: ["pass", subject],
        queryFn: async () => {
          const res = await axiosSecure.get(
            `/setpass?subject=${subject}`
          );
          return res.data;
        },
      });
    return [passMark, refetch]
};

export default useGetPassMark;