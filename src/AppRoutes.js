import './AppRoutes.css'
import { /* createBrowserRouter, */ createHashRouter, Link, RouterProvider } from "react-router-dom";
import Settings from './Settings';

const router = createHashRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home 2</h1>
                <Link to='/about'>About 2</Link>
            </div>
        ),
    },
    {
        path: "/settings",
        element: (<Settings></Settings>)
    },
    {
        path: "/about",
        element: (<h1>About</h1>)
    },
])

const AppRoutes = () => <div className="AppRoutes"><RouterProvider router={router} /></div>

export default AppRoutes
