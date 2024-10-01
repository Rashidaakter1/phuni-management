import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi"



const AcademicSemester = () => {
    const { data } = useGetAcademicSemesterQuery(undefined)
    console.log(data)
    return (
        <div>academicSemester</div>
    )
}

export default AcademicSemester