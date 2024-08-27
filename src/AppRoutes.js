import './AppRoutes.css'
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home 2</h1>
                <Link to="/about">About</Link>
            </div>
        ),
    },
    {
        path: "/about",
        element: (<h1>About</h1>)
    },
])

const AppRoutes = () => <div className="AppRoutes"><RouterProvider router={router} /></div>

export default AppRoutes
