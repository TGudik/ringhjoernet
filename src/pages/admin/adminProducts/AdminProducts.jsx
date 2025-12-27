import styles from "./adminProducts.module.css"
import { useState } from "react"
import { supabase } from "../../../lib/supabaseClient"

export default function AdminProducts() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    function slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/æ/g, "ae")
        .replace(/ø/g, "oe")
        .replace(/å/g, "aa")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
    }


    async function handleSubmit(e) {
        e.preventDefault()

        const slug = slugify(title)

        const { error } = await supabase
        .from("products")
        .insert([
            {
                title,
                slug,
                category,
                brand,
                description,
                price,
            }
        ])

        if (error) {
            alert("Noget gik galt")
            console.error(error)
        } else {
            alert("Produkt oprettet")
            setTitle("")
            setCategory("")
            setBrand("")
            setDescription("")
            setPrice("")
        }

    }

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Opret produkt</h1>

        <label>
          Titel
          <input
            type="text"
            placeholder="Produkt titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Vælg kategori</option>
            <option value="bundles">Startpakke</option>
            <option value="gloves">Boksehandsker</option>
            <option value="shoes">Boksesko</option>
            <option value="headgear">Boksehjelme</option>
            <option value="protection">Beskyttelse</option>
          </select>
        </label>

        <label>
          Brand
          <input
            type="text"
            placeholder="Brand navn"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            placeholder="Produktbeskrivelse"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </label>

        <label>
          Pris
          <input
            type="text"
            placeholder="Pris"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <button type="submit">Opret produkt</button>
      </form>
    );


} 