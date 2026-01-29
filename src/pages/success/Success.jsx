import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import useCartStore from "../../store/cartStore";

export default function Success() {
  const [items, setItems] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("order_id");
    setOrderId(id);
  }, []);

  useEffect(() => {
    if (!orderId) return;

    async function getOrderItems() {
      const { data, error } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      if (error) {
        console.error("Kunne ikke hente produkter:", error);
        return;
      }

      setItems(data ?? []);
      setLoading(false);
    }

    getOrderItems();
  }, [orderId]);

  useEffect(() => {
    if (!orderId) return;

    const interval = setInterval(async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("status")
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Kunne ikke hente ordre:", error);
        return;
      }

      if (data?.status === "paid") {
        clearCart();
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [orderId, clearCart]);

  if (loading) {
    return <p>Vi bekræfter din betaling…</p>;
  }

  return (
    <div>
      <h2>Tak for din ordre 🎉</h2>
      <h3>Ordrenummer: {orderId}</h3>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_title} × {item.quantity} ({item.unit_price / 100} kr.)
          </li>
        ))}
      </ul>
    </div>
  );
}
