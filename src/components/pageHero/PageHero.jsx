import styles from "./pageHero.module.css"

export default function PageHero( {img, heroTitle, heroText} ) {

    return (

        <div className={styles.heroContainer}>
            <img src={img} alt={heroTitle} />
            <div className={styles.textContainer}>
              <h1>{heroTitle}</h1>
              <h2>{heroText}</h2>
            </div>
        </div>

    )

}