import { Button, Col } from 'antd';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import PHSelect from '../../../components/form/PHSelect';
import { useAddAcademicDeptMutation, useGetAcademicFacultyQuery } from '../../../redux/features/admin/academicManagementApi';
import { toast } from 'sonner';
import { TResponse } from '../../../type/global';
import { TAcademicDept } from '../../../type/academicManagement.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicDeptSchema } from '../../../schemas/academicManagement.schema';

const CreateAcademicDepartment = () => {
  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);


  const optionsData = academicFacultyData?.data?.map((faculty) => ({
    label: faculty.name,
    value: faculty._id,
  }));

  const [addDept] = useAddAcademicDeptMutation();

  const onSubmit = async (values: any) => {
    const deptData = {
      name: values?.name,
      academicFaculty: values?.academicFaculty
    }
    const toastId = toast.loading('Adding the Department...');
    try {
      console.log(deptData)
      const res = (await addDept(deptData)) as TResponse<TAcademicDept>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(res.message, { id: toastId, duration: 2000 });
      }
    } catch (error) {
      toast.error('Failed to add the Department', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Col span={6}>
      <PHForm onSubmit={onSubmit} resolver={zodResolver(academicDeptSchema)}>
        <PHInput name="name" label="Name" type="text" key="name" />
        {/* Ensure optionsData is properly passed */}
        <PHSelect name="academicFaculty" label="Academic Faculty" options={optionsData || []} />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Col>
  );
};

export default CreateAcademicDepartment;
