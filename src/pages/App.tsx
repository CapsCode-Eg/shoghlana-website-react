import Footer from "../components/footer/footer";
import HeroSection from "../components/heroSection/heroSection";
import Navbar from "../components/navbar/navbar";
import SectionFive from "../components/sectionFive/sectionFive";
import SectionFour from "../components/sectionFour/sectionFour";
import SectionSix from "../components/sectionSix/sectionSix";
import SectionThree from "../components/sectionThree/sectionThree";
import SectionTwo from "../components/sectionTwo/SectionTwo";

export default function Home() {
    return (
        <div className="relative overflow-hidden ">
            <Navbar />
            <HeroSection />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <Footer />
        </div>
    );
}
