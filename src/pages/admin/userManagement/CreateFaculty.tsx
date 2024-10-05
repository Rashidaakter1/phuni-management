
import { toast } from "sonner"
import { TFaculty, TResponse } from "../../../type"
import { useAddFacultyMutation } from "../../../redux/features/admin/userManangementApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { createFacultyValidationSchema } from "../../../schemas/userManagement.schema"
import PHForm from "../../../components/form/PHForm"
import { Button, Col, Divider, Form, Input, Row } from "antd"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import { bloodGroupOptions, genderOptions } from "../../../constants/global"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { useGetAcademicDeptQuery, useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagementApi"
import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
const facultyDefaultValues = {
    name: {
        firstName: 'Amin',
        middleName: 'Faculty',
        lastName: 'Number 1',
    },
    designation: "Professor",
    gender: 'male',
    email: "mirahsd@example.com",
    bloodGroup: 'A+',
    contactNo: '1235678',
    emergencyContactNo: '987-654-3210',
    presentAddress: '123 Main St, Cityville',
    permanentAddress: '456 Oak St, Townsville',


};
const CreateFaculty = () => {
    const { data: academicFacultyData, isLoading: academicFacultyLoading } = useGetAcademicFacultyQuery(undefined)
    const { data: academicDepartmentData, isLoading: dIsLoading } = useGetAcademicDeptQuery(undefined, { skip: academicFacultyLoading })

    const academicFacultyOptions = academicFacultyData?.data?.map(data => ({
        label: `${data.name}`,
        value: data._id
    }))

    const departmentOptions = academicDepartmentData?.data?.map(data => ({
        label: data.name,
        value: data._id
    }))


    const [addFaculty] = useAddFacultyMutation()

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        const toastId = toast.loading("Please wait a moment...")

        const facultyData = {
            password: "faculty123",
            faculty: values
        }
        const formData = new FormData()
        formData.append("data", JSON.stringify(facultyData))
        formData.append("file", values.image)
        console.log(values.image)
        try {
            const res = (await addFaculty(formData) as TResponse<any>)
            console.log(res);
            if (res.error) {
                toast.error(res.error.data.message, { id: toastId });
            } else {
                toast.success(res?.data?.message, { id: toastId });
            }

        } catch (error) {
            toast.error("Something went wrong", {
                id: toastId, duration: 2000
            })
        }


    }
    return (
        <Row justify="center">
            <Col span={24}>
                <PHForm onSubmit={onSubmit} defaultValues={facultyDefaultValues}
                // resolver={zodResolver(createFacultyValidationSchema)}
                >
                    <Divider>Personal Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.firstName" label="First Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.middleName" label="Middle Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="name.lastName" label="Last Name" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="designation" label="Designation" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect options={genderOptions} name="gender" label="Gender" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHDatePicker name="dateOfBirth" label="Date of birth" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                options={bloodGroupOptions}
                                name="bloodGroup"
                                label="Blood group"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <Controller
                                name="image"
                                render={({ field: { onChange, value, ...field } }) => (
                                    <Form.Item label="Picture">
                                        <Input
                                            type="file"
                                            value={value?.fileName}
                                            {...field}
                                            onChange={(e) => onChange(e.target.files?.[0])}
                                        />
                                    </Form.Item>
                                )}
                            />
                        </Col>
                    </Row>
                    <Divider>Contact Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="email" label="Email" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput type="text" name="contactNo" label="Contact" />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="emergencyContactNo"
                                label="Emergency Contact"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="presentAddress"
                                label="Present Address"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHInput
                                type="text"
                                name="permanentAddress"
                                label="Permanent Address"
                            />
                        </Col>
                    </Row>
                    <Divider>Academic Info.</Divider>
                    <Row gutter={8}>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                options={academicFacultyOptions}
                                disabled={academicFacultyLoading}
                                name="academicFaculty"
                                label="Academic Faculty"
                            />
                        </Col>
                        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                            <PHSelect
                                options={departmentOptions}
                                disabled={dIsLoading}
                                name="academicDepartment"
                                label="Admission Department"
                            />
                        </Col>
                    </Row>
                    <Button htmlType="submit">Submit</Button>
                </PHForm>
            </Col>
        </Row>
    )
}

export default CreateFaculty