import styles from "./infoSection.module.css"

export default function InfoSection() {

    return (
      <div className={styles.infoSection}>
        <div className={styles.infoSectionContent}>
            <h3 className={styles.sectionHeading}>
              Find alt bokseudstyr hos Ringhjørnet
            </h3>
            <p className={styles.infoText}>
              Hos <b>Ringhjørnet</b> finder du et stort udvalg af <b>bokseudstyr</b> til både træning og kamp. Vi tilbyder alt fra <b>boksehandsker</b>,{" "}
              <b>boksestøvler</b> og <b>boksehjelme</b> til <b>håndbind</b>, <b>tandbeskyttere</b> og <b>skridtbeskyttere</b> – alt hvad du har brug for til sikker og
              effektiv <b>boksetræning</b>.
              <br />
              <br />
              Vores produkter er nøje udvalgt for at sikre <b>kvalitet</b>,{" "}
              <b>komfort</b> og
              <b>holdbarhed</b>, uanset om du er ny i sporten eller trænet bokser.
              Med det rette bokseudstyr får du bedre teknik, øget sikkerhed og en
              mere professionel oplevelse i ringen.
              <br />
              <br />
              Hos <b>Ringhjørnet</b> går vi op i at give dig det bedste udstyr – fra
              de klassiske boksehandsker i ægte læder til moderne hjelme og lette
              boksestøvler med perfekt greb.
            </p>
    
            <div className={styles.infoGrid}>
              <div className={styles.gridItem}>
                <h4 className={styles.gridHeading}>
                  Boksehandsker til sandsæk og sparring
                </h4>
                <p className={styles.gridText}>
                  Uanset om du træner på sæk eller sparrer i ringen, er{" "}
                  <b>boksehandsker</b> uundværlige. Vælg mellem handsker til
                  træning, sparring og sandsæk i materialer som ægte læder og
                  syntetisk PU. De rigtige handsker beskytter både dine hænder og
                  din modstander.
                </p>
              </div>
              <div className={styles.gridItem}>
                <h4 className={styles.gridHeading}>
                  Boksesko med stabilitet og greb
                </h4>
                <p className={styles.gridText}>
                  Et par gode <b>boksesko</b> giver stabilitet, hurtighed og kontrol
                  i ringen. Med fleksible såler og god støtte bevæger du dig hurtigt
                  og sikkert. Hos Ringhjørnet finder du lette og åndbare
                  boksestøvler til både begyndere og erfarne boksere.
                </p>
              </div>
              <div className={styles.gridItem}>
                <h4 className={styles.gridHeading}>
                  Boksehjelme for bedste sikkerhed
                </h4>
                <p className={styles.gridText}>
                  En <b>boksehjelm</b> beskytter hovedet under sparring og reducerer
                  risikoen for skader. Vores hjelme kombinerer høj komfort med
                  sikkerhed og god ventilation, så du kan fokusere på din teknik
                  uden at gå på kompromis med beskyttelsen.
                </p>
              </div>
              <div className={styles.gridItem}>
                <h4 className={styles.gridHeading}>Beskyttelse: sikker træning</h4>
                <p className={styles.gridText}>
                  <b>Tandbeskytter:</b> Beskytter tænder og kæbe. <b>Skridtbeskytter:</b> Giver
                  sikkerhed mod træffere og øger trygheden i ringen. <b>Håndbind:</b>
                  Støtter håndled og knoer for at forebygge skader.
                </p>
              </div>
            </div>
        </div>
      </div>
    );

}