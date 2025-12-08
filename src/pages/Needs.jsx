import PageHero from "../components/pageHero/PageHero"
import image from "/images/genrebilleder/needs-hero.jpg"
import Packs from "../components/packs/packs"

export default function Needs() {
  return(
    <section>
      <PageHero img={image} heroTitle={"Alt til en bokser"} heroText={"Udstyr til amatør- og motionsboksere"}/>
      <Packs/>
    </section>
  )
};
