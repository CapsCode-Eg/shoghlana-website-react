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
        if (user !== null && user !== 'undefined') {
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

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('here')
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("cv", file); // "cv" should match your backend field name

        try {
            const response = await axiosInstance.post("/upload-cv", {
                body: formData,
            });


            if (!response) throw new Error("Upload failed");

            const data = await response;
            console.log("Upload success:", data);
            // Optionally show success UI or refresh CV preview
        } catch (error) {
            console.error("Upload error:", error);
        }
    };
    return (
        <div className='flex flex-col max-w-screen overflow-hidden'>
            <NavbarTwo />
            <ProfileHeroSection userData={payLoad?.data?.data ? payLoad?.data?.data : data} isCompany={false} />
            <PersonalInformation handleFileChange={handleFileChange} jobCategory={jobCategory} countries={countries} userData={payLoad?.data?.data ? payLoad?.data?.data : data} deleteCV={deleteCV} />
            <SkillsAndExperience userData={payLoad?.data?.data ? payLoad?.data?.data : data} />
            <Footer />
        </div>
    )
}
