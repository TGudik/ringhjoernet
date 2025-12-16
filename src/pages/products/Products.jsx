import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./products.module.css";
import ProductCard from "../../components/productCard/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");

      if (!error) setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) return <p>Indlæser produkter...</p>;

  return (
    <div className={styles.productCards}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
