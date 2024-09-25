import { Layout, Menu, } from 'antd';
import sidebarItemsGenerator from '../../utils/sidebarItemsGenerator';
import { adminPaths } from '../../routes/admin.routes';
import { studentPaths } from '../../routes/student.route';
import { TSidebar } from '../../type';
const { Sider } = Layout;

export const USER_ROLE = {
    ADMIN: "admin",
    STUDENT: "student",
    FACULTY: "faculty",
}


console.log(sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN))
const getSidebarItems = () => {
    const role = "admin";
    let sidebarItems: TSidebar[];
    switch (role) {
        case USER_ROLE.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN);
            break;
        case USER_ROLE.FACULTY:
            sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.FACULTY);
            break;
        case USER_ROLE.STUDENT:
            sidebarItems = sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT);
            break;
        default:
            sidebarItems = [];
    }
    return sidebarItems;
}

const Sidebar = () => {
    return (
        <Sider breakpoint="lg" collapsedWidth="0">
            <div
                style={{
                    color: 'white',
                    height: '4rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h1>PH Uni</h1>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={getSidebarItems()} 
            />
        </Sider>
    )
}

export default Sidebar;
