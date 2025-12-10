import PageHero from "../components/pageHero/PageHero";
import image from "/images/genrebilleder/front-hero.jpg"
import CategoryCards from "../components/categoryCards/CategoryCards";
import InfoSection from "../components/infoSection/InfoSection";
import PickUs from "../components/pickUsSection/PickUs";

export default function Home() {

    return (
        <section>
            <PageHero img={image} heroTitle={"RINGHJØRNET"} heroText={"Bokseudstyr og træningsudstyr"}/>
            <CategoryCards/>
            <InfoSection/>
            <PickUs/>
        </section>
    )

}