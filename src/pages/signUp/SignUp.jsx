import { useState } from "react";
import styles from "./signUp.module.css"
import { supabase } from "../../lib/supabaseClient";

export default function AdminLogin() {

    const [signUp, setSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    async function handleSignUp(e) {
        e.preventDefault()

        const { error } = await supabase
        .auth
        .signUp(
            {
                email,
                password
            })

            if (error) setError(error.message)
            else alert("Bruger er oprettet")
    }

    async function handleLogin(e) {
        e.preventDefault()

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) setError(error.message)
        else {
          alert("Logget ind")
          setEmail("")
          setPassword("")
          setError("")
        }
        
    }


      if (signUp) {return (
        <div className={styles.signUpContainer}>
        <h1>Opret bruger</h1>
        <button onClick={() => setSignUp(!signUp)}>Log ind i stedet?</button>
        <form onSubmit={handleSignUp}>
            <input 
            type="email" 
            placeholder="Email adresse" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Opret Bruger</button>
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
  );} 

  if (!signUp) {return (
    <div className={styles.loginContainer}>
        <h1>Login</h1>
        <button onClick={() => setSignUp(!signUp)}>Opret dig i stedet?</button>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} placeholder="Email adresse" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button>Log ind</button>
          {error && <p>{error}</p>}
        </form>
    </div>
  );}

}