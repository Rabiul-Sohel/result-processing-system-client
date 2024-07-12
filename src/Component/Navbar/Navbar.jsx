// import logo from

import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { logoutUser, user, singleUser } = useAuth();
  const navigate = useNavigate()
  const handleLogout = ()=>{
    logoutUser()
      .then(() => {
        navigate('/')
        console.log('logout successfull')})
      .catch(err => console.log(err))
  }
  return (
    <div className="navbar lg:flex-row flex-col  bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl w-28 h-28 rounded-full">
          <img className="rounded-full" src="images.jpeg" alt="" />
        </a>
        <h2 className="lg:text-3xl text-base font-bold text-green-400">
          Barura Shahid Smrity Govt. College
        </h2>
      </div>
      <div className="flex-none gap-2">
        <div>
          <h2 className="lg:text-2xl text-base text-red-500 font-semibold">
            Result Processing System
          </h2>
          {
            user && <p className="text-right">{singleUser.isAdmin ? 'Admin Name': 'User Name'}: {singleUser?.name}</p>
          }
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
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
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
