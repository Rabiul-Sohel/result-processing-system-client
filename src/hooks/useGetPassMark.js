import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetPassMark = (subject) => {

    const { data: passMark = {}, refetch} = useQuery({
        queryKey: ["pass", subject],
        queryFn: async () => {
          const res = await axios.get(
            `http://localhost:5000/setpass?subject=${subject}`
          );
          return res.data;
        },
      });
    return [passMark, refetch]
};

export default useGetPassMark;