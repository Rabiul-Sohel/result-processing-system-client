import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Exam = () => {
  const axiosPublic = useAxiosPublic();

  const { data: exams = [], refetch } = useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      const res = await axiosPublic.get("/exams");
      return res.data;
    },
  });
  console.log(exams);

  const handleExamInput = (e) => {
    e.preventDefault();
    const form = e.target;
    const session = form.session.value;
    const examName = form.exam.value;
    const isModificable = false;
    // console.log(session, exam);
    const exam = {
      session,
      examName,
      isModificable,
    };
    axiosPublic.post("/exams", exam).then((res) => {
      if (res.data.insertedId) {
        refetch();
      }
    });
  };

  const handleEnable = (id) => {
    const isModificable = true;
    axiosPublic
      .patch(`/exams/${id}`, { isModificable })
      .then((res) => {
        if(res.data.modifiedCount > 0){
            refetch()
        }
      });
  };
  const handleDisable = (id) => {
    const isModificable = false;
    axiosPublic
      .patch(`/exams/${id}`, { isModificable })
      .then((res) => {
        if(res.data.modifiedCount > 0){
            refetch()
        }
      });
  };

  const handleDelete = (id) => {
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
            axiosPublic.delete(`/exams/${id}`)
            .then(res =>{
                if(res.data.deletedCount > 0){
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    refetch()
                }
            })
          
        }
      });
   
  };

  return (
    <div>
      {/* modification access */}
      <h2>Modification</h2>
      <form onSubmit={handleExamInput}>
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
      </form>
      <div>
        <div className="overflow-x-auto mx-auto">
          <table className="table mx-auto">
            {/* head */}
            <thead>
              <tr className="text-center">
                <th></th>
                <th>Session</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {exams.map((exam, idx) => (
                <tr className="text-center" key={exam._id}>
                  <th> {idx + 1} </th>
                  <td> {exam.session} </td>
                  <td> {exam.examName} </td>
                  <td>
                    {
                        exam.isModificable ? <button
                        onClick={() => handleDisable(exam._id)}
                        className="btn"
                      >
                        Disable
                      </button>: <button
                      onClick={() => handleEnable(exam._id)}
                      className="btn"
                    >
                      Eanable
                    </button>
                    }
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="btn"
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
