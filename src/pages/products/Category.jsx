import { useParams } from "react-router-dom";
import { products } from "../../data/products";
import styles from "./products.module.css"
import useCartStore from "../../store/cartStore";

export default function Category() {
  const addToCart = useCartStore((state) => state.addToCart)
  const category = useParams();

  const filteredProducts = products.filter((p) => p.category === category.category);

  console.log(filteredProducts)

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

      {filteredProducts.length === 0 && (
        <p>Ingen produkter i kategorien</p>
      )}

    </div>
  );
}
