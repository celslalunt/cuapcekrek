import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/error";
import { HomePage } from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";
import { ProfilePage } from "./pages/profilePage";
import Verification  from "./pages/verification";
import "./App.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
    },
    { path: "/login", element: <LoginForm /> },
    { path: "/register", element: <RegistrationForm /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/verification/:token", element: <Verification /> },
    // { path: "/editprofile", element: <EditProfilePage /> },
]);

function App() {
    return (
        <main>
            <RouterProvider router={router} />
        </main>
    );
}

export default App;
