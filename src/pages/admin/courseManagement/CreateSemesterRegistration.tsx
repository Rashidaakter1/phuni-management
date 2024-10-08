
import { Button, Col } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHSelect from "../../../components/form/PHSelect"
import { semesterOptions } from "../../../constants/semeter";
import { monthOptions } from "../../../constants/global";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../type/global";
import { TAcademicSemester } from "../../../type/academicManagement.type";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));
const CreateSemesterRegistration = () => {
    const [addAcademicSemester] = useAddAcademicSemesterMutation()
    const onSubmit = async (values: any) => {
        const toastId = toast.loading("Pleas wait a moment...")
        const semesterName = semesterOptions[Number(values.name) - 1].label
        const semesterData = {
            name: semesterName,
            code: values.name,
            year: values.year,
            startMonth: values.startMonth,
            endMonth: values.endMonth
        }
        try {
            const res = (await addAcademicSemester(semesterData) as TResponse<TAcademicSemester>)
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success('Semester created', { id: toastId });
            }

        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId, duration: 2000
            })
        }

    }
    return (
        <Col span={6}>
            <PHForm onSubmit={onSubmit}
            //  resolver={zodResolver(academicSemesterSchema)}
            
            >
                <PHSelect name="name" label="Name" options={semesterOptions} />
                <PHSelect name="year" label="Year" options={yearOptions} />
                <PHSelect name="startMonth" label="Start Month" options={monthOptions} />
                <PHSelect name="endMonth" label="End Month" options={monthOptions} />
                <Button htmlType="submit">Submit</Button>
            </PHForm>

        </Col>
    )
}

export default CreateSemesterRegistration