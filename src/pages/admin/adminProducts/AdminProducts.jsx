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

    // funktion til at sende billeder til supabase
    async function uploadImages(productId, files) {
      const uploadedUrls = []

      // laver et unikt navn til hver fil og laver et variabel der passer med fisltien til billedet
      for (const file of files) {
        const fileExt = file.name.split(".").pop()
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const filePath = `${productId}/${fileName}`

        // uploader filen til supabase bucket til filstien fra før 
        const { error } = await supabase.storage
        .from("product-images")
        .upload(filePath, file)

        if (error) throw error

        // henter url til billede fra supabase
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
        // uploader billede (slug genereres med sql-funktion i supabase dashboard)
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

        // når product er oprettet bruges produkt id til at uploade billeder i rigtig mappe i bucket
        let imageUrls = [];
        if (images.length > 0) {
          imageUrls = await uploadImages(product.id, images);
        }
        
        // når billederne er i supabasebucket opdateres images-arrayet i supabase-tabellen til at indeholde image-urls
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

        // clearer felter så nyt produkt kan oprettes
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