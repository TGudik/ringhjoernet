import logo from "../../assets/ringhjoernet-logo-2.svg"
import { Link } from "react-router-dom"
import styles from "./navigation.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons"
import useCartStore from "../../store/cartStore"
import { useState } from "react"

export default function Navigation() {

    const totalQuantity = useCartStore((state) => state.getTotalQuantity(state))
    const [showCategories, setShowCategories] = useState(false)

    return (
      <header>
        <div className={styles.header}>
          <Link to="/">
            <img src={logo} alt="Ringhjørnet" />
          </Link>
          <nav className={styles.nav}>
            <Link to="/needs">Alt en bokser skal bruge</Link>
            <Link
              to="/products"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              Udstyr
            </Link>
            <div
              className={`${styles.categoryDropdown} ${
                showCategories ? styles.show : ""
              }`}
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Link to="/products/gloves">Handsker</Link>
              <Link to="/products/shoes">Boksesko</Link>
              <Link to="/products/headgear">Boksehjelme</Link>
              <Link to="/products/protection">Beskyttelse</Link>
            </div>
            <Link to="/about">Kontakt / Om</Link>
            <Link to="/cart" className={styles.cartNquantity}>
              <FontAwesomeIcon icon={faBasketShopping} fontSize={30} />
              {totalQuantity}
            </Link>
          </nav>
        </div>
      </header>
    );

}