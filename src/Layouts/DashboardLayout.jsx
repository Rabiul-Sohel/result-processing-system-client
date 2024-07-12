import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const {singleUser} = useAuth()
  console.log(singleUser);
  

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex gap-10">
        <div className="navbar items-start rounded-t-xl bg-green-300 w-1/4 min-h-screen text-black">
          {singleUser.isAdmin ? (
            <div className="flex flex-col mx-auto mt-5">
              <h2 className="text-xl font-bold underline">Admin Dashboard</h2>
              <ul className="menu mx-auto flex justify-start">
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
              <ul className="menu mx-auto flex justify-start">
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
        <div className="w-3/4 text-center mt-5">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
