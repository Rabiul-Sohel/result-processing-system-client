import { useState } from "react";
import useGetStudent from "../../hooks/useGetStudent";

const Result = () => {
  const [session, setSession] = useState(null);
  const [exam, setExam] = useState(null);
  const [group, setGroup] = useState(null);
  const { students, isPending } = useGetStudent(session, exam, group);
  // const [message, setMassage] = useState('')
  const sortedStudents = students.sort((a, b) => a.roll - b.roll);



  const handleFinalResult = (student) => {
    const banglaGp = student.Bangla?.addedGp;
    const englishGp = student.English?.addedGp;
    const ictGp = student.ICT?.addedGp;
    const commonSubjecGp = banglaGp + englishGp + ictGp;
    let groupSubjectGp = 0

    if (student.group === "Science") {
      const physicsGp = student.Physics?.addedGp;
      const chemistryGp = student.Chemistry?.addedGp;
      const biologyGp = student.Biology?.addedGp;
      const higherMathGp = student["Higher Math"]?.addedGp;
      groupSubjectGp =
        physicsGp +
        chemistryGp +
        biologyGp +
        higherMathGp;
    } else if (student.group === "Humanities") {
      const economicsGp = student.Economics?.addedGp;
      const politicalScienceGp = student['Political Science']?.addedGp;
      const socialWorkGp = student['Social Work']?.addedGp;
      const agricultureStudiesGp = student["Agriculture Studies"]?.addedGp;
      groupSubjectGp =
        economicsGp +
        politicalScienceGp +
        socialWorkGp +
        agricultureStudiesGp;
    } else {
      const accountingGp = student.Accounting?.addedGp;
      const managementGp = student.Management?.addedGp;
      const financeBankingGp = student['Finance & Banking']?.addedGp;
      const agricultureStudiesGp = student["Agriculture Studies"]?.addedGp;
      groupSubjectGp =
        accountingGp +
        managementGp +
        financeBankingGp +
        agricultureStudiesGp;
    }
    const totalGp = commonSubjecGp + groupSubjectGp

    const gpa = (totalGp / 6).toFixed(2);

    if (!isNaN(gpa)) {
      return gpa;
    } else {
      return "Fail";
    }


  };
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className=" flex justify-center gap-2 items-center">
          <div>
            <label className="" htmlFor="">Session:</label>
            <select
              onChange={(e) => setSession(e.target.value)}
              name="session"
              id=""

            >
              <option value="">Select one</option>
              <option value="2023-24">2023-24</option>
              <option value="2024-25">2024-25</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Exam: </label>
            <select onChange={(e) => setExam(e.target.value)} name="exam" id="" >
              <option value="">Select one</option>
              <option value="Half Yearly">Half Yearly</option>
              <option value="Final">Final</option>
              <option value="Pre Test">Pre Test</option>
              <option value="Test">Test</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Group:</label>
            <select onChange={(e) => setGroup(e.target.value)} name="group" id="" >
              <option value="">Select group</option>
              <option value="Science">Science</option>
              <option value="Humanities">Humanities</option>
              <option value="Business Studies">Business Studies</option>
            </select>
          </div>

        </div>
        <div>
          {
            students.length > 0 && <button onClick={() => window.print()} className="btn">Print</button>
          }
        </div>
      </div>
      {
        isPending ? <div className="flex min-h-[50vh] justify-center items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div> : <div>
          {
            !session || !group || !exam ? null
              : students.length > 0 ? <table className="table">
                {/* head */}
                <thead className="text-center ">
                  <tr>
                    <th className="border">Roll</th>
                    <th className="border">
                      <span>Bangla</span> <br />
                      (CQ, MCQ, Total, GP)
                    </th>
                    <th className="border">
                      <span>English</span> <br />
                      <span>(Total, GP)</span>
                    </th>
                    <th className="border">
                      <span>ICT</span> <br />
                      <span>(CQ, MCQ, Pr., Total, GP)</span>
                    </th>
                    <th className="border">
                      {" "}
                      {(group === "Science" && (
                        <div>
                          <span>Physics</span> <br />
                          <span>(CQ, MCQ, Pr., Total, GP)</span>
                        </div>
                      )) ||
                        (group === "Humanities" && (
                          <div>
                            <span>Economics</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        )) ||
                        (group === "Business Studies" && (
                          <div>
                            <span>Accounting</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        ))}{" "}
                    </th>
                    <th className="border">
                      {(group === "Science" && (
                        <div>
                          <span>Chemistry</span> <br />
                          <span>(CQ, MCQ, Pr., Total, GP)</span>
                        </div>
                      )) ||
                        (group === "Humanities" && (
                          <div>
                            <span>Political Science</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        )) ||
                        (group === "Business Studies" && (
                          <div>
                            <span>Management</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        ))}
                    </th>
                    <th className="border">
                      {(group === "Science" && (
                        <div>
                          <span>Biology</span> <br />
                          <span>(CQ, MCQ, Pr., Total, GP)</span>
                        </div>
                      )) ||
                        (group === "Humanities" && (
                          <div>
                            <span>Social Work</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        )) ||
                        (group === "Business Studies" && (
                          <div>
                            <span>Finance & Banking</span> <br />
                            <span>(CQ, MCQ, Total, GP)</span>
                          </div>
                        ))}
                    </th>
                    <th className="border">
                      {(group === "Science" && (
                        <div>
                          <span>Higher Math</span> <br />
                          <span>(CQ, MCQ, Pr., Total, GP)</span>
                        </div>
                      )) ||
                        (!(group === "Science") && (
                          <div>
                            <span>Agriculture Studies</span> <br />
                            <span>(CQ, MCQ, Pr. Total, GP)</span>
                          </div>
                        ))}
                    </th>
                    <th className="border">Result</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {/* row 1 */}
                  {sortedStudents.map((student) => (
                    <tr key={student._id}>
                      <th className="border"> {student.roll} </th>
                      <td className="border space-x-3">
                        {" "}
                        <span className="">{student.Bangla?.cq}</span>{" "}
                        <span>{student.Bangla?.mcq}</span>{" "}
                        <span>{student.Bangla?.total}</span>
                        <span>{student.Bangla?.addedGp}</span>
                      </td>
                      <td className="border">
                        {" "}
                        <span className="mr-3">{student.English?.cq}</span>{" "}
                        <span> {student.English?.addedGp} </span>{" "}
                      </td>
                      <td className="border">
                        {" "}
                        <div className=" space-x-2">
                          <span>{student.ICT?.cq}</span>
                          <span>{student.ICT?.mcq}</span>
                          <span>{student.ICT?.practical}</span>{" "}
                          <span>{student.ICT?.total}</span>
                          <span>{student.ICT?.addedGp}</span>
                        </div>{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {(group === "Science" && (
                          <div className=" space-x-2">
                            <span>{student.Physics?.cq}</span>
                            <span>{student.Physics?.mcq}</span>
                            <span>{student.Physics?.practical}</span>{" "}
                            <span>{student.Physics?.total}</span>
                            <span>{student.Physics?.addedGp}</span>
                          </div>
                        )) ||
                          (group === "Humanities" && (
                            <div className="space-x-2">
                              <span >{student.Economics?.cq}</span>{" "}
                              <span>{student.Economics?.mcq}</span>{" "}
                              <span>{student.Economics?.total}</span>
                              <span>{student.Economics?.addedGp}</span>
                            </div> || (group === "Business Studies" && (
                              <div className="space-x-2">
                                <span>{student.Accounting?.cq}</span>{" "}
                                <span>{student.Accounting?.mcq}</span>{" "}
                                <span>{student.Accounting?.total}</span>
                                <span>{student.Accounting?.addedGp}</span>
                              </div>
                            ))
                          ))}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {(group === "Science" && (
                          <div className=" space-x-2">
                            <span>{student.Chemistry?.cq}</span>
                            <span>{student.Chemistry?.mcq}</span>
                            <span>{student.Chemistry?.practical}</span>{" "}
                            <span>{student.Chemistry?.total}</span>
                            <span>{student.Chemistry?.addedGp}</span>
                          </div>
                        )) ||
                          (group === "Humanities" && (
                            <div className="space-x-2">
                              <span>{student['Political Science']?.cq}</span>{" "}
                              <span>{student['Political Science']?.mcq}</span>{" "}
                              <span>{student['Political Science']?.total}</span>
                              <span>{student['Political Science']?.addedGp}</span>
                            </div> || (group === "Business Studies" && (
                              <div className="space-x-2">
                                <span>{student.Management?.cq}</span>{" "}
                                <span>{student.Management?.mcq}</span>{" "}
                                <span>{student.Management?.total}</span>
                                <span>{student.Management?.addedGp}</span>
                              </div>
                            ))
                          ))}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {(group === "Science" && (
                          <div className=" space-x-2">
                            <span>{student.Biology?.cq}</span>
                            <span>{student.Biology?.mcq}</span>
                            <span>{student.Biology?.practical}</span>{" "}
                            <span>{student.Biology?.total}</span>
                            <span>{student.Biology?.addedGp}</span>
                          </div>
                        )) ||
                          (group === "Humanities" && (
                            <div className="space-x-2">
                              <span>{student['Social Work']?.cq}</span>{" "}
                              <span>{student['Social Work']?.mcq}</span>{" "}
                              <span>{student['Social Work']?.total}</span>
                              <span>{student['Social Work']?.addedGp}</span>
                            </div> || (group === "Business Studies" && (
                              <div className="space-x-2">
                                <span>{student['Finance & Banking']?.cq}</span>{" "}
                                <span>{student['Finance & Banking']?.mcq}</span>{" "}
                                <span>{student['Finance & Banking']?.total}</span>
                                <span>{student['Finance & Banking']?.addedGp}</span>
                              </div>
                            ))
                          ))}{" "}
                      </td>
                      <td className="border">
                        {" "}
                        {(group === "Science" && (
                          <div className=" space-x-2">
                            <span>{student['Higher Math']?.cq}</span>
                            <span>{student['Higher Math']?.mcq}</span>
                            <span>{student['Higher Math']?.practical}</span>{" "}
                            <span>{student['Higher Math']?.total}</span>
                            <span>{student['Higher Math']?.addedGp}</span>
                          </div>
                        )) ||
                          (!(group === "Science") && (
                            <div className=" space-x-2">
                              <span>{student['Agriculture Studies']?.cq}</span>
                              <span>{student['Agriculture Studies']?.mcq}</span>
                              <span>{student['Agriculture Studies']?.practical}</span>{" "}
                              <span>{student['Agriculture Studies']?.total}</span>
                              <span>{student['Agriculture Studies']?.addedGp}</span>
                            </div>
                          ))}{" "}
                      </td>
                      <td className="border"> {handleFinalResult(student)} </td>
                    </tr>
                  ))}
                </tbody>
              </table> : <div className="flex min-h-[50vh] justify-center items-center">
                <span className="text-primary">There is no content</span>
              </div>

          }
        </div>
      }




    </div>
  );
};

export default Result;
