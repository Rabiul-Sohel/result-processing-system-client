import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  // const [image, setImage] = useState(null)
  const { createUser } = useAuth()
  const navigate = useNavigate()
  // console.log(createUser);


  // console.log(imageHostingKey);
  const axiosPublic = useAxiosPublic()

  const handleImage = e => {
    const image = e.target.files[0];
    // setImage(image)
    console.log(image);
  }

  const handleRegister = e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const password = form.password.value;
    const image = form.image.files[0]
    createUser(email, password)
      .then(res => {
        if (res.user) {
          const user = {
            name,
            email,
            subject
          }
          axiosPublic.post('/users', user)
            .then(res => {
              console.log(res.data);

            })
          navigate('/')
        }
      })
      .catch(err => console.log(err))
    let imageUrl = {}

  }
  return (
    <div className="w-full">
      <div className="max-w-sm mx-auto border rounded-md p-4">
        <h2 className="text-3xl font-bold text-center">Please Register</h2>
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"

            />
          </div>
          <label className="text-start"> Image </label>
          <input name="image" type="file" />
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
          <div className="flex flex-col md:flex-row mt-3 gap-5">
            <label htmlFor="">Subject:</label>
            <select name="subject"
              required id="">
              <option value="">Select One</option>
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
              <option value="ICT">ICT</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Higher Math">Higher Math</option>
              <option value="Economics">Economics</option>
              <option value="Political Science">Political Science</option>
              <option value="Social Work">Social Work</option>
              <option value="Accounting">Accounting</option>
              <option value="Management">Management</option>
              <option value="Finance">Finance & Banking</option>
              <option value="Agriculture Studies">Agriculture Studies</option>
            </select>

          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              name="password"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
        <div>
          Registered? Please{" "}
          <Link
            className="font-bold text-blue-500 cursor-pointer"
            to="/login"
          >
            {" "}
            Login
          </Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Signup;
