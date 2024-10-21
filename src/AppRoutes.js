import './AppRoutes.css'
import { /* createBrowserRouter, */ createHashRouter, Link, RouterProvider } from "react-router-dom";
import SettingsComponent from './settings/SettingsComponent';
import Editor from './Editor';
import Viewer from './Viewer';

const router = createHashRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home 2</h1>
                <p><Link to='/about'>About 2</Link></p>
                <p><Link to='/view?file=x.adoc'>View x.adoc</Link></p>
                <p><Link to='/edit?file=x.adoc'>Edit x.adoc</Link></p>
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
    },
    {
        path: "/view",
        element: <Viewer />
    },
])

const AppRoutes = () => <div className="AppRoutes"><RouterProvider router={router} /></div>

export default AppRoutes
