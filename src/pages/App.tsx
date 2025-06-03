import { useEffect, useState } from "react";
import Footer from "../components/footer/footer";
import HeroSection from "../components/heroSection/heroSection";
import Navbar from "../components/navbar/navbar";
import SectionFive from "../components/sectionFive/sectionFive";
import SectionFour from "../components/sectionFour/sectionFour";
import SectionSix from "../components/sectionSix/sectionSix";
import SectionThree from "../components/sectionThree/sectionThree";
import SectionTwo from "../components/sectionTwo/SectionTwo";
import NavbarTwo from "../components/common/navbarTwo/navbarTwo";

export default function Home() {
    const [data, setData] = useState<any>('');
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setData(localStorage.getItem('token') || JSON.parse(localStorage.getItem('token') || ''))
        }
    }, [])
    console.log(data)
    return (
        <div className="relative overflow-hidden ">
            {data ? <NavbarTwo /> : <Navbar />}
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
