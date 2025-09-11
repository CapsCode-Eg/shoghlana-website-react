import React, { useEffect, useState } from "react";
import CustomSelectMenu from "./customeSelectMenu/customSelectMenu";
import { useParams } from "react-router";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ApplyPopup({ isOpen, onClose }: PopupProps) {
    const { id } = useParams<{ id: string }>()
    const [selectedJob, setSelectedJob] = useState(null);
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setLoading] = useState(false);
    const [company_jobs, setCompanyJobs] = useState([])
    useEffect(() => {
        if (localStorage.getItem('user')) {
            axiosInstance.get('/company/get-jobs').then((res) => {
                setCompanyJobs(res.data.data)
            })
        }
    }, [])
    useEffect(() => {
        setSelectedJob(null);
        setLoading(false);
        setErrors({})
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen])
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        axiosInstance.post('/company/invite', {
            job_id: selectedJob,
            user_id: +(id || "0")
        }).then(() => {
            setLoading(false);
            onClose();
            toast.success('Invited successfully');
        })
    }
    if (!isOpen) return null;
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-[1000]"
            aria-modal="true"
            role="dialog"
        >
            <div className="max-h-[92vh] 2xl:max-h-[90vh] rounded-[10px] md:rounded-[20px]">
                <div
                    className="w-[96%] md:w-[720px] 2md:w-[779px] lg:w-[956px] h-fit md:h-[300px] bg-white rounded-[10px] md:rounded-[20px] mx-auto flex flex-col md:flex-row "
                >
                    <div className="flex flex-col items-center justify-center  w-full md:w-[260px] lg:w-[319px] h-[191px] shrink-0 rounded-b-[10px] md:rounded-b-none md:h-full relative px-[60px]">
                        <img src="/assets/images/backgrounds/jobsBannar.png" alt="Background" className='absolute top-0 w-full  h-[191px] md:h-full object-cover rotate-y-180 rounded-b-[10px] md:rounded-b-none' />
                        <div className='absolute top-0 w-full h-full bg-black opacity-60 rounded-b-[10px] md:rounded-b-none' />
                        <span className="text-center relative z-2 font-bold text-[28px] md:text-[40px] text-white">Shoghlana</span>
                        <span className="text-center relative z-2 font-bold text-[12px] text-white mt-3">We are always looking for talented people</span>
                        <button type='button' onClick={onClose} title="close" className="w-[21px] h-[21px] rounded-full flex md:hidden absolute z-4 top-[14px] end-[14px] items-center justify-center bg-[#33439F]">
                            <svg className="mt-0.5 me-[1px] w-[8px] h-[8px]" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="16" height="3" transform="matrix(-0.707107 0.707107 0.707107 0.707107 12 0)" fill="white" />
                                <rect width="16" height="3" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14 12)" fill="white" />
                            </svg>
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col relative z-2 h-full w-full md:w-[calc(100%-260px)] lg:w-[calc(100%-319px)] bg-[#F2F4F7] ">
                        <img src="/assets/images/backgrounds/popupBg.png" alt="Background" className='absolute top-0 w-full h-full object-cover max-h-[70%]' />
                        <div className="ps-[16px] md:ps-[30px] lg:ps-[60px] pt-[20px] md:pt-[28px] pe-[16px] lg:pe-[44px] pb-[30px] md:pb-[20px] lg:pb-[40px] justify-between  w-full relative z-2 h-full flex flex-col">
                            <div className="flex flex-row items-center justify-between">
                                <span className="text-[21px] md:text-[26px] font-bold text-[#212B66]">Please Choose Your Job</span>
                                <button type='button' onClick={onClose} title="close" className="w-[32px] h-[32px] rounded-full hidden md:flex items-center justify-center bg-[#33439F]">
                                    <svg className="mt-0.5" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="16" height="3" transform="matrix(-0.707107 0.707107 0.707107 0.707107 12 0)" fill="white" />
                                        <rect width="16" height="3" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 14 12)" fill="white" />
                                    </svg>
                                </button>
                            </div>
                            <span className="text-[18px] text-[#212B66]">That Job Will Send in Email To This User</span>
                            <div className="flex flex-col">
                                <div className="mt-2" />
                                <CustomSelectMenu
                                    defaultData={selectedJob ? selectedJob : null}
                                    onChange={(e: any) => setSelectedJob(e.id)}
                                    error={errors.gender && `jobs.${errors?.gender}`}
                                    placeholder={'Select Your Job'}
                                    label={`Job`}
                                    options={company_jobs?.length > 0 ? company_jobs?.map((job: any) => ({ id: job?.id, name: job?.title })) : []} />


                            </div>
                            <button type='submit' disabled={isLoading} className='bg-[#33439F] shrink-0 w-full h-[42px] 2xl:h-[59px] mt-3 rounded-[12px] 2xl:rounded-[15px] flex items-center justify-center font-bold text-[12px] 2xl:text-[19px] text-white shadow-[0px_6.223628044128418px_20.74542808532715px_0px_rgba(51,67,159,0.35)]'>
                                {isLoading ? (
                                    <div
                                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-secondary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        role="status">
                                        <span
                                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                        ></span>
                                    </div>
                                ) : (
                                    <span>Submit</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
