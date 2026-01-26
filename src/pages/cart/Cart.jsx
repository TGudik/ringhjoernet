import useCartStore from "../../store/cartStore";
import styles from "./cart.module.css"
import { Link } from "react-router-dom";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const deleteFromCart = useCartStore((state) => state.deleteFromCart);
  const total = useCartStore((state) => state.getTotal(state));

  if (cart.length > 0) {return (
    <div className={styles.cartContainer}>
      {cart.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.imageNname}>
            <img src={product.images?.[0]} alt={product.name} />
            <div className={styles.nameNprice}>
              <h3>{product.title}</h3>
              <p>{product.price} kr.</p>
            </div>
          </div>
          <div className={styles.amountNbtn}>
            <button onClick={() => addToCart(product)}>+</button>
            <p>x {product.quantity}</p>
            <button onClick={() => removeFromCart(product.id)}>-</button>
          </div>

          <button onClick={() => deleteFromCart(product.id)}>
            Fjern fra kurv
          </button>
        </div>
      ))}

      <p className={styles.total}>Total: {total} kr.</p>
      <Link 
        className={styles.link} 
        style={{textAlign: "center", width: 200,alignSelf: "end", marginRight: 80}}to="/checkout">
        Til kassen
      </Link>
    </div>
  );
 } else return(
  <div className={styles.emptyCartMsg}>
    <h3>Kurven er tom</h3>
    <Link className={styles.link} to="/products">Se udstyr</Link>
  </div>
 )
}

