import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import Footer from "../../../components/footer/footer";
import ProfileHeroSection from "../../../components/profile/heroSection/profileHeroSection";
import PersonalInformation from "../../../components/profile/personalInformation/personalInformation";
import PortfolioActivities from "../../../components/profile/portfolioActivities/portfolioActivities";
import SkillsAndExperience from "../../../components/profile/skillsOfProfile/skillsOfProfile";


export default function Profile() {
    return (
        <div className='flex flex-col max-w-screen overflow-hidden'>
            <NavbarTwo />
            <ProfileHeroSection />
            <PersonalInformation />
            <SkillsAndExperience />
            <PortfolioActivities />
            <Footer />
        </div>
    )
}
