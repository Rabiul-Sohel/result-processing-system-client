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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
                        element: <PrivateRoute><AddMarks></AddMarks></PrivateRoute>
                    },
                    {
                        path: 'allUsers',
                        element: <AdminRoute><AllUser></AllUser></AdminRoute>
                    },
                    {
                        path: 'exams',
                        element: <AdminRoute><Exam></Exam></AdminRoute>
                    },
                    {
                        path: '/adminPanel',
                        element: <AdminRoute><AdminPanel></AdminPanel></AdminRoute>
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