import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const axiosPublic = useAxiosPublic()
  const {userLogin, getListedUser} = useAuth()
  const navigate = useNavigate()
  const handleLogin = e =>{
    e.preventDefault()
    const form = e.target;
    const email = form.email.value 
    const password = form.password.value 
    // axiosPublic.get(`/users?email=${email}`)
    userLogin(email, password)
          .then(res => {
            if(res.user){
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
            }
            navigate('/')
          })
          .catch(err => console.log(err))
   
    // getListedUser(email)
    //   .then(res => {
    //     if(res.data){
          
    //     } else {
    //       Swal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Something went wrong! Try Again",
    //       });
    //     }
    //   })
    
   
      // .then(res => console.log(res.data))
    // userLogin(email, password)
    //   .then(res => {
    //     if(res.user){
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Your work has been saved",
    //         showConfirmButton: false,
    //         timer: 1500
    //       });
    //     }
    //     navigate('/')
    //   })
    //   .catch(err => console.log(err))
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
        
      <div className="hero-content flex-col lg:flex-row-reverse">
        
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h2 className="text-3xl font-bold text-center">Please Login</h2>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
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
          <div>New to this site? Please  <Link className="font-bold text-blue-500 cursor-pointer" to='/signUp'> Resgister</Link>  </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
