import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import useGetStudent from "../../hooks/useGetStudent";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useGetPassMark from "../../hooks/useGetPassMark";
import Swal from "sweetalert2";

const AddMarks = () => {
  //   const [students, setStudents] = useState([]);
  const [session, setSession] = useState(null);
  const [exam, setExam] = useState(null);
  const [group, setGroup] = useState(null);
  // const [subjectName, setSubjectName] = useState(null);
  const { user, singleUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const subjectName = singleUser.subject;
  const [passMark] = useGetPassMark(subjectName);
  console.log(singleUser);
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

  const { data: singleExam = {} } = useQuery({
    queryKey: ["exam", session, exam],
    queryFn: async () => {
      const res = axiosPublic.get(
        `/singlExam?session=${session}&&exam=${exam}`
      );
      return res.data;
    },
  });
  //   console.log(singlExam);
  // //   TODO: user
  // // const userSubject = 'Bangla'
  // useEffect(()=>{
  //   getListedUser(user?.email)
  //     .then(res => setSubjectName(res.data?.subject))
  // },[getListedUser, user])

  // const subjectName = listedUser.subject;
  // console.log(subjectName);
  const { students, refetch } = useGetStudent(session, exam, group);
  console.log(students);
  const sortedStudents = students.sort((a, b) => a.roll - b.roll);

  //   useEffect(() => {
  //     axios
  //       .get(`http://localhost:5000/students?session=${session}`)
  //       .then((res) => setStudents(res.data));
  //   }, [session]);

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
    axios
      .patch(`http://localhost:5000/students/${student._id}`, {
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
    e.preventDefault();
    const session = e.target.value;

    // axios
    //   .get(`http://localhost:5000/students?session=${session}`)
    //   .then((res) => setStudents(res.data));

    setSession(session);
    // refetch()
  };
  const handleExam = (e) => {
    if(!singleUser.isApproved){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please wait for approval",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
    e.preventDefault();
    setExam(e.target.value);
  };
  // const handleSetPass = e =>{
  //   e.preventDefault()
  //   const form = e.target;
  //   const cqPass = parseInt(form.cq.value);
  //   const mcqPass = parseInt(form.mcq.value);
  //   setCqPass(cqPass)
  //   setMcqPass(mcqPass)
  //   console.log(cqPass, mcqPass);
  // }

  return (
    <div>
      <div>
        <span>Subject: {subjectName}</span>
      </div>

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
      {sortedStudents.map((student) => (
        <form
          className="border flex items-center justify-around gap-5 py-3"
          onSubmit={(e) => handleAddMarks(e, student)}
          key={student._id}
        >
          <div className="btn"> {student.roll} </div>
          <div className="flex flex-col">
            <label htmlFor="">CQ</label>
            <input
              placeholder={student[subjectName]?.cq}
              defaultValue={student[subjectName]?.cq}
              type="number"
              name="cq"
            />
          </div>
          <div className="flex flex-col">
            <label hidden={subjectName === "English"} htmlFor="">
              MCQ
            </label>
            <input
              placeholder={student[subjectName]?.mcq}
              defaultValue={student[subjectName]?.mcq}
              hidden={subjectName === "English"}
              type="number"
              name="mcq"
            />
          </div>
          <div className="flex flex-col">
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
              Practical
            </label>
            <input
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
          <div className="flex flex-col">
            <label htmlFor="">Total</label>
            <div className=""> {student[subjectName]?.total} </div>
          </div>
          <input
            disabled={!student.modifiable}
            className="btn"
            type="submit"
            value={student[subjectName]?.total ? "Modify" : "Input"}
          />
        </form>
      ))}
    </div>
  );
};

export default AddMarks;
