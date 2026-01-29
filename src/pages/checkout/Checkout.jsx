import { supabase } from "../../lib/supabaseClient"
import styles from "./checkout.module.css"
import { useState, useEffect } from "react"
import useCartStore from "../../store/cartStore";


export default function Checkout() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [city, setCity] = useState("")
    const [country, setCountry] = useState("")
    const [shippingMethod, setShippingmethod] = useState("")

    const cart = useCartStore((state) => state.cart);

    async function handleSubmit(e) {

      e.preventDefault()

      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const payload = {
        items,
        customer: {
            name,
            email,
            phone: number,
        },
        shipping: {
            address,
            postalCode,
            city,
            country,
            method: shippingMethod
        }
      }

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
          body: JSON.stringify(payload),
        }
      );

      // parse response
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
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Leveringsoplysninger</h2>

          <label>
            Fulde navn:
            <input
              type="text"
              placeholder="Fulde navn"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Telefon Nummer
            <input
              type="text"
              placeholder="Tlf. nummer"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </label>

          <label>
            Adresse
            <input
              type="text"
              placeholder="Adresse"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </label>

          <label>
            Postnummer
            <input
              type="text"
              placeholder="Postnummer"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </label>

          <label>
            By
            <input
              type="text"
              placeholder="By"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>

          <label>
            Land
            <input
              type="text"
              placeholder="Land"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>

          <label>
            Leveringsmetode
            <select
              value={shippingMethod}
              onChange={(e) => setShippingmethod(e.target.value)}
              required
            >
              <option value="">Vælg leveringsmetode</option>
              <option value="gls">GLS</option>
              <option value="postnord">Postnord</option>
            </select>
          </label>

          <label className={styles.checkboxContainer}>
            <input required type="checkbox" className={styles.checkbox} />
            <p>Accepter <a href="/handelsbetingelser" target="_blank">handelsbetingelser</a></p>
          </label>

          <button type="submit">Gå til betaling</button>
        </form>
      </div>
    );
}