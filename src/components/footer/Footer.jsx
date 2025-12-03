import logo from "../../assets/ringhjoernet-logo-2.svg"
import styles from "./footer.module.css"

export default function Footer() {
  return (

    <footer className={styles.footer}>
        <div className={styles.footerLeft}>
            <Link to="/about">Kontakt / Om</Link>
            
        </div>
    </footer>

  )
};

