import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { title, price, category } = req.body;

  if (!title || !price || !category) {
    return res.status(400).json({ error: "Manglende felter" });
  }

  const slug = title
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "oe")
    .replace(/å/g, "aa")
    .replace(/\s+/g, "-");

  const { data, error } = await supabase
    .from("products")
    .insert([
      {
        title,
        price,
        category,
        slug,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(201).json(data[0]);
}
