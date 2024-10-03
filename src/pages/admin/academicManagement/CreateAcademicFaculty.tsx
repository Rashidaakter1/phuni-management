
import { Button, Col } from 'antd'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { useAddAcademicFacultyMutation } from '../../../redux/features/admin/academicManagementApi'
import { toast } from 'sonner'
import { TResponse } from '../../../type/global'
import { TAcademicFaculty } from '../../../type/academicManagement.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { academicFacultySchema } from '../../../schemas/academicManagement.schema'

const CreateAcademicFaculty = () => {
  const [addFaculty] = useAddAcademicFacultyMutation()
  const onSubmit = async (values: any) => {
    console.log("first", values)
    const toastId = toast.loading("Adding the Faculty ..")
    try {
      const res = (await addFaculty(values) as TResponse<TAcademicFaculty>)
      if (res?.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 })
      }
      else {
        toast.success(res?.message, { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to add the Faculty", { id: toastId, duration: 2000 })
    }
  }
  return (
    <Col span={6}>
      <PHForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
        <PHInput name='name' label='Name' type='text' key="name" />
        <Button htmlType='submit'>Submit</Button>
      </PHForm>
    </Col>
  )
}

export default CreateAcademicFaculty