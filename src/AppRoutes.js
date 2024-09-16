import './AppRoutes.css'
import { /* createBrowserRouter, */ createHashRouter, Link, RouterProvider } from "react-router-dom";
import SettingsComponent from './settings/SettingsComponent';
import Editor from './Editor';

const router = createHashRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home 2</h1>
                <Link to='/about'>About 2</Link>
                <Link to='/edit?file=x.adoc'>Edit x.adoc</Link>
            </div>
        ),
    },
    {
        path: "/settings",
        element: (<SettingsComponent></SettingsComponent>)
    },
    {
        path: "/about",
        element: (<h1>About</h1>)
    },
    {
        path: "/edit",
        element: <Editor />
    }
])

const AppRoutes = () => <div className="AppRoutes"><RouterProvider router={router} /></div>

export default AppRoutes
