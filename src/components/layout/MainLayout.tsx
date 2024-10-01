
import { Button, Layout } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

const { Header, Content } = Layout;


const MainLayout = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("first")
        dispatch(logout())
        navigate("/auth/signin")
    }
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar />
            <Layout>
                <Header style={{ padding: 0, }} ><Button onClick={() => handleLogout()}>Logout</Button></Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,

                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}

export default MainLayout