import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetStudent = (session, exam, group) => {
    const { data:students=[], refetch } = useQuery({
        queryKey: ["marks", session, exam, group],
        queryFn: async() => {
         const res = await axios
            .get(`http://localhost:5000/students?session=${session}&&exam=${exam}&&group=${group}`)
            return res.data
        },
      });
    return {students, refetch}
};

export default useGetStudent;