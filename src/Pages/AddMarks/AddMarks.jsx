import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useGetStudent from "../../hooks/useGetStudent";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetPassMark from "../../hooks/useGetPassMark";
import Swal from "sweetalert2";
import useGetExam from "../../hooks/useGetExam";
import useGetSingleUser from "../../hooks/useGetSingleUser";

const AddMarks = () => {
  //   const [students, setStudents] = useState([]);
  const [session, setSession] = useState(null);
  const [exam, setExam] = useState(null);
  const [group, setGroup] = useState(null);
  // const [subjectName, setSubjectName] = useState(null);
  const { user, singleUser } = useAuth();
  // const {singleUser} = useGetSingleUser()
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  // const subjectName = singleUser.subject;
  const subjectName = singleUser.subject;
  const [passMark] = useGetPassMark(subjectName);
  const { singleExam } = useGetExam(session, exam)
  console.log(singleUser);
  // const user =true
  const scienceSubject = [
    "Physics",
    "Chemistry",
    "Biology",
    "Higher Math",
    "English",
    "Bangla",
    "ICT",
  ];
  const humanitiesSubjects = [
    "Economics",
    "Political Science",
    "Social Work",
    "English",
    "Bangla",
    "ICT",
    "Agriculture Studies",
  ];
  const businessSubjects = [
    "Accounting",
    "Finance & Banking",
    "Management",
    "Political Science",
    "Social Work",
    "English",
    "Bangla",
    "ICT",
    "Agriculture Studies",
  ];


  const { students, refetch, isPending } = useGetStudent(session, exam, group);
  // console.log(students);
  const sortedStudents = students.sort((a, b) => a.roll - b.roll);


  const handleAddMarks = (e, student) => {
    e.preventDefault();
    const form = e.target;
    const cq = parseInt(form.cq.value) || form.cq.defaultValue;
    const mcq = parseInt(form.mcq.value) || form.cq.defaultValue || 0;

    let practical = parseInt(form.practical.value) || 0;
    let total = 0;
    if (
      cq < passMark.cqPass ||
      mcq < passMark.mcqPass ||
      (cq < passMark.cqPass && mcq < passMark.mcqPass)
    ) {
      if (
        student.fourthSubject === subjectName ||
        subjectName === "Agriculter Studies"
      ) {
        total = 0;
      } else {
        total = "Fail";
        practical = 0;
      }
    } else {
      total = cq + mcq + practical;
    }
    let addedGp = 0;
    if (total >= 80) {
      addedGp = 5;
    } else if (total >= 70) {
      addedGp = 4;
    } else if (total >= 60) {
      addedGp = 3.5;
    } else if (total >= 50) {
      addedGp = 3;
    } else if (total >= 40) {
      addedGp = 2;
    } else if (total >= 33) {
      addedGp = 1;
    } else {
      addedGp = "F";
    }
    if (
      student.fourthSubject === subjectName ||
      subjectName === "Agriculture Studies"
    ) {
      if (addedGp >= 2) {
        addedGp -= 2;
      } else {
        addedGp = 0;
      }
    }

    const marks = {
      cq,
      mcq,
      practical,
      total,
      addedGp,
    };
    console.log(marks);
    axiosPublic
      .patch(`/students/${student._id}`, {
        subjectName,
        marks,
        session,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
        }
      });
  };


  const handleSession = (e) => {
    // e.preventDefault();
    const session = e.target.value;

    setSession(session);
    // refetch()
  };
  const handleExam = (e) => {
    const exam = e.target.value;
    setExam(exam);
  };


  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-5">
        <span>Subject: {subjectName}</span>
      </div>
      <div className="my-5 flex flex-col md:flex-row w-full  mx-auto">
        <label htmlFor="">Session</label>
        <select onChange={handleSession} name="session" id="">
          <option value="">Select one</option>
          <option value="2023-24">2023-24</option>
          <option value="2024-25">2024-25</option>
        </select>
        <label htmlFor="">Exam: </label>
        <select onChange={handleExam} name="exam" id="">
          <option value="">Select one</option>
          <option value="Half Yearly">Half Yearly</option>
          <option value="Final">Final</option>
          <option value="Pre Test">Pre Test</option>
          <option value="Test">Test</option>
        </select>
        <label htmlFor="">Group</label>
        <select onChange={(e) => setGroup(e.target.value)} name="group" id="">
          <option value="">Select group</option>
          <option
            disabled={!scienceSubject.includes(subjectName)}
            value="Science"
          >
            Science
          </option>
          <option
            disabled={!humanitiesSubjects.includes(subjectName)}
            value="Humanities"
          >
            Humanities
          </option>
          <option
            disabled={!businessSubjects.includes(subjectName)}
            value="Business Studies"
          >
            Business Studies
          </option>
        </select>
      </div>
      {
        !session || !exam || !group ? null : isPending ? <div className="flex min-h-[50vh] justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div> : students.length > 0 ?
          <div>
            {sortedStudents.map((student) => (
              <form
                className="border w-full flex items-center justify-around gap-1 md:gap-5 py-3"
                onSubmit={(e) => handleAddMarks(e, student)}
                key={student._id}
              >
                <div className="btn btn-sm lg:btn-md text-xs md:text-base "> {student.roll} </div>
                <div className="flex gap-2 flex-col md:flex-row text-sm md:text-base ">
                  <label htmlFor="">CQ:</label>
                  <input className="w-10 md:w-24 border rounded-md "
                    placeholder={student[subjectName]?.cq}
                    defaultValue={student[subjectName]?.cq}
                    type="number"
                    name="cq"
                  />
                </div>
                <div className="flex gap-2 flex-col md:flex-row text-sm md:text-base ">
                  <label hidden={subjectName === "English"} htmlFor="">
                    MCQ:
                  </label>
                  <input
                    className="w-10 md:w-24 border rounded-md"
                    placeholder={student[subjectName]?.mcq}
                    defaultValue={student[subjectName]?.mcq}
                    hidden={subjectName === "English"}
                    type="number"
                    name="mcq"
                  />
                </div>
                <div className="flex gap-2 flex-col md:flex-row text-sm md:text-base ">
                  <label
                    hidden={
                      !(
                        subjectName === "ICT" ||
                        subjectName === "Biology" ||
                        subjectName === "Agriculture Studies" ||
                        subjectName === "Chemistry" ||
                        subjectName === "Higher Math" ||
                        subjectName === "Physics"
                      )
                    }
                    htmlFor=""
                  >
                    Practical:
                  </label>
                  <input
                    className="w-10 md:w-24 border rounded-md"
                    hidden={
                      !(
                        subjectName === "ICT" ||
                        subjectName === "Biology" ||
                        subjectName === "Agriculture Studies" ||
                        subjectName === "Chemistry" ||
                        subjectName === "Higher Math" ||
                        subjectName === "Physics"
                      )
                    }
                    placeholder={student[subjectName]?.practical}
                    defaultValue={student[subjectName]?.practical}
                    type="number"
                    name="practical"
                  />
                </div>
                <div className="flex flex-col md:flex-row w-12  gap-2 text-sm md:text-base ">
                  <label htmlFor="">Total:</label>
                  <div> {student[subjectName]?.total} </div>
                </div>
                <div className={!singleExam.isModificable && 'tooltip'} data-tip={!singleExam.isModificable && "Sorry, Unavialable"}>
                  <input

                    disabled={!singleExam.isModificable}
                    className="btn btn-sm md:btn-md"
                    type="submit"
                    value={student[subjectName]?.total ? "Modify" : "Input"}
                  />
                </div>

              </form>
            ))}
          </div> :
          <div className="flex justify-center min-h-[40vh] items-center">
            <h3>There is No student to add marks. Please contact the admin.</h3>
          </div>
      }

    </div>
  );
};

export default AddMarks;
