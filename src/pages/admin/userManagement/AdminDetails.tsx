import { Card, Row, Col, Descriptions, Avatar, Divider } from 'antd';
import { useParams } from 'react-router-dom'
import { useGetSingleAdminQuery } from '../../../redux/features/admin/userManangementApi'

const AdminDetails = () => {
  const { adminId } = useParams()
  const { data } = useGetSingleAdminQuery(adminId)
  const adminData: any = data?.data
  return (
    <Card title="Administrator Profile" bordered={false} style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Avatar
            size={120}
            src={adminData?.profileImg || 'https://via.placeholder.com/120'}
          />
        </Col>
        <Col span={18}>
          <Descriptions bordered column={2} title="Basic Information">
            <Descriptions.Item label="Name">
              {`${adminData?.name?.firstName || ''} ${adminData?.name?.middleName || ''} ${adminData?.name?.lastName || ''}`}
            </Descriptions.Item>
            <Descriptions.Item label="Admin ID">{adminData?.id || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Designation">{adminData?.designation || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Gender">{adminData?.gender || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{adminData?.dateOfBirth || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Email">{adminData?.email || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Contact No">{adminData?.contactNo || 'N/A'}</Descriptions.Item>
            <Descriptions.Item label="Emergency Contact No">{adminData?.emergencyContactNo || 'N/A'}</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>

      <Divider />

      <Descriptions bordered title="Address Information" column={2}>
        <Descriptions.Item label="Present Address">{adminData?.presentAddress || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{adminData?.permanentAddress || 'N/A'}</Descriptions.Item>
      </Descriptions>

      <Divider />
      <Descriptions bordered title="Management Information" column={1}>
        <Descriptions.Item label="Department">{adminData?.managementDepartment || 'N/A'}</Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default AdminDetails