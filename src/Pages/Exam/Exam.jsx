import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Exam = () => {
  const axiosPublic = useAxiosPublic()
  // const students = useState([])
  

  const { data: exams = [], refetch, isPending } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await axiosPublic.get("/exams");
      return res.data;
    },
  });

  // const handleExamInput = (e) => {
  //   e.preventDefault();
  //   const form = e.target;
  //   const session = form.session.value;
  //   const examName = form.exam.value;
  //   const isModificable = false;
  //   // console.log(session, exam);
  //   const exam = {
  //     session,
  //     examName,
  //     isModificable,
  //   };
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: `${session} and ${examName}`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, Insert it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       axiosPublic.post("/exams", exam).then((res) => {
  //         if (res.data.insertedId) {
  //           Swal.fire({
  //             title: "Inserted!",
  //             text: "Your file has been Inserted.",
  //             icon: "success"
  //           });
  //           refetch();
  //         }
  //       });

  //     }
  //   });

  // };

  const handleEnable = (id) => {
    const isModificable = true;
    axiosPublic
      .patch(`/exams/${id}`, { isModificable })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exam has been enabled",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
        }
      });
  };
  const handleDisable = (id) => {
    const isModificable = false;
    axiosPublic
      .patch(`/exams/${id}`, { isModificable })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Exam has been Disabled",
            showConfirmButton: false,
            timer: 1500
          });
          refetch()
        }
      });
  };

  const handleDelete = (session, exam) => {
    console.log(session, exam);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/students?session=${session}&&exam=${exam}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              axiosPublic.delete(`/exams?session=${session}&&exam=${exam}`)
                .then(res => {
                  console.log(res.data);
                  if (res.data.deletedCount > 0) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success"
                    });
                    refetch()
                  }
                })

            }


          })


      }
    });

  };

  if(isPending){
    return <div className="flex min-h-[50vh] justify-center items-center">
            <span className="loading loading-spinner text-primary"></span>
        </div>
  }

  return (
    <div>
      {/* modification access */}
      <h2 className="text-white bg-green-500 mb-5">Exams</h2>
      {/* <form onSubmit={handleExamInput}>
        <label>Session</label>
        <select name="session" id="">
          <option value="">Select One</option>
          <option value="2023-24">20223-24</option>
          <option value="2024-25">20224-25</option>
        </select>
        <label htmlFor="">Exam</label>
        <select name="exam" id="">
          <option value="">Select one</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Final">Final</option>
          <option value="Pre Test">Pre Test</option>
          <option value="Test">Test</option>
        </select>
        <label htmlFor="">Modification</label>
        <button className="btn" type="submit">
          Insert
        </button>
      </form> */}
      <div>
        <div className="  mx-auto">
          <table className="text-sm lg:text-xl max-3xl border p-16 mx-auto">
            {/* head */}
            <thead className="mb-3">
              <tr className="text-center flex gap-2 md:gap-10 ">
                <th>#</th>
                <th>Session</th>
                <th>Name</th>
                <th className="">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {exams.map((exam, idx) => (
                <tr className="text-center flex gap-1 md:gap-10 items-center self-center border  py-2 px-0 md:px-2" key={exam._id}>
                  <th> {idx + 1}. </th>
                  <td> {exam.session} </td>
                  <td className=""> {exam.exam} </td>
                  <td className="flex gap-0 md:gap-2">
                    {
                      exam.isModificable ? <button
                        onClick={() => handleDisable(exam._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Disable
                      </button> : <button
                        onClick={() => handleEnable(exam._id)}
                        className="btn btn-primary btn-sm"
                      >
                        Eanable
                      </button>
                    }
                    <button
                      onClick={() => handleDelete(exam.session, exam.exam)}
                      className="btn btn-sm btn-error "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Exam;
