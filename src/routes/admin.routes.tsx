


import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDataTable from "../pages/admin/userManagement/AdminDataTable";
import AdminDetails from "../pages/admin/userManagement/AdminDetails";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import FacultyDataTable from "../pages/admin/userManagement/FacultyDataTable";
import FacultyDetails from "../pages/admin/userManagement/FacultyDetails";
import StudentDataTable from "../pages/admin/userManagement/StudentDataTable";
import StudentsDetails from "../pages/admin/userManagement/StudentsDetails";



export const adminPaths = [
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />,
    },
    {
        name: 'Academic Management',
        children: [
            {
                name: 'Create A. Semester',
                path: 'create-academic-semester',
                element: <CreateAcademicSemester />,
            },
            {
                name: 'Academic Semester',
                path: 'academic-semester',
                element: <AcademicSemester />,
            },
            {
                name: 'Create A. Faculty',
                path: 'create-academic-faculty',
                element: <CreateAcademicFaculty />,
            },
            {
                name: 'Academic Faculty',
                path: 'academic-faculty',
                element: <AcademicFaculty />,
            },
            {
                name: 'Create A. Department',
                path: 'create-academic-department',
                element: <CreateAcademicDepartment />,
            },
            {
                name: 'Academic Department',
                path: 'academic-department',
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: 'User Management',
        children: [
            {
                name: 'Create Student',
                path: 'create-student',
                element: <CreateStudent />,
            },
            {
                name: 'Create Admin',
                path: 'create-admin',
                element: <CreateAdmin />,
            },
            {
                name: 'Create Faculty',
                path: 'create-faculty',
                element: <CreateFaculty />,
            },

            {
                name: 'Students',
                path: 'students',
                element: <StudentDataTable />,
            },
            {

                path: 'student-data/:studentId',
                element: <StudentsDetails />,
            },
            {

                path: 'faculty-data/:facultyId',
                element: <FacultyDetails />,
            },
            {

                path: 'admin-data/:adminId',
                element: <AdminDetails />,
            },
            {
                name: 'Faculty',
                path: 'faculty',
                element: <FacultyDataTable />,
            },
            {
                name: 'Admin',
                path: 'admin',
                element: <AdminDataTable />,
            },
        ],
    },
];


