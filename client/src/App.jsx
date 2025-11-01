import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";
import LoginPage from "./components/pages/Login.jsx"
import TaskPage from "./components/main/task-page/TaskPage.jsx"
import PictureAnnotation from "./components/main/picture-annotation/PictureAnnotation.jsx";
import { useAuth, AuthProvider } from "./components/context/AuthContext.jsx";


export default function App() {

    function PrivateRoute ({children}) {
        const { user, loading } = useAuth();
        if (loading) return <p>Loading ...</p>;
        return user ? children : <Navigate to="/login" />;
    }

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<PrivateRoute><AppLayout /></PrivateRoute>}>
                        <Route path="task-page" element={<TaskPage />} />
                        <Route path="picture-annotation" element={<PictureAnnotation/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

