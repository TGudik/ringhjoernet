import { useState } from "react";
import styles from "./createProduct.module.css"

export default function CreateProduct() {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [brand, setBrand] = useState("")
    const [status, setStatus] = useState("")

    


    async function handleSubmit(e) {
        e.preventDefault()
        setStatus("Gemmer...")

        const response = await fetch("../../../api/admin/products.js", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                price: Number(price),
                category,
                description,
                brand,
            })
        })

        if (!response.ok) {
            setStatus("Noget gik galt")
            return
        }


        setTitle("")
        setPrice("")
        setCategory("")
        setDescription("")
        setBrand("")
        setStatus("Produkt oprettet")
    }

    return (
    <div className={styles.formContainer
    }>
      <h1>Opret produkt</h1>

      <form className={styles.createProductForm} onSubmit={handleSubmit}>
        <div>
          <label>Titel</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Pris (kr)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Beskrivelse</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Kategori</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="fx gloves"
            required
          />
        </div>

        <button type="submit">Opret produkt</button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );


}