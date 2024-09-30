import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useGetExam = (session, exam) => {
    const axiosPublic = useAxiosPublic()
    const {data:singleExam={}, refetch, isPending} = useQuery({
        queryKey: ['exam', session, exam],
        queryFn: async()=>{
            const res = await axiosPublic.get(`/singleExam?session=${session}&&exam=${exam}`);
            return res.data;
        }
    })
    
    return {singleExam, refetch, isPending}

};

export default useGetExam;