
import { useGetSingleStudentsQuery } from '../../../redux/features/admin/userManangementApi'
import { toast } from "sonner"
import { TResponse } from "../../../type"
import { useAddStudentMutation } from "../../../redux/features/admin/userManangementApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { createStudentValidationSchema } from "../../../schemas/userManagement.schema"
import PHForm from "../../../components/form/PHForm"
import { Button, Col, Divider, Form, Input, Row, } from "antd"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import { bloodGroupOptions, genderOptions } from "../../../constants/global"
import PHDatePicker from "../../../components/form/PHDatePicker"
import { useGetAcademicDeptQuery, useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagementApi"
import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { useParams } from 'react-router-dom'



const EditStudentDetails = () => {
  const { studentId } = useParams()
  const { data, } = useGetSingleStudentsQuery(studentId)
  const studentData = data?.data

  console.log(studentData);  // Logs the whole object in an expandable format
  const studentDefaultValues = data?.data
    ? {
      name: {
        firstName: studentData?.name?.firstName, // Use actual fetched data or empty string
        middleName: studentData?.name?.middleName || '',
        lastName: studentData?.name?.lastName || '',
      },
      gender: studentData?.gender || '',
      bloodGroup: studentData?.bloodGroup || '',
      contactNo: studentData?.contactNo || '',
      emergencyContactNo: studentData?.emergencyContactNo || '',
      presentAddress: studentData?.presentAddress || '',
      permanentAddress: studentData?.permanentAddress || '',
      email: studentData?.email || '',
      guardian: {
        fatherName: studentData?.guardian?.fatherName || '',
        fatherOccupation: studentData?.guardian?.fatherOccupation || '',
        fatherContactNo: studentData?.guardian?.fatherContactNo || '',
        motherName: studentData?.guardian?.motherName || '',
        motherOccupation: studentData?.guardian?.motherOccupation || '',
        motherContactNo: studentData?.guardian?.motherContactNo || '',
      },
      localGuardian: {
        name: studentData?.localGuardian?.name || '',
        occupation: studentData?.localGuardian?.occupation || '',
        contactNo: studentData?.localGuardian?.contactNo || '',
        address: studentData?.localGuardian?.address || '',
      },
      academicSemester: studentData?.admissionSemester || '',
      academicDepartment: studentData?.academicDepartment,
    }
    : {};

  const { data: academicSemeterData, isLoading: academicSemester } = useGetAcademicSemesterQuery(undefined)
  const { data: academicDepartmentData, isLoading: dIsLoading } = useGetAcademicDeptQuery(undefined, { skip: academicSemester })

  const semesterOptions = academicSemeterData?.data?.map(data => ({
    label: `${data.name} ${data.year}`,
    value: data._id
  }))

  const departmentOptions = academicDepartmentData?.data?.map(data => ({
    label: data.name,
    value: data._id
  }))



  const [addStudent] = useAddStudentMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Pleas wait a moment...")

    const studentData = {
      password: "student123",
      student: values
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(studentData))
    formData.append("file", values?.image)

    //! This is for development
    //! Just for checking
    console.log(values?.image)
    console.log(Object.fromEntries(formData));


    try {
      const res = (await addStudent(formData) as TResponse<any>)
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
    <>  <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}
          resolver={zodResolver(createStudentValidationSchema)}
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
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.occupation"
                label="Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.contactNo"
                label="Contact No."
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                type="text"
                name="localGuardian.address"
                label="Address"
              />
            </Col>
          </Row>
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions}
                disabled={academicSemester}
                name="admissionSemester"
                label="Admission Semester"
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
    </Row></>
  )
}

export default EditStudentDetails