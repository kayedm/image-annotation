import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import styles from "./Login.module.css";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLoginSubmit (e) {
        e.preventDefault();
        const success = await login(username, password);
        if (success) {
            navigate("/");
        } else {
            alert("Login failed.");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <form onSubmit={handleLoginSubmit} className={styles.form}>
                    <h1>Login</h1>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div className={styles.buttons}>
                        <button className={styles.loginBtn} type="submit">Login </button>
                        <button className={styles.signupBtn}>Sign up </button>
                    </div>

                </form>
            </div>
        </div>
    )
}