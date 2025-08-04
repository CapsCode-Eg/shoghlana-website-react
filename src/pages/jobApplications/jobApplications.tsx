import { Link, useParams } from "react-router";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { gradeLevels } from "../../utils/constant/profile";
import { toast } from "sonner";

export default function JobApplications() {
    const { id } = useParams<{ id?: string }>();

    const [data, setData] = useState<any>({});
    const [nationalties, setNationalties] = useState<any>([])
    useEffect(() => {
        axiosInstance.get(`/company/job-application/${id}`).then((res) => {
            setData(res.data.data);
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
        });
    }, [id])

    useEffect(() => {
        axiosInstance.get('/nationalities').then((res) => {
            setNationalties(res.data.data)
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
        })
    }, [])
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="flex flex-col relative mt-0">
                <img src="/assets/appFrame.png" alt="Frame Image" className="min-h-[200px]" />
                <div className="flex flex-col bg-white w-[98%] xl:w-[80%] mx-auto -top-30 relative z-[2] rounded-2xl p-5 shadow-xl">
                    <span className="text-[#0055D9] text-[32px] font-bold">{data?.title}</span>
                    <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                    <span className="mt-4 p-2 shadow-2xl w-fit rounded-[8px] text-[16px] font-meduim text-[#0055D9] border border-[#c2c2c2]">Applier : {data?.applications?.length || 0}</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        {
                            data?.applications?.map((application: any) => {
                                return (
                                    <div key={application.id} className="p-4 bg-white shadow-lg rounded-lg relative flex flex-col justify-between">
                                        <div className="flex flex-row items-center gap-4">
                                            {
                                                application?.user_id?.image ?
                                                    <img src={application?.user_id?.image} alt="Avatar" className="w-12 h-12 rounded-full" />
                                                    :
                                                    <div className="w-12 shrink-0 h-12 rounded-full bg-gray-200 flex items-center justify-center leading-[20px]">{(application?.user_id?.first_name?.charAt(0)?.toUpperCase() || '') + (application?.user_id?.last_name?.charAt(0)?.toUpperCase() || '')}</div>
                                            }
                                            <div className="flex flex-col ">
                                                <div className="flex flex-row items-center gap-0.5">
                                                    <span className="font-medium text-[18px] text-black leading-[13px] mb-1">{(application?.user_id?.first_name?.charAt(0)?.toUpperCase() || '') + (application?.user_id?.first_name?.slice(1) || '')} {(application?.user_id?.last_name?.charAt(0)?.toUpperCase() || '') + (application?.user_id?.last_name?.slice(1) || '')}  {application?.user_id?.seeker?.job_title && <span className="text-[14px] text-gray-500 ms-1 leading-[20px]">({(application?.user_id?.seeker?.job_title?.charAt(0)?.toUpperCase() || '') + (application?.user_id?.seeker?.job_title?.slice(1) || '')})</span>}</span>

                                                </div>
                                                <span className="text-gray-500 text-sm -mt-1">{application?.user_id?.email}</span>
                                            </div>
                                        </div>
                                        {application?.user_id?.mobile && <div className="flex flex-row items-center mt-1 ms-1">
                                            <span className="text-sm text-gray-500">Mobile : {application?.user_id?.mobile || 0}</span>
                                        </div>}

                                        {application?.user_id?.seeker?.nationality_id && <span className="text-sm text-gray-500 mt-1 ms-1">Nationality : {nationalties?.find((nationality: any) => nationality.id === application?.user_id?.seeker?.nationality_id)?.name}</span>}
                                        <div className="flex flex-row flex-wrap items-center mt-1 ms-1">
                                            <div className="flex flex-row items-center ">
                                                <span className="text-sm text-gray-500">
                                                    {application?.user_id?.education?.university && application?.user_id?.education?.university.charAt(0).toUpperCase() + application?.user_id?.education?.university.slice(1)}
                                                    <span className="mx-1">-</span>
                                                    {application?.user_id?.education?.field_of_study && <span className="text-sm text-gray-500">{application?.user_id?.education?.field_of_study.charAt(0).toUpperCase() + application?.user_id?.education?.field_of_study.slice(1)}</span>}
                                                    <span className="mx-1">-</span>
                                                    <span className="text-sm text-gray-500" >{application?.user_id?.education?.enroll_year + " / " + application?.user_id?.education?.graduation_year}</span>
                                                    <span className="mx-1">-</span>
                                                    <span className="text-sm text-gray-500">{gradeLevels[application?.user_id?.education?.grade]?.name || ""}</span>
                                                </span>
                                            </div>
                                            <div className="flex flex-row items-center  ">
                                                <span className="text-sm text-gray-500">{application?.user_id?.experience[0]?.years_of_experience && application?.user_id?.experience[0]?.years_of_experience == 16 ? "15+" : application?.user_id?.experience[0]?.years_of_experience || 0}</span>
                                                <span className="text-sm text-gray-500 ms-1">Years Of Experience</span>
                                            </div>
                                        </div>
                                        {application?.user_id?.skills?.length > 0 && <span className="text-sm text-gray-500 block">Skills : {application?.user_id?.skills?.map((skill: any) => skill.name).join(", ")}</span>}
                                        <Link
                                            to={`/job_applications/details/${application.id}`}
                                            className="flex flex-row items-center justify-center gap-1 px-[6px] border border-[#0055D9] w-full h-[28px] rounded-[5px]  mt-4 hover:cursor-pointer"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path opacity="0.4" d="M13.5759 6.17379L13.0042 8.61212C12.5142 10.718 11.5459 11.5696 9.72586 11.3946C9.43419 11.3713 9.11919 11.3188 8.78086 11.2371L7.80086 11.0038C5.36836 10.4263 4.61586 9.22462 5.18753 6.78629L5.75919 4.34212C5.87586 3.84629 6.01586 3.41462 6.19086 3.05879C6.87336 1.64712 8.03419 1.26795 9.98253 1.72879L10.9567 1.95629C13.4009 2.52795 14.1475 3.73545 13.5759 6.17379Z" fill="#0055D9" />
                                                <path d="M9.72612 11.3944C9.36445 11.6394 8.90945 11.8436 8.35528 12.0244L7.43362 12.3278C5.11778 13.0744 3.89862 12.4503 3.14612 10.1344L2.39945 7.83026C1.65278 5.51443 2.27112 4.28943 4.58695 3.54276L5.50862 3.23943C5.74778 3.16359 5.97528 3.09943 6.19112 3.05859C6.01612 3.41443 5.87612 3.84609 5.75945 4.34193L5.18778 6.78609C4.61612 9.22443 5.36862 10.4261 7.80112 11.0036L8.78112 11.2369C9.11945 11.3186 9.43445 11.3711 9.72612 11.3944Z" fill="#0055D9" />
                                                <path d="M11.1432 6.21518C11.1082 6.21518 11.0732 6.20934 11.0324 6.20351L8.20322 5.48601C7.96989 5.42768 7.82989 5.18851 7.88822 4.95518C7.94656 4.72184 8.18572 4.58184 8.41906 4.64018L11.2482 5.35768C11.4816 5.41601 11.6216 5.65518 11.5632 5.88851C11.5166 6.08101 11.3357 6.21518 11.1432 6.21518Z" fill="#0055D9" />
                                                <path d="M9.43538 8.18716C9.40038 8.18716 9.36538 8.18132 9.32455 8.17549L7.62705 7.74382C7.39372 7.68549 7.25372 7.44632 7.31205 7.21299C7.37038 6.97966 7.60955 6.83966 7.84288 6.89799L9.54038 7.32965C9.77372 7.38799 9.91372 7.62715 9.85538 7.86049C9.80872 8.05882 9.63372 8.18716 9.43538 8.18716Z" fill="#0055D9" />
                                            </svg>
                                            <span className="text-[#0055D9] text-[10px] md:text-[13px] font-semibold">View Application</span>
                                        </Link>
                                        <span className={`mt-2 flex items-center justify-center h-[28px] ${application?.status === 'consider' ? 'bg-[#FFD600] text-[#000000]' : application?.status === 'not_selected' ? 'bg-[#FF0000] text-[#fff]' : 'bg-green-500 text-[#fff]'} rounded-[6px]  text-[10px] md:text-[13px] font-semibold px-4}`}>
                                            {application?.status === 'consider' ? 'In Consideration' : application?.status === 'not_selected' ? 'Not Selected' : 'Accepted'}
                                        </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
