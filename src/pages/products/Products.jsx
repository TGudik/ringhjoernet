import {products} from "../../data/products"
import styles from "./products.module.css"
import useCartStore from "../../store/cartStore";

export default function Products() {
  const addToCart = useCartStore((state) => state.addToCart)

  return (
    <div className={styles.productCards}>
      {products.map(product => {

        return(
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <div className={styles.info}>
              <h3>{product.name}</h3>
              <div className={styles.priceNbtn}>
                <p>{product.price} kr.</p>
                <button onClick={() => addToCart(product)}>Tilføj til kurv</button>
              </div>
            </div>
          </div>
        )

      })}
    </div>
  );
};
