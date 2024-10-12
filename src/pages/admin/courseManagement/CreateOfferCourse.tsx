

import PHSelect from '../../../components/form/PHSelect'
import PHForm from '../../../components/form/PHForm'
import PHInput from '../../../components/form/PHInput'
import { Button, Col } from 'antd'
import { TResponse } from '../../../type'
import { toast } from 'sonner'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useAddCourseMutation, useGetAllCoursesQuery } from '../../../redux/features/admin/courseManagementApi'
import { useGetAcademicDeptQuery, useGetAcademicFacultyQuery, useGetAcademicSemesterQuery } from '../../../redux/features/admin/academicManagementApi'
import { useGetAllFacultyQuery } from '../../../redux/features/admin/userManangementApi'
import PHDatePicker from '../../../components/form/PHDatePicker'
import { weekOptions } from '../../../constants/global'


const CreateOfferCourse = () => {
  const [createCourse] = useAddCourseMutation();

  // academic semester options
  const { data: academicSemeterData, isLoading: academicSemester } = useGetAcademicSemesterQuery(undefined)

  const semesterOptions = academicSemeterData?.data?.map(data => ({
    label: `${data.name} ${data.year}`,
    value: data._id
  }))

  // academic department options
  const { data: academicDepartmentData } = useGetAcademicDeptQuery(undefined, { skip: academicSemester })

  const departmentOptions = academicDepartmentData?.data?.map(data => ({
    label: data.name,
    value: data._id
  }))

  // academic faculty options
  const { data: academicFacultyData } = useGetAcademicFacultyQuery(undefined);

  const academicFacultyDataOptions = academicFacultyData?.data?.map((faculty) => ({
    label: faculty.name,
    value: faculty._id,
  }));

  // course opyions
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const coursesOptions = courses?.data?.map((item: any) => ({
    value: item._id,
    label: item.title,
  }));

  // faculties options
  const { data: facultiesData } = useGetAllFacultyQuery(undefined);
  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.name.firstName,
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
    <Col span={6}>
      <PHForm onSubmit={onSubmit}>

        <PHSelect
          options={semesterOptions}
          name="academicSemester"
          label="Academic Semester"
        />
        <PHSelect

          options={academicFacultyDataOptions}
          name="academicFaculty"
          label="Academic Faculty"
        />
        <PHSelect

          options={departmentOptions}
          name="academicDepartment"
          label="Academic Department"
        />
        <PHSelect

          options={coursesOptions}
          name="course"
          label="Course"
        />
        <PHSelect

          options={facultiesOption}
          name="faculty"
          label="Faculty"
        />
        <PHInput type="text" name="maxCapacity" label="Max Capacity" />
        <PHInput type="text" name="section" label="Section" />
        <PHSelect
          mode='multiple'
          options={weekOptions}
          name="days"
          label="Days"
        />
        <PHDatePicker name="startTime" label='Start Time' format="HH:mm" />
        <PHDatePicker name="endTime" label='End Time' format="HH:mm" />
        <Button htmlType="submit">Submit</Button>
      </PHForm>
    </Col>
  )
}

export default CreateOfferCourse