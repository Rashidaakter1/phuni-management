import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashbaord from "../pages/student/StudentDashbaord";

export const studentPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <StudentDashbaord />,
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Offered Course',
                path: 'offered-course',
                element: <OfferedCourse />,
            },
            
        ],
    },
];