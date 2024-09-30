// import logo from

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../../Providers/Auth/AuthProviders";
import useGetSingleUser from "../../hooks/useGetSingleUser";

const Navbar = () => {
  // const { logoutUser, user,  singleUser, loading } = useContext(AuthContext);
  const authInfo = useContext(AuthContext)
  const user = authInfo?.user;
  // const singleUser = authInfo?.singleUser;
  const logoutUser = authInfo?.logoutUser
  const loading = authInfo?.loading
  // const user = true 
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const axiosPublic = useAxiosPublic()
  const {singleUser} = useAuth()
   
  // console.log(singleUser);
  const handleLogout = () => {
    logoutUser()
      .then((res) => {
        axiosSecure.post('/jwt/logout')
          .then(res =>{Swal.fire({
            position: "top-end",
            icon: "success",
            title: "You have been Logged out Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(res)
        } )
      })
      .catch(err => console.log(err))
  }
  
  return (
    <div className="navbar lg:flex-row flex-col bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl w-16 md:w-32 h-28 rounded-full">
          <img className="rounded-full " src="logo.png" alt="" />
        </a>
        <h2 className="lg:text-3xl text-sm font-bold text-green-400">
          Barura Shahid Smrity Govt. College
        </h2>
      </div>
      <div className="flex-none gap-2">
        <div>
          <h2 className="lg:text-2xl text-base text-red-500 font-semibold">
            Result Processing System
          </h2>
          <div>
            {
              user && <p className="text-center md:text-right ">{singleUser.isAdmin ? 'Admin Name' : 'User Name'}: {singleUser?.name}</p>
            }
          </div>
        </div>
        {
          user ? <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src=""
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div> : <Link className="btn" to='/login'>Login</Link>
        }
      </div>
    </div>
  );
};

export default Navbar;
