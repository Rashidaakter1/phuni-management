import { useGetAcademicSemesterQuery } from "../../../redux/features/academicSemester/academicSemesterApi"


const AcademicSemester = () => {
    const { data } = useGetAcademicSemesterQuery(undefined)
    console.log(data)
    return (
        <div>academicSemester</div>
    )
}

export default AcademicSemester