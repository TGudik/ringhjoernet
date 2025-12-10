import PageHero from "../../components/pageHero/PageHero"
import styles from "./about.module.css"
import heroImg from "/images/genrebilleder/aboutHero.jpg"

export default function About() {
  
  return (
    <div>
      <PageHero img={heroImg} heroTitle={"Kontakt Ringhjørnet"} heroText={"Webshoppen til boksere"}/>
      <div className={styles.contactContainer}>
        <div className={styles.infoBox}>
          <h2>Om Ringhjørnet.dk</h2>
          <h3>Din webshop for bokseudstyr og træning</h3>
  
          <p>
            Hos <b>Ringhjørnet.dk</b> brænder vi for boksning.
            Vores mål er at gøre det nemt for både begyndere og erfarne boksere
            at finde det rigtige udstyr.
          </p>
  
          <p>
            Vi tilbyder et nøje udvalgt sortiment af boksehandsker, sko, hjelme,
            håndbind og beskyttelse fra kendte mærker som <b>Venum</b>,
            <b> Everlast</b>, <b>Rival</b> og <b>Adidas</b>.
          </p>
  
          <p>
            Vi tror på, at godt udstyr gør en forskel. Derfor vælger vi kun
            produkter, vi selv ville bruge til træning. Uanset om du bokser for
            motionens skyld eller står klar til kamp, kan du finde alt, du skal
            bruge hos os.
          </p>
  
          <p>
            Har du spørgsmål til udstyr, størrelser eller levering?
            Så er du altid velkommen til at kontakte os – vi hjælper gerne med
            personlig rådgivning.
          </p>
        </div>
  
        <div className={styles.formBox}>
          <h2>Kontakt os</h2>
          <p>
            Har du spørgsmål til produkter, ordrer eller træningsudstyr?
            Udfyld formularen herunder, så vender vi hurtigt tilbage.
          </p>
  
          <form className={styles.form}>
            <label>
              Dit navn
              <input type="text" name="name" required />
            </label>
  
            <label>
              Din e-mail
              <input type="email" name="email" required />
            </label>
  
            <label>
              Emne
              <input type="text" name="subject" required />
            </label>
  
            <label>
              Din besked (valgfri)
              <textarea name="message" rows="5"></textarea>
            </label>
  
            <button type="submit" className={styles.submitBtn}>
              Send besked
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};
