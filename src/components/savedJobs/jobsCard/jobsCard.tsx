import { Link } from "react-router";
import { LEVELS, PLACES, TYPES } from "../../../utils/constant/job";
import { useEffect, useState } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "sonner";

export default function JobsCard({ isDone, isAccepted, job, handleDelete }: { handleDelete?: (id: number) => void, job?: any, isDone?: boolean, isAccepted?: boolean }) {
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])
    const [data, setData] = useState<any>({});
    useEffect(() => {
        if (job) {
            setData(job);
        }
    }, [job])

    const handleSaveJob = () => {
        axiosInstance.post('/saved-jobs', { company_job_id: job?.id }).then(() => {
            toast.success('Job saved successfully')
            setData((prevData: any) => ({
                ...prevData,
                is_saved: true
            }))
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
            return err;
        })
    }
    return (
        <div className=" w-full mx-auto relative bg-white rounded-lg shadow-md px-4 pt-4 pb-16  flex items-start min-h-[145px]">
            <div className="flex-grow">
                <h2 className="text-xl font-bold flex flex-row flex-wrap text-blue-600">
                    <Link to={`/job/${job?.id}/view`}>{job?.title || 'Loading'}</Link>
                    <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {TYPES.find((type) => type.id == job?.post_type)?.name || 'Loading'}
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {PLACES.find((place) => place.id == job?.work_place)?.name || 'Loading'}
                    </span>
                </h2>
                <p className="text-[#001433] flex flex-row items-center mt-1">
                    {
                        userData?.type !== 'company' && <>
                            <Link to={`/company/${job?.company_id}`} className='font-semibold text-[12px]'>{job?.company_name}</Link>
                            <img src='/assets/icons/verified.svg' width={20} height={20} className='mb-1 mx-2' alt='Verified' />
                        </>
                    }
                </p>
                <p className="text-[#4D6182] font-[400] text-[12px] mt-2 max-w-[634px]">
                    {LEVELS.find((level) => level.id == job?.level)?.name} · {job?.min_year}-{job?.max_year} Yrs of Exp
                </p>
                <span className="text-[#4D6182] font-[400] text-[12px] mt-2 max-w-[634px]">
                    Skills Required: {job?.skills?.map((skill: any) => skill?.name).join(', ')}
                </span>
                <span className="text-[#4D6182] font-[400] text-[12px] mt-2 line-clamp-3">{job?.description}</span>
                {userData?.type !== 'company' && !isDone && <button className="mt-4 px-4 py-2 bg-[#0055D9]/[14%] text-[#0055D9] rounded-[10px] font-[400] text-[12px] flex flex-row items-center gap-1.5">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 14.0051L13.5309 15.8384C13.6535 15.9133 13.7956 15.9502 13.9393 15.9445C14.0829 15.9388 14.2216 15.8908 14.338 15.8064C14.4543 15.722 14.5431 15.6051 14.5932 15.4704C14.6432 15.3356 14.6523 15.1891 14.6192 15.0492L13.8159 11.6017L16.4967 9.27922C16.9859 8.85505 16.7234 8.05172 16.08 8.00088L12.5525 7.70088L11.1717 4.44338C10.9234 3.85172 10.0767 3.85172 9.82837 4.44338L8.44754 7.69338L4.92004 7.99338C4.27671 8.04505 4.01421 8.84838 4.50337 9.27172L7.18421 11.5942L6.38087 15.0417C6.34781 15.1816 6.35688 15.3281 6.40692 15.4629C6.45697 15.5976 6.54576 15.7145 6.66212 15.7989C6.77848 15.8833 6.91721 15.9313 7.06082 15.937C7.20444 15.9427 7.34653 15.9058 7.46921 15.8309L10.5 14.0051Z" fill="#0055D9" />
                    </svg>
                    You fit this role.
                </button>}
                {
                    isDone && <Link to='job/1/apply' className='text-main border-main border-[1px] text-[12px] font-[400]  w-[155px] mt-4 h-[32px] flex flex-col items-center justify-center rounded-[4px]'>
                        View your Application
                    </Link>
                }
            </div>
            <div className="flex absolute bottom-[10px] end-[14px] flex-row flex-wrap space-x-4">
                {
                    isDone && isAccepted && <span className='flex flex-row gap-2 items-center justify-center text-[#2C9266] text-[12px] font-[400] bg-[#2C9266]/[14%] px-2 py-1 w-[90px] h-[40px] rounded-[4px]'>
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.40768 13.6912L15.648 6.45088C15.8189 6.28001 16.0182 6.19458 16.2461 6.19458C16.4739 6.19458 16.6732 6.28001 16.8441 6.45088C17.0149 6.62174 17.1004 6.82478 17.1004 7.06001C17.1004 7.29523 17.0149 7.49799 16.8441 7.66828L9.00571 15.528C8.83484 15.6989 8.6355 15.7843 8.40768 15.7843C8.17986 15.7843 7.98052 15.6989 7.80966 15.528L4.13609 11.8544C3.96522 11.6836 3.88321 11.4808 3.89004 11.2462C3.89688 11.0115 3.98601 10.8085 4.15744 10.637C4.32888 10.4656 4.53192 10.3802 4.76657 10.3807C5.00123 10.3813 5.20399 10.4667 5.37485 10.637L8.40768 13.6912Z" fill="#2C9266" />
                        </svg>
                        Accepted
                    </span>
                }
                {
                    isDone && !isAccepted && <span className='flex flex-row gap-2 items-center justify-center text-[#E41216] text-[12px] font-[400] bg-[#E41216]/[14%] px-2 py-1 w-[90px] h-[40px] rounded-[4px]'>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.23242 5.48071L14.062 13.3103M6.23242 13.3103L14.062 5.48071" stroke="#E41216" strokeWidth="1.9574" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Rejected
                    </span>
                }
                {userData?.type !== 'company' && window.localStorage.getItem("user") && <>
                    <button onClick={() => {
                        if (!data?.is_saved) {
                            handleSaveJob()
                        } else {
                            axiosInstance.delete(`/saved-jobs/${data?.id}`).then(() => {
                                toast.success('Job unsaved successfully')
                                setData((prevData: any) => ({
                                    ...prevData,
                                    is_saved: false
                                }))
                            }).catch((err) => {
                                toast.error(err?.response?.data?.message, { id: 'add-country' })
                                return err;
                            })
                        }
                    }} type='button' title='Share' className={`${data?.is_saved ? "bg-[#0055D9]" : "bg-gray-500"}  rounded-[5px] hidden md:flex flex-col items-center w-[38px] h-[40px] justify-center`}>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 4.5C5.9 4.5 5 5.4 5 6.5V20.5L12 17.5L19 20.5V6.5C19 5.4 18.1 4.5 17 4.5H7Z" fill="white" />
                        </svg>
                    </button>
                </>}
                {userData?.type === 'company' && <>
                    <button type='button' onClick={() => handleDelete && handleDelete(job.id)} title='Share' className='bg-red-500 hover:cursor-pointer rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                        <Trash2 color="white" size={18} />
                    </button>
                    <Link to={`/post_job/edit/${job.id}`} title='Edit' className='bg-white hover:cursor-pointer  border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                        <Edit size={18} />
                    </Link>
                    <Link to={`/post_job/view/${job.id}`} title='View' className='bg-white hover:cursor-pointer  border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                        <Eye size={18} />
                    </Link>
                    <Link to={`/job_applications/${job.id}`} title='View' className='bg-white hover:cursor-pointer  border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center px-4 h-[40px] justify-center'>
                        View Applications
                    </Link>
                </>}
            </div>
        </div>
    );
};

