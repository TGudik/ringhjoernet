import styles from "./pickUs.module.css"

export default function PickMe() {

    return (
        <div className={styles.pickMe}>

            <h3 className={styles.pickMeHeading}>Derfor skal du vælge Ringhjørnet</h3>

            <ul className={styles.pickMeList}>
                <li>Kvalitets udstyr valgt af boksere, til boksere</li>
                <li>Hurtig levering og dansk kundeservice</li>
                <li>Udstyr til både begyndere og erfarne</li>
                <li>Fokus på performance, sikkerhed og komfort</li>
            </ul>

        </div>
    )

}