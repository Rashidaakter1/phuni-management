import { Button, Modal } from 'antd'
import { useGetSingleStudentsQuery } from '../../../redux/features/admin/userManangementApi'

type TModalProps = {
    showLoading: any, loading: boolean, open: boolean, setOpen: any, id: string
}
const UpdateModal = ({ showLoading, loading, open, setOpen, id }: TModalProps) => {
    console.log(id)
    const { data: studentData, isFetching } = useGetSingleStudentsQuery(id)
    console.log(studentData)
    return (
        <Modal
            title={<p>Edit Information</p>}
            footer={
                <Button type="primary" onClick={showLoading}>
                    Reload
                </Button>
            }
            loading={loading}
            open={open}
            onCancel={() => setOpen(false)}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    )
}

export default UpdateModal