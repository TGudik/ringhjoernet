import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./adminLogin.module.css"

export default function AdminLogin() {

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
            localStorage.setItem("isAdmin", "true")
            navigate("/")
        } else {
            setError("Forkert Kode")
        }

        window.location.reload()
    }


      return (
        <div className={styles.loginContainer}>
        <h1>Admin login</h1>

        <form onSubmit={handleSubmit}>
            <input
            type="password"
            placeholder="Admin kode"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log ind</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
  );

}