import { Link, useNavigate, useParams } from "react-router";
import TextArea from "../../../../components/common/textArea/textArea";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { PLACES, TYPES } from "../../../../utils/constant/job";
import { toast } from "sonner";
import MainLayout from "../../../../layout/mainLayout";

export default function ApplyForJob() {
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
    const [application, setApplication] = useState({
        answers: [] as Array<{ question_id: string, answer: string }>,
        company_job_id: id,
    });

    useEffect(() => {
        axiosInstance.get(`/country`).then((res) => {
            setCountries(res.data.data)
        })
    }, [])

    useEffect(() => {
        if (data?.country_id !== null && data?.country_id !== "") {
            axiosInstance.get(`/get-cities-by-country-id/${data?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.country_id])
    // Handler for when an answer changes
    const handleAnswerChange = (questionId: string, answer: string) => {
        setApplication(prev => {
            // Check if this question already has an answer
            const existingAnswerIndex = prev.answers.findIndex(a => a.question_id === questionId);

            if (existingAnswerIndex >= 0) {
                // Update existing answer
                const newAnswers = [...prev.answers];
                newAnswers[existingAnswerIndex] = { question_id: questionId, answer };
                return { ...prev, answers: newAnswers };
            } else {
                // Add new answer
                return { ...prev, answers: [...prev.answers, { question_id: questionId, answer }] };
            }
        });
    };
    const navigate = useNavigate()
    // Handler for form submission
    const handleSubmit = () => {
        axiosInstance.post('/jobs/apply', application).then(() => {
            toast.success('Application submitted successfully');
            navigate('/explore');
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
        });
    };

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
        })
    }

    return (
        <MainLayout>
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
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
                        <Link to={`/company/${data?.company_id}`} className='font-[700] text-[14px]'>{data?.company_name || 'Loading'}</Link>
                        <img src='/assets/icons/verified.svg' width={20} height={20} className='mb-1 mx-2' alt='Verified' />
                        {/* @ts-expect-error Type mismatch */}
                        <span className='text-[14px] text-[#4D6182] font-[600]'>- {cities.find((city) => city.id == data?.city_id)?.name}, {countries.find((country) => country.id == data?.country_id)?.name}</span>
                    </p>
                    {/* <span className='mt-4 text-[13px] font-[400] text-[#4D6182]'>{data?.description || 'Loading'}</span> */}
                    <div className="flex flex-col-reverse md:flex-row gap-4 md:justify-between flex-wrap justify-center items-center mt-[31px]">
                        <div className='flex flex-col-reverse md:flex-row gap-5 justify-start items-start md:items-center'>
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
                                <span className="font-[600] text-[28px] text-[#4D6182]">{data?.apply || 0}</span>
                                <span className="font-[600] text-[13px] ms-2 text-[#4D6182]">Applicants for</span>
                            </div>
                            <button onClick={() => {
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
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className="w-[98%] xl:w-[80%] mx-auto my-[20px] xl:my-[34px] flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className='flex flex-row items-center h-[56px] ps-[32px] bg-main py-[13px] text-white font-bold text-[20px] w-full'>
                    <span>Application Form</span>
                </div>
                <div className='flex flex-col gap-[30px] py-[32px] px-[28px]'>
                    {data?.questions?.length > 0 && data?.questions?.map((question, index) => {
                        return (
                            <div key={question.id || index} className='flex flex-col gap-[7px]'>
                                <span className='text-[15px] text-[#001433] font-bold'>{question?.question}</span>
                                <TextArea
                                    value={application.answers.find(a => a.question_id === question.id)?.answer || ''}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="w-[98%] xl:w-[80%] mx-auto mb-[10px] xl:mb-[24px] flex 
            flex-col-reverse
            md:flex-row justify-center md:justify-between items-center bg-white overflow-hidden flex-wrap gap-4">
                <Link to="/explore" className='flex flex-row items-center  bg-[#EBEDF0] border-[1px] border-[#D9DDE4] justify-center gap-1 font-[400] text-[15px] w-[90px] h-[40px] text-[#4D6182]'>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.96275 12.736L11.104 11.64L7.39775 8.07232L11.104 4.50465L9.96275 3.40869L5.10791 8.07232L9.96275 12.736Z" fill="#4D6182" />
                    </svg>
                    Cancle
                </Link>
                <div className='flex flex-row gap-2'>
                    <button
                        type='button'
                        className='flex flex-row items-center  bg-main justify-center gap-1 font-[400] text-[15px] px-2 w-fit md:w-[170px] h-[40px] text-white'
                        onClick={handleSubmit}
                    >
                        Submit application
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}
