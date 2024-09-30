import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const DashboardLayout = () => {
  const {singleUser} = useAuth()
  // const {singleUser} = useGetSingleUser()
  //  const isAdmin = true
  

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-3 md:gap-10">
        <div className="navbar items-start lg:rounded-t-xl bg-green-300 lg:w-1/4 lg:min-h-screen text-black">
          {singleUser.isAdmin ? (
            <div className="flex flex-col mx-auto mt-5">
              <h2 className="text-xl font-bold underline">Admin Dashboard</h2>
              <ul className="menu mx-auto flex flex-row md:flex-col justify-center text-center">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/adminPanel">Admin Panel</NavLink>
                </li>
                <li>
                  <NavLink to="/addMarks">Add Marks</NavLink>
                </li>
                <li>
                  <NavLink to="/allUsers">All Teacher</NavLink>
                </li>
                <li>
                  <NavLink to="/exams">Exams</NavLink>
                </li>
                <li>
                  <NavLink to="/result">Result</NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col mx-auto mt-5">
              <h2 className="text-xl font-bold underline">Teacher Dashboard</h2>
              <ul className="menu mx-auto flex flex-row justify-start">
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>

                <li>
                  <NavLink to="/addMarks">Add Marks</NavLink>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="w-full md:w-3/4 mx-auto text-center mt-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
