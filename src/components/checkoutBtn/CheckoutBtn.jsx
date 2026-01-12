import useCartStore from "../../store/cartStore";

export default function CheckoutBtn() {

    const cart = useCartStore((state) => state.cart)

    async function handleCheckout() {
        const items = cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
        }));

        const res = await fetch(
           "https://fcxwyecesdubgivjosip.supabase.co/functions/v1/create-checkout-session",
           {
             method: "POST",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${
                 import.meta.env.VITE_SUPABASE_ANON_KEY
               }`,
             },
             body: JSON.stringify({ items }),
           }
        );

        const data = await res.json()
        window.location.href = data.url

    }

    return (
        <button onClick={handleCheckout}>
            Gå til betaling
        </button>
    )

}