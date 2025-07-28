
import { Link } from "react-router";
import { company_size, educationLevels } from "../../../utils/constant/profile";
import { Mail } from "lucide-react";
import { checkLinkIcon } from "../../../pages/company_profile/page";

export default function ProfileHeroSection({ userData, isCompany, cities, countries, handleInvite }: { cities?: any, countries?: any, isCompany?: boolean, userData?: any, handleInvite?: any }) {
    return (
        <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
            <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
            </div>
            <div className="p-6 md:pb-0  pb-16 rounded-xl min-h-[200px] bg-white -mt-10 relative z-[10]">
                <div className="flex items-center">
                    {userData?.image && <img
                        src={userData?.image ? (userData?.image || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww") : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww"}
                        alt="image Profile"
                        width={80}
                        height={80}
                        className="rounded-[10px] w-[80px] h-[80px] object-cover absolute end-[10px] top-[25px] mr-4 hidden md:block"
                    />}
                    <div className='flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-2'>
                        {isCompany ?
                            <span className={`text-[25.73px] ${isCompany ? "text-[#001433]" : "text-[#0055D9]"} font-bold flex flex-row items-center`}>{userData?.name || "Loading"}
                                {isCompany ? <span className="text-black font-[400] text-[13px]  mt-0 ms-1">
                                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M14.686 6.50306L14.904 4.40706L12.979 3.55006C12.9162 3.52212 12.8659 3.47188 12.838 3.40906L11.981 1.48306L9.885 1.70306C9.81679 1.70981 9.74848 1.69131 9.693 1.65106L7.987 0.414062L6.28 1.65106C6.22465 1.69072 6.15675 1.70885 6.089 1.70206L3.992 1.48406L3.136 3.41006C3.10801 3.47262 3.05775 3.52252 2.995 3.55006L1.069 4.40806L1.289 6.50406C1.29569 6.57195 1.27718 6.63993 1.237 6.69506L0 8.40106L1.237 10.1071C1.277 10.1631 1.295 10.2311 1.288 10.2991L1.069 12.3951L2.995 13.2521C3.05727 13.28 3.1071 13.3298 3.135 13.3921L3.992 15.3181L6.089 15.0991L6.116 15.0981C6.175 15.0981 6.232 15.1161 6.279 15.1511L7.987 16.3881L9.693 15.1511C9.74835 15.1106 9.81677 15.092 9.885 15.0991L11.981 15.3191L12.838 13.3931C12.8656 13.3304 12.9155 13.2801 12.978 13.2521L14.904 12.3951L14.686 10.2991C14.6787 10.231 14.6968 10.1626 14.737 10.1071L15.974 8.40106L14.737 6.69406C14.6971 6.63884 14.6789 6.57084 14.686 6.50306Z" fill="#0065FF" />
                                        <path d="M11.8514 5.88003C11.8715 5.91147 11.8845 5.94698 11.8894 5.98403C11.8847 6.02142 11.8717 6.0573 11.8514 6.08903L7.19635 11.644C7.12135 11.714 7.06635 11.748 7.02835 11.748C6.96535 11.748 6.90335 11.719 6.84135 11.662L4.20535 9.30003L4.14935 9.24803C4.12895 9.21698 4.11563 9.18181 4.11035 9.14503C4.11035 9.13403 4.12335 9.10503 4.14835 9.05803L4.18535 9.02403C4.53435 8.67603 4.80835 8.41003 5.00835 8.22503C5.08235 8.15503 5.13235 8.12103 5.15835 8.12103C5.20735 8.12103 5.26935 8.15603 5.34435 8.22503L6.84035 9.57903L10.5804 5.11603C10.6044 5.09303 10.6414 5.08203 10.6914 5.08203C10.7372 5.08344 10.7822 5.0947 10.8234 5.11503L11.8514 5.87903V5.88003Z" fill="white" />
                                    </svg>
                                </span> : <p className="text-black font-[400] text-[13px] mt-0 md:mt-2">
                                    {""}
                                </p>}
                            </span>
                            :
                            userData?.first_name && <h2 className={`text-[25.73px] ${isCompany ? "text-[#001433]" : "text-[#0055D9]"} font-bold`}>{userData?.first_name?.charAt(0)?.toUpperCase() + userData?.first_name.slice(1) + " " + userData?.last_name || "Loading"}
                            </h2>
                        }

                    </div>
                </div>
                {
                    isCompany ?
                        <div className='flex flex-col gap-1 -mt-1'>
                            {userData?.company_info?.country && <p className="text-[#4D6182] text-[13px] font-[400] mt-1">{`${cities?.find((city: any) => city.id === userData?.company_info?.city)?.name || ''}` || ''}, {`${countries?.find((country: any) => country.id === userData?.company_info?.country)?.name}`}</p>}
                            <span className='text-[#4D6182] text-[13px] font-[400]'>{company_size[userData?.company_info?.company_size] || ''}</span>
                            <span className='text-[#4D6182] text-[13px] font-[400]'>{userData?.company_info?.hiring_title || ''}</span>
                            <span className='text-[#4D6182] text-[13px] font-[400]'>{userData?.industries?.map((industry: any) => industry.name).join(', ')}</span>
                        </div> :
                        <>
                            <p className="mt-3 text-[#7A7A7A] text-[10px]">
                                <strong className='text-[#676565]'>{educationLevels.find((level: any) => level.id == userData?.education?.education_level)?.name}</strong> in {userData?.education?.field_of_study}
                                <br />
                                {userData?.education?.university} ({userData?.education?.graduation_year})
                            </p>
                            <p className="mt-3  text-[#7A7A7A] text-[10px] max-w-[372px]">
                                <strong className='text-[#676565]'>Skills and tools:</strong> {userData?.skills?.map((skill: any) => skill.name).join(', ')}
                            </p>
                        </>
                }
                <div className="mt-4 flex flex-row items-center absolute bottom-0 md:bottom-[-0px] xl:bottom-[-0px] end-1/2 translate-x-1/2 md:translate-x-0 md:end-[27px]">
                    <Link to={`mailto:${userData?.email}`} className="text-blue-600 flex flex-row items-center gap-2 hover:underline me-2">
                        <Mail />
                        <span>{userData?.email}</span>
                    </Link>
                    <div className='flex flex-row flex-wrap items-center justify-center gap-3 mt-2 me-2'>
                        {userData?.social_media?.length > 0 ?
                            userData?.data?.social_media?.map((item: any, index: number) => {
                                return (
                                    <Link key={index} to={item?.url} target="_blank" className='flex flex-row items-center justify-center gap-3'>
                                        {
                                            checkLinkIcon(item?.platform)
                                        }
                                    </Link>
                                )
                            }) :
                            null
                        }
                    </div>
                    {
                        (() => {
                            try {
                                const user = JSON.parse(localStorage.getItem('user') || '{}');
                                return user?.type === 'company' && handleInvite && (
                                    <div className="flex flex-row space-x-1 md:space-x-4">
                                        <button
                                            onClick={() => handleInvite()}
                                            type='button'
                                            title='Invite'
                                            className='bg-white border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'
                                        >
                                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.8 14.652V18.343L21 12.036L13.8 5.75V9.336C6.802 10.243 4.012 14.736 3 19.25C5.497 16.086 8.805 14.652 13.8 14.652Z" fill="#4D6182" />
                                            </svg>
                                        </button>
                                    </div>
                                );
                            } catch {
                                return null;
                            }
                        })()
                    }
                </div>
            </div>
        </div>
    );
};


