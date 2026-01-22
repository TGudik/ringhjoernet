import styles from "./cancel.module.css"
import { Link } from "react-router-dom";

export default function Cancel() {

    return (
      <div className={styles.cancelContainer}>
        <div className={styles.cancelContent}>
          <h2>Ordreren er annulleret</h2>
          <Link className={styles.link} to="/products">
            Tilbage til shop
          </Link>
        </div>
      </div>
    );

}