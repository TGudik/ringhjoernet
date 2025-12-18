import styles from "./productCard.module.css";
import useCartStore from "../../store/cartStore";

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className={styles.productCard}>
      <img src={product.images?.[0]} alt={product.title} />

      <div className={styles.info}>
        <h3>{product.title}</h3>

        <div className={styles.priceNbtn}>
          <p>{product.price} kr.</p>
          <button onClick={() => addToCart(product)}>Tilføj til kurv</button>
        </div>
      </div>
    </div>
  );
}
