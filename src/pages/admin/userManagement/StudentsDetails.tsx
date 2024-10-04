import { useParams } from 'react-router-dom'
import { useGetSingleStudentsQuery } from '../../../redux/features/admin/userManangementApi'
import { Avatar, Card, Col, Descriptions, Divider, Row } from 'antd'


const StudentsDetails = () => {
  const { studentId } = useParams()
  const { data } = useGetSingleStudentsQuery(studentId)
  const studentData: any = data?.data

  return (
    <Card title="Student Profile" bordered={false} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Avatar
            size={120}
            src={studentData?.profileImg || 'https://via.placeholder.com/120'}
          />
        </Col>
        <Col span={18}>
          <Descriptions bordered column={2} title="Basic Information">
            <Descriptions.Item label="Name">
              {`${studentData?.name?.firstName} ${studentData?.name?.middleName} ${studentData?.name.lastName}`}
            </Descriptions.Item>
            <Descriptions.Item label="Student ID">{studentData?.id}</Descriptions.Item>
            <Descriptions.Item label="Email">{studentData?.email}</Descriptions.Item>
            <Descriptions.Item label="Gender">{studentData?.gender}</Descriptions.Item>
            <Descriptions.Item label="Blood Group">{studentData?.bloodGroup}</Descriptions.Item>
            <Descriptions.Item label="Contact No">{studentData?.contactNo}</Descriptions.Item>
            <Descriptions.Item label="Emergency Contact No">{studentData?.emergencyContactNo}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Divider />

      <Descriptions bordered title="Address Information" column={2}>
        <Descriptions.Item label="Present Address">{studentData?.presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{studentData?.permanentAddress}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions bordered title="Guardian Information" column={2}>
        <Descriptions.Item label="Father's Name">{studentData?.guardian.fatherName}</Descriptions.Item>
        <Descriptions.Item label="Father's Occupation">{studentData?.guardian.fatherOccupation}</Descriptions.Item>
        <Descriptions.Item label="Father's Contact No">{studentData?.guardian.fatherContactNo}</Descriptions.Item>
        <Descriptions.Item label="Mother's Name">{studentData?.guardian.motherName}</Descriptions.Item>
        <Descriptions.Item label="Mother's Occupation">{studentData?.guardian.motherOccupation}</Descriptions.Item>
        <Descriptions.Item label="Mother's Contact No">{studentData?.guardian.motherContactNo}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions bordered title="Local Guardian Information" column={2}>
        <Descriptions.Item label="Name">{studentData?.localGuardian.name}</Descriptions.Item>
        <Descriptions.Item label="Occupation">{studentData?.localGuardian.occupation}</Descriptions.Item>
        <Descriptions.Item label="Contact No">{studentData?.localGuardian.contactNo}</Descriptions.Item>
        <Descriptions.Item label="Address">{studentData?.localGuardian.address}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions bordered title="Academic Information" column={2}>
        <Descriptions.Item label="Academic Department">{studentData?.academicDepartment?.name}</Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">{studentData?.academicDepartment?.academicFaculty.name}</Descriptions.Item>
        <Descriptions.Item label="Admission Semester">{`${studentData?.admissionSemester?.name} ${studentData?.admissionSemester?.year}`}</Descriptions.Item>
        <Descriptions.Item label="Semester Duration">{`${studentData?.admissionSemester?.startMonth} - ${studentData?.admissionSemester?.endMonth}`}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default StudentsDetails