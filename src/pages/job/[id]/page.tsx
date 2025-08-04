import { Link, useParams } from "react-router";
import JobDetails from "../../../components/jobs/jobDetails";
import JobRequirements from "../../../components/jobs/jobRequirements";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { PLACES, TYPES } from "../../../utils/constant/job";
import { toast } from "sonner";
import MainLayout from "../../../layout/mainLayout";

export default function ViewJob() {
    const [data, setData] = useState<any>({});
    const { id } = useParams();
    useEffect(() => {
        axiosInstance.get(`/jobs/${id}`).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
            console.error(err);
        });
    }, [])
    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    useEffect(() => {
        axiosInstance.get(`/country`).then((res) => {
            setCountries(res.data.data)
        })

    }, [])
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])
    useEffect(() => {
        if (data?.country_id !== null && data?.country_id !== "") {
            axiosInstance.get(`/get-cities-by-country-id/${data?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.country_id])
    const handleSaveJob = () => {
        axiosInstance.post('/saved-jobs', { company_job_id: id }).then(() => {
            toast.success('Job saved successfully')
            setData((prevData: any) => ({
                ...prevData,
                is_saved: true
            }))
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
            toast.error('Failed to save job')
            return err;
        })
    }
    const [isCompany, setIsCompany] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user') || '{}');
            setIsCompany(user?.type === 'company');
        }
    }, [])
    return (
        <MainLayout>
            <div className="w-[100%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <div className="p-6 rounded-xl bg-white -mt-10 relative z-[10]">
                    <div className="flex items-center">
                        <div className='flex flex-row items-center gap-1'>
                            <h2 className="text-[25.73px] text-[#001433] font-bold">{data?.title || 'Loading'}</h2>
                        </div>
                    </div>
                    <div className='flex flex-row -ms-2.5 mt-1.5'>
                        <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {TYPES.find((type) => type.id == data?.post_type)?.name || 'Loading'}
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {PLACES.find((place) => place.id == data?.work_place)?.name || 'Loading'}
                        </span>
                    </div>
                    <p className="text-main flex flex-row items-center mt-2">
                        <Link to={`/company/${data?.company_id}`} className='font-[700] text-[14px]'>{data?.company_name}</Link>
                        <img src='/assets/icons/verified.svg' width={20} height={20} className='mb-1 mx-2' alt='Verified' />
                        {/* @ts-expect-error Type mismatch */}
                        <span className='text-[14px] text-[#4D6182] font-[600]'>- {cities.find((city: any) => city.id == data?.city_id)?.name}, {countries.find((country: any) => country.id == data?.country_id)?.name}</span>
                    </p>
                    <div className="flex flex-col-reverse md:flex-row gap-4 md:justify-between flex-wrap justify-center items-center mt-[31px]">
                        <div className='flex flex-col-reverse md:flex-row gap-5 justify-start items-start md:items-center'>
                            {userData?.type !== 'company' &&
                                <>
                                    {data?.is_applied ?
                                        <span>
                                            You Have Already Applied For This Job
                                        </span>
                                        : <Link to={window.localStorage.getItem("user") ? `/job/${id}/apply` : '/login'} className="bg-main rounded-[5px] h-[40px] w-full md:w-[160px] lg:w-[200px] text-[15px] font-[400] text-white flex flex-col items-center justify-center">
                                            Apply For Job
                                        </Link>}
                                </>
                            }
                            <div className=" items-center md:flex hidden ms-0 xl:ms-[30px]">
                                <span className="font-[600] text-[22px] xl:text-[28px] text-[#4D6182]">{data?.apply || 0}</span>
                                <span className="font-[600] text-[13px] ms-1 xl:ms-2 text-[#4D6182]">Applicants for</span>
                            </div>
                            <div className='flex flex-row ms-4 md:ms-0 xl:ms-10 divide-x-[1px] divide-black/40'>
                                <div className="flex flex-col items-center pe-4 px-0 lg:pe-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">{data?.views || 0}</span>
                                    <span className="font-[400] text-[13px] text-[#4D6182]">Viewed</span>
                                </div>
                                <div className="flex flex-col items-center px-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">{data?.consider_count || 0}</span>
                                    <span className="font-[400] text-[13px] text-nowrap text-[#4D6182]">In Consideration</span>
                                </div>
                                <div className="flex flex-col items-center ps-4 px-0 lg:ps-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">{data?.not_selected_count || 0}</span>
                                    <span className="font-[400] text-[13px] text-nowrap text-[#4D6182]">Not Selected</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="flex md:hidden items-center ms-0 md:ms-[30px]">
                                <span className="font-[600] text-[28px] text-[#4D6182]">{data?.apply}</span>
                                <span className="font-[600] text-[13px] ms-2 text-[#4D6182]">Applicants for</span>
                            </div>
                            {window.localStorage.getItem("user") && !isCompany && <button onClick={() => {
                                if (!data?.is_saved) {
                                    handleSaveJob()
                                } else {
                                    axiosInstance.delete(`/saved-jobs/${id}`).then(() => {
                                        toast.success('Job unsaved successfully')
                                        setData((prevData: any) => ({
                                            ...prevData,
                                            is_saved: false
                                        }))
                                    }).catch((err) => {
                                        toast.error(err?.response?.data?.message, { id: 'add-country' })
                                        toast.error('Failed to unsave job')
                                    })
                                }
                            }} type='button' title='Share' className={`${data?.is_saved ? "bg-[#0055D9]" : "bg-gray-500"}  rounded-[5px] hidden md:flex flex-col items-center w-[38px] h-[40px] justify-center`}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 4.5C5.9 4.5 5 5.4 5 6.5V20.5L12 17.5L19 20.5V6.5C19 5.4 18.1 4.5 17 4.5H7Z" fill="white" />
                                </svg>
                            </button>}
                            {/* <button type='button' title='Share' className='bg-white border-[1px] border-[#4D6182] rounded-[5px] hidden md:flex flex-col items-center w-[38px] h-[40px] justify-center'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8 14.652V18.343L21 12.036L13.8 5.75V9.336C6.802 10.243 4.012 14.736 3 19.25C5.497 16.086 8.805 14.652 13.8 14.652Z" fill="#4D6182" />
                                </svg>
                            </button> */}
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[98%] xl:w-[80%] mx-auto mt-[20px] lg:mt-[36px]'>
                <JobDetails data={data} />
            </div>
            <div className='w-[98%] xl:w-[80%] mx-auto my-[20px] lg:my-[36px]'>
                <JobRequirements data={data} />
            </div>
        </MainLayout>
    )
}
