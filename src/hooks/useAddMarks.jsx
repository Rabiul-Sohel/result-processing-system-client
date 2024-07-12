

const useAddMarks = (subjectName, cq, mcq, practical = 0) => {
    const total = cq + mcq + practical
    subjectName = {
        cq,
        mcq,
        practical,
        total  
    }
    return subjectName
};

export default useAddMarks;