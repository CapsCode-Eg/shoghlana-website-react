import { useEffect, useState } from "react";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import Footer from "../../../components/footer/footer";
import ProfileHeroSection from "../../../components/profile/heroSection/profileHeroSection";
import PersonalInformation from "../../../components/profile/personalInformation/personalInformation";
import PortfolioActivities from "../../../components/profile/portfolioActivities/portfolioActivities";
import SkillsAndExperience from "../../../components/profile/skillsOfProfile/skillsOfProfile";


export default function Profile() {
    const [data, setData] = useState({})


    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('user') || '{}'))
    }, [])
    console.log(data)
    return (
        <div className='flex flex-col max-w-screen overflow-hidden'>
            <NavbarTwo />
            <ProfileHeroSection userData={data} isCompany={false} />
            <PersonalInformation />
            <SkillsAndExperience />
            <PortfolioActivities />
            <Footer />
        </div>
    )
}
