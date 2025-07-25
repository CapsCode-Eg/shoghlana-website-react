import { useEffect, useState } from "react";
import HeroSection from "../components/heroSection/heroSection";
import SectionFive from "../components/sectionFive/sectionFive";
import SectionFour from "../components/sectionFour/sectionFour";
import SectionSix from "../components/sectionSix/sectionSix";
import SectionThree from "../components/sectionThree/sectionThree";
import SectionTwo from "../components/sectionTwo/SectionTwo";
import { HttpMethod, useApi } from "../utils/hooks/useApi";
import MainLayout from "../layout/mainLayout";

export default function Home() {
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
    }, [])
    return (
        <MainLayout>
            <HeroSection bannar={home?.slider} />
            <SectionTwo />
            {home?.job_categories && <SectionThree jobs={home?.job_categories} />}
            {home?.testimonials && home?.testimonials?.length > 0 &&
                <SectionFour data={home?.testimonials} />
            }
            <SectionFive />
            <SectionSix />
        </MainLayout>
    );
}
