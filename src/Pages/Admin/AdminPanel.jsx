import axios from "axios";
import { useEffect, useState } from "react";
import useGetStudent from "../../hooks/useGetStudent";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetPassMark from "../../hooks/useGetPassMark";
const AdminPanel = () => {
  const [disable, setDisable] = useState(false);
  const [subject, setSubject] = useState("");
  const [examName, setExamName] = useState("");
  const [session, setsession] = useState("");
  const [group, setGroup] = useState(null)
  const axiosPublic = useAxiosPublic();
  
  const { students, refetch:refetch1 } = useGetStudent(session, examName, group);
//   console.log(students);
  // const [passMark, setPassMark] = useState('');
  // console.log(passMark);
  const [passMark, refetch2] = useGetPassMark(subject)
  const sortedStudents = students.sort((a,b)=>a.roll -b.roll)

  const { data: allStudents = [] } = useQuery({
    queryKey: ["students", session, examName],
    queryFn: () => {
      axiosPublic.get("/students");
    },
  });

  const handleGetPass = (e) => {
    const subject = e.target.value;
    setSubject(subject);
    refetch2();
  };

  const generateRollNumber = (e) => {
    e.preventDefault();
    const form = e.target;
    const group = form.group.value;
    const session = form.session.value;
    const exam = form.exam.value;
    const rollStart = parseInt(form.rollStart.value);
    const rollEnd = form.rollEnd.value;
    // console.log(group, rollStart, rollEnd);
    const students = [];
    for (let i = rollStart; i <= rollEnd; i++) {
      const singleStudent = {
        session,
        exam,
        group,
        roll: i,
      };
      students.push(singleStudent);
    }
   
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Create!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.post("http://localhost:5000/students", students).then((res) => {
          if (res.data.insertedId) {
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  // let disable = false;

  const handleDisable = (e) => {
    e.preventDefault();
    const form = e.target;
    const session = form.session.value;
    const exam = form.exam.value;
    console.log(session, exam);
    // disable = (!disable)

    setDisable(!disable);
    axios
      .patch("http://localhost:5000/students", { session, exam, disable })
      .then((res) => {
        if (!res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong! Try Again",
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  const handleSetPassMarks = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const cqPass = parseInt(form.cq.value) || form.cq.defaultValue
    const mcqPass = parseInt(form.mcq.value) || form.mcq.defaultValue || 0;
    // console.log(subject, cqPass, mcqPass);
    if (passMark) {
      axios
        .patch("http://localhost:5000/setpass", {
          subject,
          cqPass,
          mcqPass,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            // form.cq.target = '';
            // form.mcq.target = '';
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Pass Mark of ${subject} has been updated`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } else {
      axios
        .post("http://localhost:5000/setpass", {
          subject,
          cqPass,
          mcqPass,
        })
        .then((res) => {
          if (res.data.insertedId) {
            form.cq.target = "";
            form.mcq.target = "";
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Pass Mark of ${subject} has been saved`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };
  const handleSetFourthSubject = (e, id) => {
    e.preventDefault();
    const fourthSubject = e.target.fourthSub.value;
    console.log(fourthSubject, id);
    axiosPublic
      .patch(`/students/fourthSub/${id}`, { fourthSubject })
      .then((res) => {
        if(res.data.modifiedCount){
            console.log(res.data);
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
              });
              refetch1()
        }
      });
  };

  return (
    <div>
      <h2>Roll Generat</h2>
      <form onSubmit={generateRollNumber} className="mt-5 space-y-3">
        <label htmlFor="">Session: </label>
        <select name="session" id="">
          <option value="">Select one</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25"> 2024-25</option>
        </select>
        <label htmlFor="">Exam: </label>
        <select name="exam" id="">
          <option value="">Select one</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Final">Final</option>
          <option value="Pre Test">Pre Test</option>
          <option value="Test">Test</option>
        </select>
        <label htmlFor="">Group: </label>
        <select name="group" id="">
          <option value="">Select one</option>
          <option value="Science">Science</option>
          <option value="Humanities"> Humanities</option>
          <option value="Business Studies">Business Studies</option>
        </select>{" "}
        <br />
        <label htmlFor="">Roll: from</label>
        <input name="rollStart" type="number" />
        <label htmlFor=""> to </label>
        <input name="rollEnd" type="number" />
        <br />
        <button className=" btn">Generate</button>
      </form>

      {/* modification access */}
      <h2>Modification</h2>
      <form onSubmit={handleDisable}>
        <label>Session</label>
        <select
          onChange={(e) => setsession(e.target.value)}
          name="session"
          id=""
        >
          <option value="">Select One</option>
          <option value="2023-24">20223-24</option>
          <option value="2024-25">20224-25</option>
        </select>
        <label htmlFor="">Exam</label>
        <select onChange={(e) => setExamName(e.target.value)} name="exam" id="">
          <option value="">Select one</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Final">Final</option>
          <option value="Pre Test">Pre Test</option>
          <option value="Test">Test</option>
        </select>
        <label htmlFor="">Modification</label>
        <button className="btn" type="submit">
          Disable
        </button>
      </form>

      {/* setting pass mark */}
      <div className="border">
        <h3>Set Pass Mark</h3>
        <form onSubmit={handleSetPassMarks}>
          <label htmlFor="">Subject:</label>
          <select onChange={handleGetPass} name="subject" id="">
            <option value="">Select One</option>
            <option value="Bangla">Bangla</option>
            <option value="English">English</option>
            <option value="ICT">ICT</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chimistry</option>
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
          <label htmlFor="">CQ: </label>
          <input
            placeholder={passMark?.cqPass}
            defaultValue={passMark?.cqPass}
            name="cq"
            type="number"
          />
          <label hidden={subject === "English"} htmlFor="">
            MCQ:{" "}
          </label>
          <input
            hidden={subject === "English"}
            placeholder={passMark?.mcqPass}
            // placeholder="mcq"
            defaultValue={passMark?.mcqPass}
            name="mcq"
            type="number"
          />
          {passMark ? (
            <button className="btn">Update</button>
          ) : (
            <input className="btn" type="submit" value="Set" />
          )}
        </form>
      </div>

      {/* Setting fourth subject */}

      <div>
        <h3>Set Fourth Subject</h3>
        <form>
          <label htmlFor="">Session</label>
          <select
            onChange={(e) => setsession(e.target.value)}
            name="session"
            id=""
          >
            <option value="">Select one</option>
            <option value="2023-24">2023-24</option>
            <option value="2024-25">2024-25</option>
          </select>
          <label htmlFor="">Exam</label>
          <select
            onChange={(e) => setExamName(e.target.value)}
            name="exam"
            id=""
          >
            <option value="">Select one</option>
            <option value="Half Yearly">Half Yearly</option>
            <option value="Final">Final</option>
            <option value="Pre Test">Pre Test</option>
            <option value="Test">Test</option>
          </select>
          <select onChange={(e)=> setGroup(e.target.value)} name="group" id="">
            <option value="">Select One</option>
            <option value="Science">Science</option>
          </select>
        </form>
      </div>
      <h4>Total Student: {students.length} </h4>
      {sortedStudents.map((singleStudent) => (
        <div key={singleStudent._id}>
          <form onSubmit={(e) => handleSetFourthSubject(e, singleStudent._id)}>
            <label htmlFor="">Roll: {singleStudent.roll}</label>
            <select defaultValue={singleStudent.fourthSubject} name="fourthSub" id="">
              <option value=""> {
                singleStudent.fourthSubject ? singleStudent.fourthSubject : 'Select one'
                } </option>
              <option value="Higher Math">Higher Math</option>
              <option value="Biology">Biology</option>
            </select>
            <input className="btn btn-sm" type="submit" value="Submit" />
          </form>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
