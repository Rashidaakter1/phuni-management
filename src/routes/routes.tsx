import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import About from "../pages/About"
import { AdminPaths } from "./admin.routes"
import Login from "../pages/Login"
import Register from "../pages/Register"


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
        children: AdminPaths
    },
    {
        path: "/faculty",
        element: <App />,
        children: AdminPaths
    },
    {
        path: "/student",
        element: <App />,
        children: AdminPaths
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