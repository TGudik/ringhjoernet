import logo from "../../assets/ringhjoernet-logo-2.svg"
import { Link } from "react-router-dom"
import styles from "./navigation.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import useCartStore from "../../store/cartStore"

export default function Navigation() {

    const totalQuantity = useCartStore((state) => state.getTotalQuantity(state))

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
            <Link to="/cart" className={styles.cartNquantity}>
              <FontAwesomeIcon icon={faBasketShopping} fontSize={30}/>
              {totalQuantity}
            </Link>
          </nav>
        </div>
      </header>
    );

}