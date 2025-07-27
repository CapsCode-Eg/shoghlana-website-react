import { useEffect, useState } from 'react'
import { HttpMethod, useApi } from '../../utils/hooks/useApi'
import ProfileHeroSection from '../../components/profile/heroSection/profileHeroSection'
import axiosInstance from '../../utils/axiosInstance'
import { Link } from 'react-router'
import JobsCard from '../../components/savedJobs/jobsCard/jobsCard'
import { toast } from 'sonner'
import MainLayout from '../../layout/mainLayout'
import Logo from '../../components/logo/logo'
import { Search } from 'lucide-react'
import Pagination from '../../components/common/pagination/pagination'

export default function CompanyProfile() {
    const [data, setData] = useState<any>({})

    const { fetchData, payLoad } = useApi({
        endPoint: 'company/profile',
        method: HttpMethod.GET,
        withOutToast: true
    })

    const [countries, setCountries] = useState([])
    const [cities, setCities] = useState([])
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
    }, [])
    useEffect(() => {
        if (data?.company_info) {
            axiosInstance.get(`/get-cities-by-country-id/${data?.company_info?.country}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.company_info])
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (payLoad?.data) {
            setData(payLoad?.data?.data)
        }
    }, [payLoad])
    const [jobs, setJobs] = useState<any>([])
    useEffect(() => {
        axiosInstance.get('/company/jobs-pagination').then((res) => {
            setJobs(res.data.data)
        })
    }, [])

    const handleDelete = (id: number) => {
        axiosInstance.delete(`/company/jobs-pagination/${id}`).then(() => {
            toast.success('Job deleted successfully');
            axiosInstance.get('/jobs').then((res) => {
                setJobs(res.data.data)
            })
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
            return console.error(err)
        })
    }

    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState<any>([])
    const [page, setPage] = useState(1)
    const [meta, setMeta] = useState<any>({})
    const handleSearch = () => {
        if (search !== '') {
            axiosInstance.get(`/users-search/10?search=${search}&page=${page}`).then((res) => {
                setSearchResult(res.data.data?.data)
                setMeta(res?.data?.data?.links['total-page']);
            })
        } else {
            setSearchResult([])
            setSearch('')
        }
    }
    console.log(searchResult)
    return (
        <MainLayout>
            <ProfileHeroSection cities={cities} countries={countries} isCompany={true} userData={data} />
            <div className='flex flex-col-reverse lg:flex-row w-[98%] xl:w-[80%] gap-[1%] mx-auto'>
                <div className='flex flex-col w-[100%] lg:w-[79%]'>
                    <div className='w-full mt-[24px] rounded-[10px] border border-black/20 h-[72px] flex items-center justify-between px-10'>
                        <span className='font-bold text-black text-[20px]'><span className='text-[24px] text-main'>Hey, </span>{payLoad?.data?.data?.name}</span>
                        <Link to='/post_job' className='px-3 py-1.5 bg-main rounded-[5px] flex items-center justify-center h-[40px] text-white '>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.3308 13.8574H13.3308V18.8574C13.3308 19.1226 13.2255 19.377 13.0379 19.5645C12.8504 19.7521 12.596 19.8574 12.3308 19.8574C12.0656 19.8574 11.8112 19.7521 11.6237 19.5645C11.4362 19.377 11.3308 19.1226 11.3308 18.8574V13.8574H6.33081C6.06559 13.8574 5.81124 13.7521 5.6237 13.5645C5.43617 13.377 5.33081 13.1226 5.33081 12.8574C5.33081 12.5922 5.43617 12.3379 5.6237 12.1503C5.81124 11.9628 6.06559 11.8574 6.33081 11.8574H11.3308V6.85742C11.3308 6.59221 11.4362 6.33785 11.6237 6.15031C11.8112 5.96278 12.0656 5.85742 12.3308 5.85742C12.596 5.85742 12.8504 5.96278 13.0379 6.15031C13.2255 6.33785 13.3308 6.59221 13.3308 6.85742V11.8574H18.3308C18.596 11.8574 18.8504 11.9628 19.0379 12.1503C19.2255 12.3379 19.3308 12.5922 19.3308 12.8574C19.3308 13.1226 19.2255 13.377 19.0379 13.5645C18.8504 13.7521 18.596 13.8574 18.3308 13.8574Z" fill="white" />
                            </svg>
                            <span className='text-white text-[15px]'>Post Job Now</span>
                        </Link>
                    </div>
                    <div className='flex flex-col mt-[24px] bg-white rounded-[10px] rounded-b-xl shadow-md overflow-hidden border-[1px] border-black/20 py-[26.22px] px-[33.11px]'>
                        <span className='text-[#001433] text-[20px] font-semibold'>ِAbout Company</span>
                        <div dangerouslySetInnerHTML={{ __html: data?.company_info?.about }} />
                    </div>
                    <div className='flex flex-col mt-[24px] bg-white rounded-[10px] rounded-b-xl shadow-md overflow-hidden border-[1px] border-black/20 py-[26.22px] px-[33.11px]'>
                        <span className='text-[#001433] text-[20px] font-semibold'>Jobs</span>
                        <div className='gap-4 mt-[20px] xl:mt-[24px] flex flex-col'>
                            {

                                jobs?.data?.length > 0 && jobs?.data?.slice(0, 3)?.map((job, index) => {
                                    return (
                                        <JobsCard key={index} job={job} handleDelete={handleDelete} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='border border-black/20 rounded-[16px] flex flex-col py-[24px] h-[350px] px-[28px] my-5'>
                        <span>Invite Users Now</span>
                        <div className='relative mt-3'>
                            <input type="text" className='w-full bg-transparent text-[#001433] text-[16px] font-semibold border-b-[1px] border-black/20 outline-none' placeholder='Search For Users by Job Category' value={search} onChange={(e) => setSearch(e.target.value)} />
                            <Search onClick={() => handleSearch()} className='absolute top-[3px] hover:cursor-pointer right-0 w-[15px] h-[15px] bg-white' />
                        </div>
                        {searchResult?.length > 0 ? <div className='flex flex-col gap-2 max-h-full h-full overflow-y-auto'>
                            {
                                searchResult?.map((user: any, index: number) => {
                                    return (
                                        <div key={index} className='flex flex-row items-center justify-between border-b-[1px] border-black/10'>
                                            <div className='flex flex-row items-center gap-2 py-2'>
                                                {
                                                    user?.image ?
                                                        <img src={user?.image} alt="Profile Image" className='w-[50px] md:w-[70px] h-[50px] md:h-[70px] rounded-full object-cover' />
                                                        : <Logo isDisabled />
                                                }
                                                <div className='flex flex-col gap-2 ms-2'>
                                                    <span className='text-[#001433] text-[16px] font-semibold'>{user?.first_name} {user?.last_name}</span>
                                                    <span className='text-[#001433]/50 -mt-2 text-[12px] font-semibold'>{user?.email}</span>
                                                </div>
                                            </div>
                                            <Link to={`/user/${user?.id}`} target='_blank' className='me-2 text-main font-bold text-[16px] underline hover:cursor-pointer'>
                                                View Profile
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                            <Pagination currentPage={page} totalPages={meta} onPageChange={(page: number) => setPage(page)} />

                        </div> :
                            <div className='flex items-center justify-center mt-3 h-full'>
                                No Users Yet
                            </div>
                        }
                    </div>
                </div>
                <div className='flex flex-col w-[100%] lg:w-[20%] mt-[20px] xl:mt-[24px] gap-4'>
                    <div className='border border-black/20 rounded-[16px] flex flex-col items-center justify-center h-[350px] px-[28px]'>
                        {data?.image ?
                            <img src={payLoad?.data?.data?.image} alt="Profile Image" className='w-[100px] h-[100px] rounded-full object-cover' />
                            : <Logo isDisabled />
                        }
                        <span className='font-semibold text-[20px] xl:text-[26px] text-main text-center mb-2'>{payLoad?.data?.data?.name}</span>
                        <div className='flex flex-row flex-wrap items-center justify-center gap-3 mt-2'>
                            {payLoad?.data?.data?.social_media?.length > 0 ?
                                payLoad?.data?.data?.social_media?.map((item: any, index: number) => {
                                    return (
                                        <Link key={index} to={item?.url} target="_blank" className='flex flex-row items-center justify-center gap-3'>
                                            {
                                                checkLinkIcon(item?.platform)
                                            }
                                        </Link>
                                    )
                                }) :
                                <span className='text-[#001433] text-[20px] font-semibold'>No Social Media</span>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export function checkLinkIcon(platform: 'linkedin' | 'facebook' | 'snapchat' | 'youtube' | 'instagram' | 'website') {
    if (platform === 'linkedin') {
        return <img src='/assets/icons/linked.svg' alt='facebook' className='w-[20px] h-[20px]' />
    } else if (platform === 'facebook') {
        return <img src='/assets/icons/facebook.svg' alt='facebook' className='w-[20px] h-[20px]' />
    } else if (platform === 'instagram') {
        return <img src='/assets/icons/insta.svg' alt='facebook' className='w-[20px] h-[20px]' />
    } else if (platform === 'youtube') {
        return <img src='/assets/icons/youtube.svg' alt='facebook' className='w-[20px] h-[20px]' />
    } else if (platform === 'snapchat') {
        return <img src='/assets/icons/snapchat.svg' alt='facebook' className='w-[20px] h-[20px]' />
    } else if (platform === 'website') {
        return <img src='/assets/icons/website.svg' alt='facebook' className='w-[20px] h-[20px]' />
    }
}