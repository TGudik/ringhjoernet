import PageHero from "../components/pageHero/PageHero";
import image from "/images/genrebilleder/front-hero.jpg"
import CategoryCards from "../components/categoryCards/CategoryCards";
import InfoSection from "../components/infoSection/InfoSection";
import PickMe from "../components/pickMeSection/PickMe";

export default function Home() {

    return (
        <section>
            <PageHero img={image} heroTitle={"RINGHJØRNET"} heroText={"Bokseudstyr og træningsudstyr"}/>
            <CategoryCards/>
            <InfoSection/>
            <PickMe/>
        </section>
    )

}