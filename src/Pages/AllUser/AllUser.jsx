import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import User from "../../Component/User/User";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const AllUser = () => {
//   const [allUsers, setAllUsers] = useState([])
  const axiosPublic = useAxiosPublic();
  const {data:allUsers=[], refetch} = useQuery({
    queryKey: ['teacher'],
    queryFn: async()=>{
        const res = await axiosPublic.get("/allUsers")
        return res.data
         
    }
  })
 
//   useEffect(() => {
//     axiosPublic.get("/allUsers").then((res) => setAllUsers(res.data));
//   }, [axiosPublic]);

  const handleApproval = (user) =>{
    
    const id = user?._id;
    const name = user.name
    console.log(id);
    const isApproved = true
    axiosPublic.patch(`/users/approval/${id}`, {isApproved})
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name || 'Your user'} has been approved`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch()
            }
        })
  }

  const handleBlock = (user) =>{
    const id = user?._id;
    const name = user.name
    const isApproved = false
    axiosPublic.patch(`/users/approval/${id}`, {isApproved})
        .then(res => {
            if(res.data.modifiedCount > 0){
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${name || 'Your user'} has been block`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                  refetch()
            }
        })
  }

  const handleMakeAdmin = (id) =>{
    const isAdmin = true;
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Make Admin!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.patch(`/users/admin/${id}`, {isAdmin})
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Success",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          refetch()
                    }
                    
                })
         
        }
      });
  }
  const handleRemoveAdmin = (id) =>{
    const isAdmin = false;
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove Admin!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosPublic.patch(`/users/admin/${id}`, {isAdmin})
                .then(res => {
                    console.log(res.data)
                    if(res.data.modifiedCount > 0){
                        Swal.fire({
                            title: "Success",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                          refetch()
                    }
                    
                })
         
        }
      });
  }

  return (
    <div>
      <h2>All Users</h2>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="">
            <th>#</th>
            <th>Image</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Aproval</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, idx) => (
            <tr key={user._id}>
              <th> {idx + 1} </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={user.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{user.name}</div>
                  </div>
                </div>
              </td>
              <td>
                {user.email}       
              </td>
              <td> {user.subject} </td>
              <th>
                {
                    user.isApproved ? <button onClick={()=>handleBlock(user)} className="btn">Block</button> :<button onClick={()=>handleApproval(user)} className="btn">Approve</button> 
                }
              </th>
              <th>
               {
                user.isAdmin ? <button onClick={()=>handleRemoveAdmin(user._id)} className="btn">Remove as Admin</button>:  <button onClick={()=> handleMakeAdmin(user._id)} className="btn">Make Admin</button>
               } 
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUser;
