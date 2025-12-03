import useCartStore from "../../store/cartStore";
import styles from "./cart.module.css"

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart)
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.getTotal(state));


  return (
    <div className={styles.cartContainer}>
      {cart.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <div className={styles.imageNname}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price} kr.</p>
          </div>
          <div className={styles.amountNbtn}>
            <button onClick={() => addToCart(product)}>+</button>
            <p>x {product.quantity}</p>
            <button onClick={() => removeFromCart(product.id)}>-</button>
          </div>

          <button onClick={() => removeFromCart(product.id)}>
            Fjern fra kurv
          </button>
        </div>
      ))}

      <p className={styles.total}>Total: {total} kr.</p>
    </div>
  );
}

