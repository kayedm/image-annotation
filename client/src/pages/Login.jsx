import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { login } = useAuth();


    function handleLoginSubmit (e) {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate("/");
        } else {
            alert("Login failed.");
        }
    }

    return (
        <form onSubmit={handleLoginSubmit}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Login </button>
            <button>Sign up </button>
        </form>
    )
}