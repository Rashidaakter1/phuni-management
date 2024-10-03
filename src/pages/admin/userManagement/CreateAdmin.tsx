

import { toast } from "sonner"
import { TAdmin, TResponse, } from "../../../type"

import { zodResolver } from "@hookform/resolvers/zod"

import PHForm from "../../../components/form/PHForm"
import { Button, Col, Divider, Form, Input, Row, } from "antd"
import PHInput from "../../../components/form/PHInput"
import PHSelect from "../../../components/form/PHSelect"
import {  genderOptions } from "../../../constants/global"
import PHDatePicker from "../../../components/form/PHDatePicker"

import { Controller, FieldValues, SubmitHandler } from "react-hook-form"
import { createAdminValidationSchema } from "../../../schemas/userManagement.schema"
import { useAddAdminMutation } from "../../../redux/features/admin/userManangementApi"

const adminDefaultValues = {
  name: {
    firstName: 'I am ',
    middleName: 'Faculty',
    lastName: 'Number 1',
  },
  designation: "Head of Testing",
  gender: 'male',
  email: "bc@example.com",
  contactNo: '1235678',
  emergencyContactNo: '987-654-3210',
  presentAddress: '123 Main St, Cityville',
  permanentAddress: '456 Oak St, Townsville',
  profileImg: "",
  managementDepartment: "Management"
};
const CreateAdmin = () => {

  const [addAdmin] = useAddAdminMutation()
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const toastId = toast.loading("Pleas wait a moment...")

    const AdminData = {
      password: "admin123",
      admin: values
    }
    const formData = new FormData()
    formData.append("data", JSON.stringify(AdminData))
    formData.append("file", JSON.stringify(values.image))
    console.log(values.image)
    try {
      const res = (await addAdmin(formData) as TResponse<TAdmin>)
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res?.message, { id: toastId });
      }

    } catch (error) {
      toast.error("Something went wrong", {
        id: toastId, duration: 2000
      })
    }

  }
  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <PHForm onSubmit={onSubmit} defaultValues={adminDefaultValues} resolver={zodResolver(createAdminValidationSchema)}>
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
                <PHInput name="managementDepartment" label="Management Department" type="text" />
              </Col>
            </Row>
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Col>
      </Row>
    </>
  )
}

export default CreateAdmin