
import { Button, Col } from "antd"
import PHForm from "../../../components/form/PHForm"
import PHSelect from "../../../components/form/PHSelect"
import {  semesterStatusOptions } from "../../../constants/semeter";
import {  useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../type/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagementApi";


const CreateSemesterRegistration = () => {
    const [addSemester] = useAddRegisteredSemesterMutation()
    const { data: academicSemester } = useGetAcademicSemesterQuery([
        { name: 'sort', value: 'year' },
    ]);
    const academicSemesterOptions = academicSemester?.data?.map((item) => ({
        value: item._id,
        label: `${item.name} ${item.year}`,
    }));

    const onSubmit = async (values: any) => {
        const toastId = toast.loading("Please wait a moment...")

        const semesterData = {
            ...values,
            minCredit: Number(values.minCredit),
            maxCredit: Number(values.maxCredit),
        };

        console.log(semesterData);
        try {
            const res = (await addSemester(semesterData) as TResponse<any>)
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
            <PHForm onSubmit={onSubmit}>
                <PHSelect
                    label="Academic Semester"
                    name="academicSemester"
                    options={academicSemesterOptions}
                />
                <PHSelect
                    name="status"
                    label="Status"
                    options={semesterStatusOptions}
                />
                <PHDatePicker name="startDate" label="Start Date" />
                <PHDatePicker name="endDate" label="End Date" />
                <PHInput type="text" name="minCredit" label="Min Credit" />
                <PHInput type="text" name="maxCredit" label="Max Credit" />
                <Button htmlType="submit">Submit</Button>
            </PHForm>
        </Col>
    )
}

export default CreateSemesterRegistration