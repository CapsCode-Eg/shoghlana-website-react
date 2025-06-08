import { useEffect, useState } from "react";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import Footer from "../../../components/footer/footer";
import ProfileHeroSection from "../../../components/profile/heroSection/profileHeroSection";
import PersonalInformation from "../../../components/profile/personalInformation/personalInformation";
import { HttpMethod, useApi } from "../../../utils/hooks/useApi";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "sonner";
import { SkillsAndExperience } from "../../../components/profile/skillsOfProfile/skillsOfProfile";


export default function Profile() {
    const [data, setData] = useState<any>({})

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user !== null) {
            setData(JSON.parse(user));
        }
    }, [])

    const { fetchData, payLoad } = useApi({
        endPoint: "user-profile",
        method: HttpMethod.GET,
        withOutToast: true,
        withFormData: true,
    })

    useEffect(() => {

        if (data?.type === 'user') {
            fetchData()
        }
    }, [data])

    console.log('Profile Data:', payLoad);

    const deleteCV = async () => {
        axiosInstance.delete('/delete-cv').then(() => {
            fetchData()
        }).catch(() => {
            toast.error('Failed to delete CV')
        })
    }
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

    return (
        <div className='flex flex-col max-w-screen overflow-hidden'>
            <NavbarTwo />
            <ProfileHeroSection userData={payLoad?.data?.data ? payLoad?.data?.data : data} isCompany={false} />
            <PersonalInformation jobCategory={jobCategory} countries={countries} userData={payLoad?.data?.data ? payLoad?.data?.data : data} deleteCV={deleteCV} />
            <SkillsAndExperience userData={payLoad?.data?.data ? payLoad?.data?.data : data} />
            <Footer />
        </div>
    )
}
