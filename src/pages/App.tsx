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
import { HttpMethod, useApi } from "../utils/hooks/useApi";

export default function Home() {
    const [data, setData] = useState<any>('');
    const { fetchData } = useApi({
        endPoint: "home",
        method: HttpMethod.GET,
        withOutToast: true
    })
    const [home, setHome] = useState<any>({})

    const handleFetchData = async () => {
        const res = await fetchData()
        if (res?.data) {
            setHome(res?.data?.data)
        }
    }
    useEffect(() => {
        handleFetchData()
        if (localStorage.getItem('token')) {
            setData(localStorage.getItem('token') || JSON.parse(localStorage.getItem('token') || ''))
        }
    }, [])
    return (
        <div className="relative overflow-hidden ">
            {data ? <NavbarTwo /> : <Navbar />}
            <HeroSection bannar={home?.slider} />
            <SectionTwo />
            {home?.job_categories && <SectionThree jobs={home?.job_categories} />}
            <SectionFour />
            <SectionFive />
            <SectionSix />
            <Footer data={home?.settings} />
        </div>
    );
}
