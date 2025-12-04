import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import styles from "./products.module.css"

export default function Category() {
  const category = useParams();

  const filteredProducts = products.filter((p) => p.category === category);

  return (
    <div className={styles.productCards}>
      {filteredProducts.map((product) => {
        return (
          <div key={product.id} className={styles.productCard}>
            <img src={product.image} alt={product.name} />
            <div className={styles.info}>
              <h3>{product.name}</h3>
              <div className={styles.priceNbtn}>
                <p>{product.price} kr.</p>
                <button onClick={() => addToCart(product)}>
                  Tilføj til kurv
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
