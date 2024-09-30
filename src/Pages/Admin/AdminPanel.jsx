import axios from "axios";
import { useEffect, useState } from "react";
import useGetStudent from "../../hooks/useGetStudent";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetPassMark from "../../hooks/useGetPassMark";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetExam from "../../hooks/useGetExam";
const AdminPanel = () => {
  // const [disable, setDisable] = useState(false);
  const [subject, setSubject] = useState("");
  const [examName, setExamName] = useState("");
  const [session, setsession] = useState("");
  const [group, setGroup] = useState(null)
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure()
  // const { singleExam, refetch: refetch3 } = useGetExam(session, examName)
  // console.log(singleExam);

  const { students, refetch: refetch1 } = useGetStudent(session, examName, group);

  const [passMark, refetch2] = useGetPassMark(subject)
  const sortedStudents = students.sort((a, b) => a.roll - b.roll)


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
    const isModificable = false
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
    const singleExam = {
      session,
      exam,
      isModificable,
    };

    Swal.fire({
      title: "Please check first. It can be duplicate!",
      text: `${session}, ${exam}, ${group}, Roll: ${rollStart} to ${rollEnd}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Create!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.post("/students", students).then((res) => {
          console.log(res.data);
          if (res.data.insertedCount > 0) {
            Swal.fire({
              title: "Inserted!",
              text: "Your file has been inserted.",
              icon: "success",
            });
            axiosPublic.post("/exams", singleExam).then((res) => {
              console.log('exam insert');
            });
           
          }
        });
      }
    });
  };
  // let disable = false;

  // const handleDisable = (e) => {
  //   e.preventDefault();
  //   // const form = e.target;
  //   // const session = form.session.value;
  //   // const exam = form.exam.value;
  //   // setExamName(exam)
  //   // setsession(session)
  //   // console.log(session, exam);
  //  const isModificable = (!singleExam.isModificable);
  //   axiosPublic
  //     .patch(`/exam`, {session, examName, isModificable })
  //     .then((res) => {
  //       if (res.data.modifiedCount > 0) {
  //         Swal.fire({
  //           position: "top-end",
  //           icon: "success",
  //           title: "Your work has been saved",
  //           showConfirmButton: false,
  //           timer: 1500,
  //         });
  //         refetch3()
  //       }

  //     });
  // };
  const handleSetPassMarks = (e) => {

    e.preventDefault();
    const form = e.target;
    const subject = form.subject.value;
    const cqPass = parseInt(form.cq.value) || form.cq.defaultValue
    const mcqPass = parseInt(form.mcq.value) || form.mcq.defaultValue || 0;
    // console.log(subject, cqPass, mcqPass);
    if (passMark) {
      axiosPublic
        .patch("/setpass", {
          subject,
          cqPass,
          mcqPass,
        })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            form.cq.value = '';
            form.mcq.value = '';
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
      axiosPublic
        .post("/setpass", {
          subject,
          cqPass,
          mcqPass,
        })
        .then((res) => {
          if (res.data.insertedId) {
            form.cq.value = "";
            form.mcq.value = "";
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
        if (res.data.modifiedCount) {
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
      <div className="border rounded-md  ">
        <h2 className="bg-red-400 text-white rounded-t-md font-bold">Roll Generate</h2>
        <h4 className="text-red-500 mt-3">Warning: Please verify whether rolls are existed! </h4>
        <form onSubmit={generateRollNumber} className="mt-2 text-sm  flex flex-col gap-3 justify-between md:flex-row items-center mb-5 mx-3">
          <div><label htmlFor="">Session: </label>
            <select name="session" id="">
              <option value="">Select one</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25"> 2024-25</option>
            </select></div>
          <div><label htmlFor="">Exam: </label>
            <select name="exam" id="">
              <option value="">Select one</option>
              <option value="Half Yearly">Half Yearly</option>
              <option value="Final">Final</option>
              <option value="Pre Test">Pre Test</option>
              <option value="Test">Test</option>
            </select></div>
          <div className="">
            <label htmlFor="">Group: </label>
            <select name="group" id="">
              <option value="">Select one</option>
              <option value="Science">Science</option>
              <option value="Humanities"> Humanities</option>
              <option value="Business Studies">Business Studies</option>
            </select>{" "}
          </div>
          <div>

            <div className="flex justify-between items-center gap-2">
              <label htmlFor="">Roll: </label>
              <label htmlFor="">from </label>
              <input className="w-16 border rounded-md" name="rollStart" type="number" />
              <label htmlFor=""> to </label>
              <input className="w-16 border rounded-md " name="rollEnd" type="number" />

            </div>
          </div>
          <button className=" btn">Generate</button>
        </form>
      </div>

      {/* modification access */}
      {/* <div className="border my-3 rounded-md ">
        <h2 className="bg-green-400 rounded-t-md font-bold text-white">Modification</h2>
        <form className="flex flex-col md:flex-row justify-center items-center gap-3 my-3" >
          <div>
            <label>Session:</label>
            <select
              onChange={(e) => setsession(e.target.value)}
              name="session"
              id=""
            >
              <option value="">Select One</option>
              <option value="2023-24">20223-24</option>
              <option value="2024-25">20224-25</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Exam:</label>
            <select onChange={(e) => setExamName(e.target.value)} name="exam" id="">
              <option value="">Select one</option>
              <option value="Half Yearly">Half Yearly</option>
              <option value="Final">Final</option>
              <option value="Pre Test">Pre Test</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div>
            {
              singleExam && <button onClick={handleDisable} className="btn" type="submit">
              {
                singleExam?.isModificable ? 'Disable' : 'Enable'
              }
            </button>
            }


          </div>
        </form>
      </div> */}

      {/* setting pass mark */}
      <div className="border rounded-md my-5">
        <h3 className="bg-green-500 rounded-t-md text-white font-bold">Set Pass Mark</h3>
        <form className="my-3 flex flex-col md:flex-row justify-center items-center gap-3" onSubmit={handleSetPassMarks}>
          <div className="flex gap-2">
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
          </div>
          <div className="flex gap-2">
            <label htmlFor="">CQ: </label>
            <input
              className="border w-16 rounded-md"
              placeholder={passMark?.cqPass}
              defaultValue={passMark?.cqPass}
              name="cq"
              type="number"
            />
          </div>
          <div className="flex gap-2">
            <label hidden={subject === "English"} htmlFor="">
              MCQ:{" "}
            </label>
            <input
              className="border w-16 rounded-md"
              hidden={subject === "English"}
              placeholder={passMark?.mcqPass}
              // placeholder="mcq"
              defaultValue={passMark?.mcqPass}
              name="mcq"
              type="number"
            />
          </div>
          <div>
            {passMark ? (
              <button className="btn">Update</button>
            ) : (
              <input className="btn" type="submit" value="Set" />
            )}
          </div>
        </form>
      </div>

      {/* Setting fourth subject */}

      <div className="border rounded-md">
        <h3 className="bg-red-700 rounded-t-md text-white font-bold">Set Fourth Subject</h3>
        <form className="my-3 flex flex-col md:flex-row justify-center gap-3">
          <div>
            <label htmlFor="">Session:</label>
            <select
              onChange={(e) => setsession(e.target.value)}
              name="session"
              id=""
            >
              <option value="">Select one</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Exam:</label>
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
          </div>

          <div>
            <label htmlFor="">Group:</label>
            <select onChange={(e) => setGroup(e.target.value)} name="group" id="">
              <option value="">Select One</option>
              <option value="Science">Science</option>
            </select>
          </div>
        </form>
        <div className="max-w-md mx-auto mb-5">
          <h4 className="mb-3 bg-green-800 text-white"> {students && `Total Student: ${students.length}`} </h4>
          {sortedStudents.map((singleStudent) => (
            <div className=" border p-2 rounded-md" key={singleStudent._id}>
              <form className="flex justify-between  gap-4 " onSubmit={(e) => handleSetFourthSubject(e, singleStudent._id)}>
                <label htmlFor="">Roll: {singleStudent.roll}</label>
                <select defaultValue={singleStudent.fourthSubject} name="fourthSub" id="">
                  <option value=""> {
                    singleStudent.fourthSubject ? singleStudent.fourthSubject : 'Select one'
                  } </option>
                  <option value="Higher Math">Higher Math</option>
                  <option value="Biology">Biology</option>
                </select>
                <input className="btn btn-sm w-20" type="submit" value={singleStudent.fourthSubject ? 'Update' : 'Set'} />
              </form>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;
