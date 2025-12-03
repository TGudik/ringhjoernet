import useCartStore from "../../store/cartStore";
import styles from "./cart.module.css"

export default function Cart() {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className={styles.cartContainer}>
      {cart.map((product) => (
        <div key={product.id} className={styles.productCard}>
          <img src={product.image} alt={product.name} />

          <div className={styles.info}>
            <h3>{product.name}</h3>

            <div className={styles.priceNbtn}>
              <p>{product.price} kr.</p>
              <button onClick={() => removeFromCart(product.id)}>
                Fjern fra kurv
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

