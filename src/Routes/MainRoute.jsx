import { createBrowserRouter } from "react-router-dom";

import Home from "../Pages/Home/Home";
import AddMarks from "../Pages/AddMarks/AddMarks";
import Login from "../Pages/Login/Login";
import MainLayout from "../Layouts/MainLayout";
import DashboardLayout from "../Layouts/DashboardLayout";
import Signup from "../Pages/Signup/Signup";
import AllUser from "../Pages/AllUser/AllUser";
import Exam from "../Pages/Exam/Exam";
import AdminPanel from "../Pages/Admin/AdminPanel";
import Result from "../Pages/Result/Result";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <DashboardLayout></DashboardLayout>,
                children: [
                    {
                        path: '/',
                        element: <Home></Home>
                    },
                    {
                        path: 'addMarks',
                        element: <AddMarks></AddMarks>
                    },
                    {
                        path: 'allUsers',
                        element: <AllUser></AllUser>
                    },
                    {
                        path: 'exams',
                        element: <Exam></Exam>
                    },
                    {
                        path: '/adminPanel',
                        element: <AdminPanel></AdminPanel>
                    },
                   
                ]
            },
           
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <Signup></Signup>
            },
            {
                path: '/result',
                element: <Result></Result>
            }
        ]
    }
])