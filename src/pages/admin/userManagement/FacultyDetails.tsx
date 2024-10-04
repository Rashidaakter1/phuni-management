
import { useParams } from 'react-router-dom'
import { useGetSingleFacultyQuery } from '../../../redux/features/admin/userManangementApi'
import { Card, Row, Col, Descriptions, Avatar, Divider } from 'antd';
const FacultyDetails = () => {
  const { facultyId } = useParams()
  const { data } = useGetSingleFacultyQuery(facultyId)
  const facultyData: any = data?.data
  return (
    <Card title="Faculty Profile" bordered={false} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Avatar
            size={120}
            src={facultyData?.profileImg || 'https://via.placeholder.com/120'}
          />
        </Col>
        <Col span={18}>
          <Descriptions bordered column={2} title="Basic Information">
            <Descriptions.Item label="Name">
              {`${facultyData?.name?.firstName || ''} ${facultyData?.name?.middleName || ''} ${facultyData?.name?.lastName || ''}`}
            </Descriptions.Item>
            <Descriptions.Item label="Faculty ID">{facultyData?.id || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Designation">{facultyData?.designation || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Gender">{facultyData?.gender || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{facultyData?.dateOfBirth || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{facultyData?.email || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Contact No">{facultyData?.contactNo || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Emergency Contact No">{facultyData?.emergencyContactNo || 'N/A'}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Divider />

      <Descriptions bordered title="Address Information" column={2}>
        <Descriptions.Item label="Present Address">{facultyData?.presentAddress || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{facultyData?.permanentAddress || 'N/A'}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Descriptions bordered title="Academic Information" column={2}>
        <Descriptions.Item label="Academic Department">{facultyData?.academicDepartment?.name || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Academic Faculty">{facultyData?.academicDepartment?.academicFaculty?.name || 'N/A'}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default FacultyDetails