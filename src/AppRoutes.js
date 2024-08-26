import './AppRoutes.css'
import { /* createBrowserRouter, */ createHashRouter, Link, RouterProvider } from "react-router-dom";
import SettingsComponent from './settings/SettingsComponent';
import Editor from './Editor';
import Viewer from './Viewer';
import About from './About';

function fallbackFunction(file) {
    return [
        "jsx",
        <div>
            <h1>File {file} Not Found</h1>
            The file {file} is not found. <Link to={"/edit?file="+file}>Create {file}</Link>?
        </div>
    ]
}

const router = createHashRouter([
    {
        path: "/",
        element: (
            <div>
                <Viewer file="_home.md">
                    <h1>Home</h1>
                    <p>This is the default S3 Notes homepage.</p>
                    <p>S3 Notes is licensed under the MIT license.
                        A copy may be found in the <a href="https://github.com/basking2/s3notes">Git repository</a>.
                    </p>
                    <p>You can replace the contents of the home page by editing
                        &nbsp;<Link to="/edit?file=_home.md&type=md">_home.md</Link>.
                    </p>
                    <p>Documentation is included in the <Link to='/about'>About</Link> page.</p>
                </Viewer>
            </div>
        ),
    },
    {
        path: "/settings",
        element: (<SettingsComponent></SettingsComponent>)
    },
    {
        path: "/about",
        element: <About />
    },
    {
        path: "/edit",
        element: <Editor />
    },
    {
        path: "/view",
        element: <Viewer fallbackFunction={fallbackFunction} />
    },
])

const AppRoutes = () => <div className="AppRoutes"><RouterProvider router={router} /></div>

export default AppRoutes
