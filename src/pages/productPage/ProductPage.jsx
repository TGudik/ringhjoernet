import styles from "./productPage.module.css"
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../store/cartStore";
import { useEffect, useState } from "react";

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function fetchProduct() {
        const {data, error} = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single()

        if (error) {
            setError(error.message)
        } else {
            setProduct(data)
        }
        setLoading(false)
    }

    fetchProduct()
  }, [productId])

    if (loading) return <p>Loader...</p>;
    if (error) return <p>Fejl: {error}</p>;
    if (!product) return <p>Produkt ikke fundet</p>;

  return (
    <div className={styles.productPage}>
      <h1 className={styles.title}>{product.title}</h1>
      <img src={product.images?.[0]} alt={product.title} />
      <p className={styles.description}>{product.description}</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Tilføj til kurv
      </button>
      <p className={styles.price}>{product.price} kr</p>
    </div>
  );
}

export default ProductPage;
