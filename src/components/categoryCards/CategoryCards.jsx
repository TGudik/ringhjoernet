import styles from "./categoryCards.module.css"
import { Link } from "react-router-dom";
import gloveImg from "/images/hill-f120-1.webp"
import shoeImg from "/images/adidas-speedex-1.webp"
import headgearImg from "/images/venum-challenger-hjelm-white.webp"
import protectionImg from "/images/skridtbeskytter-everlast.jpg"


export default function CategoryCards() {

    return (
      <div className={styles.cards}>
        <Link to="/products/gloves" className={styles.card}>
          <img src={gloveImg} alt="Boxing gloves" className={styles.cardImg} />
        </Link>
        <Link to="/products/shoes">
          <img src={shoeImg} alt="Boxing Shoes" className={styles.cardImg} />
        </Link>
        <Link to="/products/headgear">
          <img
            src={headgearImg}
            alt="Boxing Headgear"
            className={styles.cardImg}
          />
        </Link>
        <Link to="/products/protection">
          <img src={protectionImg} alt="Boxing Protection" className={styles.cardImg} />
        </Link>
      </div>
    );

}