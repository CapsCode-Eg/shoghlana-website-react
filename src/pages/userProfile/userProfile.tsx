import { useEffect, useState } from "react";
import { HttpMethod, useApi } from "../../utils/hooks/useApi";
import axiosInstance from "../../utils/axiosInstance";
import ProfileHeroSection from "../../components/profile/heroSection/profileHeroSection";
import PersonalInformation from "../../components/profile/personalInformation/personalInformation";
import { SkillsAndExperience } from "../../components/profile/skillsOfProfile/skillsOfProfile";
import { useParams } from "react-router";
import ApplyPopup from "../../components/applyPopup";
import MainLayout from "../../layout/mainLayout";


export default function UserProfile() {
    const { id } = useParams()

    const { fetchData, payLoad } = useApi({
        endPoint: `users/${id}`,
        method: HttpMethod.GET,
        withOutToast: true,
        withFormData: true,
    })

    useEffect(() => {
        fetchData()
    }, [])

    const [jobCategory, setJobCategory] = useState([])
    const [countries, setCountries] = useState([])
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])




    const [isOpen, setIsOpen] = useState(false);
    const handleInvite = () => {
        setIsOpen(true)
    }
    const [cities, setCities] = useState([])
    useEffect(() => {
        if (payLoad?.data?.data?.seeker?.country_id) {
            axiosInstance.get(`/get-cities-by-country-id/${payLoad?.data?.data?.seeker?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [payLoad?.data?.data?.seeker?.country_id])
    return (
        <MainLayout>
            <div className="mt-[54px]"></div>
            <ProfileHeroSection userData={payLoad?.data?.data && payLoad?.data?.data} isCompany={false} handleInvite={handleInvite} cities={cities} countries={countries} />
            <PersonalInformation jobCategory={jobCategory} countries={countries} userData={payLoad?.data?.data && payLoad?.data?.data} />

            <SkillsAndExperience userData={payLoad?.data?.data && payLoad?.data?.data} />
            <ApplyPopup isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </MainLayout>
    )
}
