import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://exam-management-system-server.vercel.app'
})

const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;