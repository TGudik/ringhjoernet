import useCartStore from "../../store/cartStore";

export default function CheckoutBtn() {

    const cart = useCartStore((state) => state.cart)

    async function handleCheckout() {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const res = await fetch(
        `${
          import.meta.env.VITE_SUPABASE_URL
        }/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ items }),
        }
      );

      // 🔑 parse response FØRST
      const data = await res.json();

      if (!res.ok) {
        console.error("Checkout error:", data);
        alert(data.error ?? "Noget gik galt ved checkout");
        return;
      }

      if (!data.url) {
        console.error("No checkout url returned:", data);
        alert("Kunne ikke oprette checkout");
        return;
      }

      window.location.href = data.url;
    }


    return (
        <button style={{alignSelf: "end", marginRight: 80}} onClick={handleCheckout}>
            Gå til betaling
        </button>
    )

}