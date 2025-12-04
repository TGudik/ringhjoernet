import PageHero from "../components/pageHero/PageHero";
import image from "/images/genrebilleder/front-hero.jpg"

export default function Home() {

    return (
        <section>
            <PageHero img={image} heroTitle={"RINGHJØRNET"} heroText={"Bokseudstyr og træningsudstyr"}/>
        </section>
    )

}