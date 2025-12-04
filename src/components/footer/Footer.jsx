import logo from "../../assets/ringhjoernet-logo-2.svg"
import styles from "./footer.module.css"
import { Link } from "react-router-dom"
import mobilepay from "../../assets/icons/mobilePay-ikon-1.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard, faCcApplePay } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          <Link to="/about">Kontakt / Om</Link>
          <Link to="/handelsbetingelser">Handelsbetingelser</Link>
          <Link to="/cookie-og-privatlivspolitik">
            Cookie- og privatlivspolitik
          </Link>
          <h3>RINGHJØRNET</h3>
          <p>Brøndumsgade 54</p>
          <p>7800 Skive</p>
          <p>CVR: 12345678</p>
        </div>
        <div className={styles.footerRight}>
          <img src={logo} className={styles.footerLogo} alt="Ringhjørnet" />
          <div className={styles.payIcons}>
            <img src={mobilepay} alt="mobilepay" />
            <FontAwesomeIcon icon={faCcMastercard} color="#fff" fontSize={50} />
            <FontAwesomeIcon icon={faCcVisa} color="#fff" fontSize={50} />
            <FontAwesomeIcon icon={faCcApplePay} color="#fff" fontSize={50} />
          </div>
        </div>
      </div>
    </footer>
  );
};



