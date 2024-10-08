
import PHSelect from '../../../components/form/PHSelect'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { Button, Col, Flex } from 'antd'
import { TResponse } from '../../../type'
import { toast } from 'sonner'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagementApi'

const CreateCourse = () => {
    const [createCourse] = useAddCourseMutation();
    const { data: courses } = useGetAllCoursesQuery(undefined);

    console.log(courses)
    const preRequisiteCoursesOptions = courses?.data?.map((item: any) => ({
        value: item._id,
        label: item.title,
    }));

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading('Creating...');

        const courseData = {
            ...data,
            code: Number(data.code),
            credits: Number(data.credits),
            isDeleted: false,
            preRequisiteCourses: data.preRequisiteCourses
                ? data.preRequisiteCourses?.map((item: any) => ({
                    course: item,
                    isDeleted: false,
                }))
                : [],
        };

        console.log(courseData);

        try {
            const res = (await createCourse(courseData)) as TResponse<any>;
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }
        } catch (err) {
            toast.error('Something went wrong', { id: toastId });
        }
    };
    return (
        <div>
            <Col span={6}>
                <PHForm onSubmit={onSubmit}>
                    <PHInput type="text" name="title" label="Title" />
                    <PHInput type="text" name="prefix" label="Prefix" />
                    <PHInput type="text" name="code" label="Code" />
                    <PHInput type="text" name="credits" label="Credits" />
                    <PHSelect
                        mode="multiple"
                        options={preRequisiteCoursesOptions}
                        name="preRequisiteCourses"
                        label="preRequisiteCourses"
                    />
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </div>
    )
}

export default CreateCourse