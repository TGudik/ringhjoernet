import Stripe from "https://esm.sh/stripe@14.0.0";
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  { apiVersion: "2023-10-16" }
);

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new Response("Missing signature", { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Hent line items fra Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(
      session.id,
      { limit: 100 }
    );

    const orderId = session.metadata?.order_id

    // Opret order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .update({
        stripe_session_id: session.id,
        total_amount: session.amount_total,
        currency: session.currency,
        status: "paid",
      })
      .eq("id", orderId)
      .select()
      .single();

    if (orderError) {
      console.error(orderError);
      return new Response("Kunne ikke lave order", { status: 500 });
    }

    // Opret order_items
    const items = lineItems.data.map((item) => ({
      order_id: order.id,
      product_title: item.description,
      unit_price: item.price?.unit_amount ?? 0,
      quantity: item.quantity ?? 1,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) {
      console.error(itemsError);
      return new Response("Kunne ikke lave order_items", { status: 500 });
    }

    const customerEmail = session.customer_details?.email;

  if (customerEmail) {
    await resend.emails.send({
      from: "email@ringhjoernet.dk",
      to: customerEmail,
      subject: "Tak for din ordre 🎉",
      html: `
        <h1>Tak for dit køb!</h1>
        <p>Ordre #${order.id}</p>

        <ul style="list-style-type: none;">
          ${items.map(item => `
            <li>
              ${item.product_title} × ${item.quantity}
              (${item.unit_price / 100} kr.)
            </li>
          `).join("")}
        </ul>

        <p><strong>Total:</strong> ${order.total_amount / 100} kr.</p>
      `,
    });
}



  }

  return new Response("ok", { status: 200 });
});