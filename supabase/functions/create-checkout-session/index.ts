import Stripe from "https://esm.sh/stripe@14.0.0";
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* CORS headers */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  /* CORS-håndtering */
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    /* henter og bekræfter variabler (error håndtering) */
    const frontendUrl = Deno.env.get("FRONTEND_URL");
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!frontendUrl || !stripeKey || !supabaseUrl || !serviceKey) {
      return new Response(
        JSON.stringify({ error: "Server configuration missing" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    /* opretter stripe og supabase clients */
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16",
    });

    const supabase = createClient(supabaseUrl, serviceKey);

    const { data: order, error: orderError } = await supabase
    .from(orders)
    .insert({
      status: "pending",
    })
    .select
    .single

    if (orderError) {
      console.error("Failed to create order:", orderError)
      throw orderError
    }

    const orderId = order.id

    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return new Response(
        JSON.stringify({ error: "Invalid cart items" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    /* henter produkter fra backend for sikkerhed */
    const productIds = items.map((item) => item.productId);

    const { data: products, error } = await supabase
      .from("products")
      .select("id, title, price")
      .in("id", productIds);

    if (error || !products) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch products" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    /* bygger serverside priser */
    const line_items = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      return {
        price_data: {
          currency: "dkk",
          product_data: {
            name: product.title,
          },
          unit_amount: product.price * 100, // øre
        },
        quantity: item.quantity,
      };
    });

    /* opret stripe session */
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`,
    });

    /* returner url til stripe */
    return new Response(
      JSON.stringify({ url: session.url }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Checkout error:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});