import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./products.module.css";

export default function Category() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", category);

      if (error) {
        console.error(error);
      } else {
        setProducts(data);
      }

      setLoading(false);
    }

    fetchProducts();
  }, [category]);

  if (loading) return <p>Indlæser produkter…</p>;

  return (
    <div className={styles.productCards}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {products.length === 0 && <p>Ingen produkter i kategorien</p>}
    </div>
  );
}
