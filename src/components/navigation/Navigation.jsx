import logo from "../../assets/ringhjoernet-logo-2.svg"
import { Link } from "react-router-dom"
import styles from "./navigation.module.css"

export default function Navigation() {

    return (
        <header>
            <div className={styles.header}>
                
                <Link to="/">
                <img src={logo} alt="Ringhjørnet" />
                </Link>
                <nav className={styles.nav}>
                    <Link to="/needs">Alt en bokser skal bruge</Link>
                    <Link to="/products">Udstyr</Link>
                    <Link to="/about">Kontakt / Om</Link>
                    <Link to="/cart">Kurv</Link>
                </nav>
            </div>
        </header>
    )

}