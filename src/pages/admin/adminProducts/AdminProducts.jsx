import styles from "./adminProducts.module.css"
import { useState } from "react"
import { supabase } from "../../../lib/supabaseClient"

export default function AdminProducts() {
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [images, setImages] = useState([])
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    async function uploadImages(productId, files) {
      const uploadedUrls = []

      for (const file of files) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const filePath = `${productId}/${fileName}`

        const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file)

        if (error) throw error

        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        uploadedUrls.push(data.publicUrl)
      }

      return uploadedUrls
    }

    


    async function handleSubmit(e) {
      e.preventDefault();

      try {
     
        const { data: product, error: insertError } = await supabase
          .from("products")
          .insert({
            title,
            category,
            brand,
            description,
            price: Number(price),
          })
          .select()
          .single();

        if (insertError) throw insertError;

        let imageUrls = [];
        if (images.length > 0) {
          imageUrls = await uploadImages(product.id, images);
        }
        
        if (imageUrls.length > 0) {
          const { error: updateError } = await supabase
            .from("products")
            .update({ images: imageUrls })
            .eq("id", product.id);

          if (updateError) {
            console.error("update images error", updateError)
            throw updateError;}
        }

        alert("Produkt oprettet");

        
        setTitle("");
        setCategory("");
        setBrand("");
        setDescription("");
        setPrice("");
        setImages([]);
      } catch (error) {
        console.error(error);
        alert("Noget gik galt ved oprettelse af produkt");
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
        <label>
          Billede upload
          <input type="file"
          accept="image/*" 
          multiple
          onChange={(e) => setImages(Array.from(e.target.files))}/>
        </label>

        <button type="submit">Opret produkt</button>
      </form>
    );


} 