import { Button, Col } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHSelect from "../../../components/form/PHSelect"
import { semesterOptions } from "../../../constants/semeter";
import { monthOptions } from "../../../constants/global";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { zodResolver } from '@hookform/resolvers/zod';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
    const onSubmit = async (values: any) => {
        const semesterName = semesterOptions[Number(values.name) - 1].label
        const semesterData = {
            name: semesterName,
            code: values.name,
            year: values.year,
            startMonth: values.startMonth,
            endMonth: values.endMonth
        }

        console.log(semesterData);
    }
    return (
        <Col span={6}>
            <PHForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
                <PHSelect name="name" label="Name" options={semesterOptions} />
                <PHSelect name="year" label="Year" options={yearOptions} />
                <PHSelect name="startMonth" label="Start Month" options={monthOptions} />
                <PHSelect name="endMonth" label="End Month" options={monthOptions} />
                <Button htmlType="submit">Submit</Button>
            </PHForm>

        </Col>
    )
}

export default CreateAcademicSemester