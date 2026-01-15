import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabaseClient"

export default function AdminOrders() {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchOrders() {
            const {data, error} = await supabase
            .from("orders")
            .select(`
                id,
                created_at,
                total_amount,
                currency,
                status,
                order_items (
                    product_title,
                    quantity,
                    unit_price
                )
            `).order("created_at", {ascending: false})
            if (error) {
                console.error(error)
            } else {
                setOrders(data)
            }

            setLoading(false)
        }

        fetchOrders()

    }, [])

    if(loading) return <p>Loader ordrer...</p>

    return (
      <div>
        <h1>Ordrer</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            style={{ border: "1px solid #ccc", marginBottom: 20, padding: 10 }}
          >
            <p>
              <strong>Ordre #{order.id}</strong>
            </p>
            <p>Status: {order.status}</p>
            <p>
              Total: {order.total_amount / 100} {order.currency.toUpperCase()}
            </p>
            <p>Dato: {new Date(order.created_at).toLocaleString()}</p>

            <ul>
              {order.order_items.map((item, i) => (
                <li key={i}>
                  {item.product_title} × {item.quantity} (
                  {item.unit_price / 100} kr.)
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );

}