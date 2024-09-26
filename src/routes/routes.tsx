import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import About from "../pages/About"

import Login from "../pages/Login"
import Register from "../pages/Register"
import routesGenerator from "../utils/routesGenerator"
import { adminPaths } from "./admin.routes"
import { studentPaths } from "./student.route"


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "about",
                element: <About />,
            }
        ]
    },
    {
        path: "/admin",
        element: <App />,
        children: routesGenerator(adminPaths)
    },
    {
        path: "/faculty",
        element: <App />,
        children: routesGenerator(adminPaths)
    },
    {
        path: "/student",
        element: <App />,
        children: routesGenerator(studentPaths)
    },
    {
        path: "/auth/signin",
        element: <Login />,

    },
    {
        path: "/auth/signup",
        element: <Register />,

    },

])

export default router