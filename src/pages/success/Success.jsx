import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabaseClient"

export default function Success() {
    const [items, setItems] = useState([])
    const [id, setId] = useState(null)
    
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const orderId = params.get("order_id")
        setId(params.get("order_id"));

        async function getOrderItems() {
            
            const { data, error } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", orderId)

            if (error) {
                console.error("Kunne ikke hente produkter: ", error)
            }

            console.log(data)
            
            setItems(data)

        }

        getOrderItems()

    }, []) 

    if (items.length === 0) return <p>Vi henter din ordrer...</p>

    return (
      <div>
        <h2>Tak for din ordre</h2>
        <h3>Ordrenummer: {id}</h3>
        <ul>
          {items.map(item => 
            <li key={item.id}>
              {item.product_title} × {item.quantity}
              ({item.unit_price / 100} kr.)
            </li>)}
        </ul>
      </div>
    );

  
}