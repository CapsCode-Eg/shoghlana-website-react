import { useNavigate, useParams } from "react-router";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { gradeLevels } from "../../../utils/constant/profile";
import TextArea from "../../../components/common/textArea/textArea";
import { toast } from "sonner";

export default function ApplicationDetails() {
    const { id } = useParams<{ id?: string }>();

    const [data, setData] = useState<any>({});
    useEffect(() => {
        axiosInstance.get(`/company/application-details/${id}`).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            console.error(err);
        });
    }, [id])
    const [nationalties, setNationalties] = useState<any>([])
    useEffect(() => {
        axiosInstance.get('/nationalities').then((res) => {
            setNationalties(res.data.data)
        })
    }, [])

    const [countries, setCountries] = useState<any>([])
    const [cities, setCities] = useState<any>([])
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
    }, [])
    useEffect(() => {
        if (data?.user_id?.seeker) {
            axiosInstance.get(`/get-cities-by-country-id/${data?.user_id?.seeker?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.user_id?.seeker])
    const navigate = useNavigate();
    const handleConsider = () => {
        axiosInstance.get(`/company/consider-application/${id}`).then(() => {
            toast.success("Application marked as in consideration");
            navigate(-1)
        }).catch((err) => {
            console.error("Error rejecting application:", err);
        });
    }
    const handleAccept = () => {
        axiosInstance.get(`/company/accept-application/${id}`).then(() => {
            toast.success("Application accepted successfully");
            navigate(-1)
        }).catch((err) => {
            console.error("Error rejecting application:", err);
        });
    }

    const handleRejected = () => {
        axiosInstance.get(`/company/reject-application/${id}`).then(() => {
            toast.success("Application rejected successfully");
            navigate(-1)
        }).catch((err) => {
            console.error("Error rejecting application:", err);
        });
    }
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="flex flex-col relative">
                <img src="/assets/appFrame.png" alt="Frame Image" />
                <div className="flex flex-col bg-white w-[98%] xl:w-[80%] mx-auto -top-30 relative z-[2] rounded-2xl p-5 shadow-xl">
                    <div className="flex flex-row items-center gap-4">
                        {
                            data?.user_id?.image ?
                                <img src={data?.user_id?.avatar} alt="Avatar" className="w-12 h-12 rounded-full" />
                                :
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">{data?.user_id?.first_name.charAt(0).toUpperCase() + data?.user_id?.last_name.charAt(0).toUpperCase()}</div>
                        }
                        <div className="flex flex-col ">
                            <div className="flex flex-row items-center gap-0.5">
                                <span className="font-medium text-[18px] text-black">{data?.user_id?.first_name.charAt(0).toUpperCase() + data?.user_id?.first_name.slice(1)} {data?.user_id?.last_name.charAt(0).toUpperCase() + data?.user_id?.last_name.slice(1)}</span>
                                <span className="text-[14px] text-gray-500">({data?.user_id?.seeker?.job_title.charAt(0).toUpperCase() + data?.user_id?.seeker?.job_title.slice(1)})</span>
                            </div>
                            <span className="text-gray-500 text-sm -mt-1">{data?.user_id?.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-row items-center mt-1 ms-1">
                        <span className="text-sm text-gray-500">Mobile : {data?.user_id?.mobile || 0}</span>
                    </div>

                    <span className="text-sm text-gray-500 mt-1 ms-1">Nationality : {nationalties?.find((nationality: any) => nationality.id === data?.user_id?.seeker?.nationality_id)?.name}</span>
                    <span className="text-sm text-gray-500 mt-1 ms-1">{cities?.find((city: any) => city.id === data?.user_id?.seeker?.city_id)?.name || "Cairo" + ", " + countries?.find((country: any) => country.id === data?.user_id?.seeker?.country_id)?.name}</span>
                    <div className="flex flex-row flex-wrap items-center mt-1 ms-1">
                        <div className="flex flex-row items-center mt-1 ms-1">
                            <span className="text-sm text-gray-500">{data?.user_id?.education?.university.charAt(0).toUpperCase() + data?.user_id?.education?.university.slice(1)}</span>
                            <span className="mx-1">-</span>
                            <span className="text-sm text-gray-500">{data?.user_id?.education?.field_of_study.charAt(0).toUpperCase() + data?.user_id?.education?.field_of_study.slice(1)}</span>
                            <span className="mx-1">-</span>
                            <span className="text-sm text-gray-500" >{data?.user_id?.education?.enroll_year + " / " + data?.user_id?.education?.graduation_year}</span>
                            <span className="mx-1">-</span>
                            <span className="text-sm text-gray-500">{gradeLevels[data?.user_id?.education?.grade]?.name || ""}</span>
                        </div>
                        <div className="flex flex-row items-center mt-1 ms-1">
                            <span className="text-sm text-gray-500">{data?.user_id?.years_of_experience || 0}</span>
                            <span className="mx-1">-</span>
                            <span className="text-sm text-gray-500">Years Of Experience</span>
                        </div>
                        <span className="text-sm text-gray-500">Skills : {data?.user_id?.skills?.map((skill: any) => skill.name).join(", ")}</span>
                    </div>
                </div>
                <div className="flex flex-col bg-white w-[98%] xl:w-[80%] mx-auto -top-20 relative z-[2] rounded-2xl p-5 shadow-xl">
                    {data?.answers?.length > 0 && data?.answers?.map((question, index) => {
                        return (
                            <div key={question.id || index} className='flex flex-col gap-[7px]'>
                                <span className='text-[15px] text-[#001433] font-bold'>{question?.question}</span>
                                <TextArea
                                    isDisable
                                    value={question?.answer}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="flex flex-row justify-between items-center bg-white w-[98%] xl:w-[80%] mx-auto -top-10 relative z-[2] rounded-2xl p-5 shadow-xl">
                    <button onClick={() => navigate(-1)} type="button" className="h-[40px] px-[8px] flex items-center justify-center bg-[#EBEDF0] text-[#4D6182] rounded-[8px] hover:bg-[#EBEDF0]/80 transition-colors duration-300">
                        <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.96226 12.7355L11.1035 11.6395L7.39727 8.07184L11.1035 4.50416L9.96226 3.4082L5.10742 8.07184L9.96226 12.7355Z" fill="#4D6182" />
                        </svg>
                        Cancel
                    </button>
                    <div className="flex flex-row gap-2">
                        <button onClick={handleRejected} type="button" className="h-[40px] px-[8px] flex items-center justify-center bg-[#FF3B30] text-white rounded-[8px] hover:bg-[#FF3B30]/80 transition-colors duration-300">
                            Reject
                        </button>
                        <button onClick={handleAccept} type="button" className="h-[40px] px-[8px] flex items-center justify-center bg-[#0055D9] text-white rounded-[8px] hover:bg-[#0055D9]/80 transition-colors duration-300">
                            Accept Application
                        </button>
                        <button onClick={handleConsider} type="button" className="h-[40px] px-[8px] flex items-center justify-center bg-[#597965] text-[white] rounded-[8px] hover:bg-[#597965]/80 transition-colors duration-300">
                            In Consideration
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
