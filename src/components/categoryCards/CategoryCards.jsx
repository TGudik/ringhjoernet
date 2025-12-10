import styles from "./categoryCards.module.css"
import { Link } from "react-router-dom";
import gloveImg from "/images/hill-f120-1.webp"
import shoeImg from "/images/adidas-speedex-1.webp"
import headgearImg from "/images/venum-challenger-hjelm-white.webp"
import protectionImg from "/images/skridtbeskytter-everlast.jpg"


export default function CategoryCards({withText}) {

    return (
      <div className={styles.cards} >
        <Link to="/products/gloves" className={styles.cardContainer}>
          {withText && <h3 className={styles.cardsHeading}>BOKSEHANDSKER</h3>}
          <img src={gloveImg} alt="Boxing gloves" className={styles.cardImg} />
          {withText && (
            <p className={styles.cardsText}>
              Boksehandsker er det mest essentielle stykke udstyr i boksning. De
              beskytter dine hænder og reducerer risikoen for skader på både dig
              og din modstander. Hos Ringhjørnet finder du boksehandsker i høj
              kvalitet til både begyndere og professionelle. Vælg handsker efter
              vægt, materiale og formål – lette handsker til træning og tunge
              handsker til sparring.
            </p>
          )}
        </Link>
        <Link to="/products/shoes" className={styles.cardContainer}>
          {withText && <h3 className={styles.cardsHeading}>BOKSESKO</h3>}
          <img src={shoeImg} alt="Boxing Shoes" className={styles.cardImg} />
          {withText && (
            <p className={styles.cardsText}>
              Et par gode <b>boksesko</b> giver dig <b>stabilitet</b>, <b>støtte</b> og optimal
              <b>bevægelsesfrihed</b> i ringen. De er designet med tynde, fleksible
              såler, der sikrer perfekt fodfæste og hurtige bevægelser. Uanset
              om du er nybegynder eller erfaren bokser, er de rigtige boksesko
              afgørende for dit fodarbejde og din balance.
            </p>
          )}
        </Link>
        <Link to="/products/headgear" className={styles.cardContainer}>
          {withText && <h3 className={styles.cardsHeading}>BOKSEHJELME</h3>}
          <img
            src={headgearImg}
            alt="Boxing Headgear"
            className={styles.cardImg}
          />
          {withText && (
            <p className={styles.cardsText}>
              En <b>boksehjelm</b> er uundværlig under sparring. Den beskytter hovedet
              mod slag og reducerer risikoen for skrammer og stød. Hos {" "}
              <b>Ringhjørnet</b> finder du boksehjelme med perfekt pasform, der
              kombinerer <b>komfort</b>, <b>sikkerhed</b> og <b>synsfelt</b>, så du kan træne trygt
              og effektivt.
            </p>
          )}
        </Link>
        <Link to="/products/protection" className={styles.cardContainer}>
          {withText && <h3 className={styles.cardsHeading}>BESKYTTELSE</h3>}
          <img
            src={protectionImg}
            alt="Boxing Protection"
            className={styles.cardImg}
          />
          {withText && (
            <p className={styles.cardsText}>
              <b>Beskyttelsesudstyr</b> er afgørende for sikker boksetræning.{" "}
              <b>Håndbind</b>
              støtter håndled og knoer, <b>tandbeskyttere</b> beskytter tænder
              og kæbe, og <b>skridtbeskyttere</b> giver ekstra sikkerhed mod
              lave slag. Invester i god beskyttelse – det styrker din
              træningsglæde og mindsker risikoen for skader.
            </p>
          )}
        </Link>
      </div>
    );

}