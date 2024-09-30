import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetSingleUser from "../../hooks/useGetSingleUser";
import { useState } from "react";

const Login = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { userLogin, getListedUser, user, loading, singleUser } = useAuth();
  // const email = user?.email;
  const navigate = useNavigate();
  const location = useLocation();
  // const { singleUser } = useGetSingleUser()
 
  

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // axiosPublic.get(`/users?email=${email}`)
    userLogin(email, password)
      .then((res) => {
        if (res.user) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have been Logged in Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate(
            location.state ? location.state.from?.pathname : "/"
          );
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: 'Please insert valid Email & Password',

        });
      });

  };
  return (
    <div className="card bg-base-100 w-full mx-auto  max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-xl md:text-3xl font-bold text-center">Please Login</h2>
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className="input input-bordered "
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div>
        New to this site? Please{" "}
        <Link
          className="font-bold text-blue-500 cursor-pointer"
          to="/signUp"
        >
          {" "}
          Resgister
        </Link>{" "}
      </div>
    </div>
  );
};

export default Login;
