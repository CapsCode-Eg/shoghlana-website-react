import { useEffect, useState } from 'react'
import { HttpMethod, useApi } from '../../utils/hooks/useApi'
import NavbarTwo from '../../components/common/navbarTwo/navbarTwo'
import ProfileHeroSection from '../../components/profile/heroSection/profileHeroSection'
import axiosInstance from '../../utils/axiosInstance'
import { Link } from 'react-router'
import JobsCard from '../../components/savedJobs/jobsCard/jobsCard'
import { toast } from 'sonner'

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
            toast.error(err?.response?.data?.msg, { id: 'add-country' })
            return console.error(err)
        })
    }
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <ProfileHeroSection cities={cities} countries={countries} isCompany={true} userData={data} />
            <div className='flex flex-row w-[98%] xl:w-[80%] mx-auto overflow-x-auto mt-[20px] xl:mt-[24px] h-[54px] px-6 shadow-lg rounded-[16px] items-center gap-10 font-semibold text-main'>
                <Link to='/grantee' className='flex flex-row items-center gap-2 h-[32px] px-[12px] rounded-[8px] shadow-md text-nowrap'>Grantee</Link>
                <Link to='/old-grantees' className='flex flex-row items-center gap-2 h-[32px] px-[12px] rounded-[8px] shadow-md text-nowrap'>Your Grantees</Link>
                <Link to='/last-subscription' className='flex flex-row items-center gap-2 h-[32px] px-[12px] rounded-[8px] shadow-md text-nowrap'>Last Subscription</Link>
                <Link to='/invitations' className='flex flex-row items-center gap-2 h-[32px] px-[12px] rounded-[8px] shadow-md text-nowrap'>Your Invitations</Link>
                {/* <Link to='/invite' className='flex flex-row items-center gap-2 h-[32px] px-[12px] rounded-[8px] shadow-md text-nowrap'>Invite</Link> */}
            </div>
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[24px] pb-8 px-6 flex flex-col bg-main rounded-xl shadow-md">
                <div className="flex items-center space-x-3 mt-6">
                    <h2 className="text-xl font-semibold text-white">Ready to post a job?</h2>
                </div>
                <p className="text-slate-200 mt-2 ml-9">
                    You can now post a job with just a few simple steps. Let's help you find the right candidate!
                </p>
                <div className='flex flex-row items-end justify-end'>
                    <Link to='/post_job' className='px-3 py-1.5 bg-white rounded-[8px] text-main'>
                        Post Job Now
                    </Link>
                </div>
            </div>
            <div className='w-[98%] xl:w-[80%] mx-auto gap-4 mt-[20px] xl:mt-[54px] flex flex-col'>
                {

                    jobs?.data?.length > 0 && jobs?.data?.map((job, index) => {
                        return (
                            <JobsCard key={index} job={job} handleDelete={handleDelete} />
                        )
                    })
                }
            </div>
        </div>
    )
}
