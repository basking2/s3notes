import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home</h1>
                <Link to="about">About</Link>
            </div>
        ),
    },
    {
        path: "about",
        element: (<h1>About</h1>)
    },
])

const AppRoutes = () => <RouterProvider router={router} />

export default AppRoutes
