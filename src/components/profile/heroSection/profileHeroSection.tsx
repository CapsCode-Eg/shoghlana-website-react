
import { Link } from "react-router";
import { company_size, educationLevels } from "../../../utils/constant/profile";
import { Mail } from "lucide-react";

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
                            <h2 className={`text-[25.73px] ${isCompany ? "text-[#001433]" : "text-[#0055D9]"} font-bold`}>{userData?.name || "Loading"}</h2>
                            :
                            userData?.first_name && <h2 className={`text-[25.73px] ${isCompany ? "text-[#001433]" : "text-[#0055D9]"} font-bold`}>{userData?.first_name?.charAt(0)?.toUpperCase() + userData?.first_name.slice(1) + " " + userData?.last_name || "Loading"}</h2>
                        }
                        {isCompany ? <p className="text-black font-[400] text-[13px] -ms-2 mt-0 md:mt-2"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M14.686 6.50306L14.904 4.40706L12.979 3.55006C12.9162 3.52212 12.8659 3.47188 12.838 3.40906L11.981 1.48306L9.885 1.70306C9.81679 1.70981 9.74848 1.69131 9.693 1.65106L7.987 0.414062L6.28 1.65106C6.22465 1.69072 6.15675 1.70885 6.089 1.70206L3.992 1.48406L3.136 3.41006C3.10801 3.47262 3.05775 3.52252 2.995 3.55006L1.069 4.40806L1.289 6.50406C1.29569 6.57195 1.27718 6.63993 1.237 6.69506L0 8.40106L1.237 10.1071C1.277 10.1631 1.295 10.2311 1.288 10.2991L1.069 12.3951L2.995 13.2521C3.05727 13.28 3.1071 13.3298 3.135 13.3921L3.992 15.3181L6.089 15.0991L6.116 15.0981C6.175 15.0981 6.232 15.1161 6.279 15.1511L7.987 16.3881L9.693 15.1511C9.74835 15.1106 9.81677 15.092 9.885 15.0991L11.981 15.3191L12.838 13.3931C12.8656 13.3304 12.9155 13.2801 12.978 13.2521L14.904 12.3951L14.686 10.2991C14.6787 10.231 14.6968 10.1626 14.737 10.1071L15.974 8.40106L14.737 6.69406C14.6971 6.63884 14.6789 6.57084 14.686 6.50306Z" fill="#0065FF" />
                            <path d="M11.8514 5.88003C11.8715 5.91147 11.8845 5.94698 11.8894 5.98403C11.8847 6.02142 11.8717 6.0573 11.8514 6.08903L7.19635 11.644C7.12135 11.714 7.06635 11.748 7.02835 11.748C6.96535 11.748 6.90335 11.719 6.84135 11.662L4.20535 9.30003L4.14935 9.24803C4.12895 9.21698 4.11563 9.18181 4.11035 9.14503C4.11035 9.13403 4.12335 9.10503 4.14835 9.05803L4.18535 9.02403C4.53435 8.67603 4.80835 8.41003 5.00835 8.22503C5.08235 8.15503 5.13235 8.12103 5.15835 8.12103C5.20735 8.12103 5.26935 8.15603 5.34435 8.22503L6.84035 9.57903L10.5804 5.11603C10.6044 5.09303 10.6414 5.08203 10.6914 5.08203C10.7372 5.08344 10.7822 5.0947 10.8234 5.11503L11.8514 5.87903V5.88003Z" fill="white" />
                        </svg>
                        </p> : <p className="text-black font-[400] text-[13px] mt-0 md:mt-2">
                            {""}
                        </p>}
                    </div>
                </div>
                {
                    isCompany ?
                        <div className='flex flex-col gap-1 -mt-1'>
                            <span className='text-[#4D6182] text-[14px] mt-1 font-[500] max-w-[400px] line-clamp-2'>{userData?.company_info?.about}</span>
                            {userData?.company_info?.country && <p className="text-[#4D6182] text-[13px] font-[400] mt-1">{`${cities?.find((city: any) => city.id === userData?.company_info?.city)?.name || ''}` || ''}, {`${countries?.find((country: any) => country.id === userData?.company_info?.country)?.name}`}</p>}
                            <span className='text-[#4D6182] text-[13px] font-[400]'>{company_size[userData?.company_info?.company_size] || ''}</span>
                            <span className='text-[#4D6182] text-[13px] font-[400]'>{userData?.company_info?.hiring_title || ''}</span>
                            <div className='flex flex-row divide-x-2 divide-[#4D6182]/20 space-x-2 -ms-2'>
                                {
                                    userData.industries?.map((industry: any, index: number) => (
                                        <span key={index} className='text-[#4D6182] text-[13px] ps-2 font-[400]'>{industry.name}</span>
                                    ))
                                }
                            </div>
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
                    <Link to={`mailto:${userData?.email}`} className="text-blue-600 flex flex-row items-center gap-2 hover:underline">
                        <Mail />
                        <span>{userData?.email}</span>
                    </Link>
                    <div className='w-[1px] bg-black h-[15px] mt-0.5 mx-2 md:mx-4' />
                    {/* Linked in */}
                    {!isCompany && <Link to='#' className='me-4'>
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.0607 20.4965H16.7741V14.8988C16.7741 13.3645 16.1913 12.5078 14.9769 12.5078C13.6554 12.5078 12.9657 13.3995 12.9657 14.8998V20.4965H9.79801V9.83395H12.9657V11.2704C12.9657 11.2704 13.9173 9.50809 16.1804 9.50809C18.4414 9.50809 20.0607 10.8895 20.0607 13.7463V20.4965ZM6.02059 8.43853C5.76309 8.43762 5.50829 8.38597 5.27075 8.28655C5.03322 8.18713 4.8176 8.04189 4.63622 7.85911C4.45483 7.67634 4.31124 7.45961 4.21364 7.22132C4.11604 6.98304 4.06635 6.72785 4.0674 6.47035C4.0674 5.38381 4.94103 4.50317 6.02059 4.50317C6.27795 4.50409 6.53262 4.55571 6.77003 4.65508C7.00745 4.75445 7.22295 4.89962 7.40425 5.0823C7.58554 5.26499 7.72906 5.4816 7.82661 5.71977C7.92416 5.95793 7.97382 6.21299 7.97277 6.47035C7.97396 6.72781 7.92439 6.98297 7.82689 7.22125C7.7294 7.45953 7.5859 7.67626 7.4046 7.85905C7.2233 8.04184 7.00774 8.1871 6.77027 8.28653C6.53279 8.38597 6.27804 8.43762 6.02059 8.43853ZM4.38527 20.4965H7.68589V9.83395H4.38527V20.4965Z" fill="#4D6182" />
                        </svg>
                    </Link>}
                    {JSON.parse(localStorage.getItem('user') || '')?.type === 'company' && <div className="flex flex-row space-x-1 md:space-x-4">
                        <button onClick={() => handleInvite()} type='button' title='Invite' className='bg-white border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.8 14.652V18.343L21 12.036L13.8 5.75V9.336C6.802 10.243 4.012 14.736 3 19.25C5.497 16.086 8.805 14.652 13.8 14.652Z" fill="#4D6182" />
                            </svg>
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    );
};


