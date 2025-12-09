import styles from "./packs.module.css"
import img1 from "/images/hele-pakken.jpg"

export default function Packs() {

    return (
      <div className={styles.packsContainer}>
        <div className={styles.packsContent}>
          <h3 className={styles.packsHeading}>
            Kom godt i gang med boksning - Vælg en komplet begynderpakke
          </h3>
          <p className={styles.packsText}>
            Vil du i gang med boksning? Hos <b>Ringhjørnet.dk</b> har vi samlet
            alt det udstyr, du skal bruge som ny bokser – i én{" "}
            <b>komplet begynderpakke</b>. Du får kvalitet, komfort og sikkerhed
            fra kendte mærker som <b>Venum</b>, <b>Everlast</b> og <b>Adidas</b>{" "}
            – til en pris, der gør det let at komme i gang.
            <br />
            <br />
            Alt er nøje udvalgt, så du får det bedste udstyr til træning,
            sparring og motion. Du slipper for at skulle finde hvert enkelt
            produkt – vi har gjort arbejdet for dig.
          </p>
          <div className={styles.packsGrid}>

            <div className={styles.gridItem}>

              <img src={img1} alt="starterpakken" />

              <div className={styles.gridPackInfo}>

                <h4 className={styles.gridPackHeading}>
                  Bokser startpakken - Alt til en ny bokser
                </h4>
                <p className={styles.gridPackText}>
                  Kom godt i gang med Bokse Startpakken Pakken indeholder: 2 sæt
                  håndbind, 1 tandbeskytter, 1 par Everlast boksestøvler, 1
                  Venum Boksehjelm og 1 par Venum boksehandsker
                </p>

              </div>
              
            </div>

            <div className={styles.gridItem}>
              <img src={img1} alt="starterpakken" />
              <div className={styles.gridPackInfo}>
                <h4 className={styles.gridPackHeading}>
                  Bokser startpakken - Alt til en ny bokser
                </h4>
                <p className={styles.gridPackText}>
                  Kom godt i gang med Bokse Startpakken Pakken indeholder: 2 sæt
                  håndbind, 1 tandbeskytter, 1 par Everlast boksestøvler, 1
                  Venum Boksehjelm og 1 par Venum boksehandsker
                </p>
              </div>
            </div>

            <div className={styles.gridItem}>
              <img src={img1} alt="starterpakken" />
              <div className={styles.gridPackInfo}>
                <h4 className={styles.gridPackHeading}>
                  Bokser startpakken - Alt til en ny bokser
                </h4>
                <p className={styles.gridPackText}>
                  Kom godt i gang med Bokse Startpakken Pakken indeholder: 2 sæt
                  håndbind, 1 tandbeskytter, 1 par Everlast boksestøvler, 1
                  Venum Boksehjelm og 1 par Venum boksehandsker
                </p>
              </div>
            </div>
          </div>
        </div>
        </div> 
    );

}