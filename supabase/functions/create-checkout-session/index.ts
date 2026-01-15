import Stripe from "https://esm.sh/stripe@14.0.0";
import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"), {
  apiVersion: "2023-10-16"
});
const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));

/* gemmer corsHeader som variabel */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

const frontendUrl = Deno.env.get("FRONTEND_URL");


serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders
    });
  }

  try {

    const { items } = await req.json();

    if (!items || !Array.isArray(items)) {
      return new Response(JSON.stringify({
        error: "Invalid cart items"
      }), {
        status: 400,
        headers: corsHeaders
      });
    }

    const productIds = items.map((item)=>item.productId);

    const { data: products, error } = await supabase
    .from("products")
    .select("id, title, price")
    .in("id", productIds);
    if (error || !products) {
      throw new Error("Failed to fetch products");
    }

    const line_items = items.map((item)=>{

      const product = products.find((p)=>p.id === item.productId);

      if (!product) {
        throw new Error("Product not found");
      }

      return {
        price_data: {
          currency: "dkk",
          product_data: {
            name: product.title
          },
          unit_amount: product.price * 100
        },
        quantity: item.quantity
      };
    });
    
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: [
        "card"
      ],
      line_items,
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`
    });
    return new Response(JSON.stringify({
      url: session.url
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), {
      status: 500,
      headers: corsHeaders
    });
  }
});
