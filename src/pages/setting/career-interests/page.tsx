import { useEffect, useState } from "react";
import InputAndLabel from "../../../components/input/inputAndLabel";
import Layout from "../../../components/setting/layout";
import CustomSelectMultipleMenu from "../general-info/components/customeMultiSelectMenu";
import axiosInstance from "../../../utils/axiosInstance";
import { experienceLevels, jobTypes, workModes } from "../../../utils/constant/profile";
import CustomSelectMenu from "../../../components/customeSelectMenu/customSelectMenu";
import { toast } from "sonner";


export default function CareerInteresting() {
    const [data, setData] = useState<any>({})
    const [loading, setLoading] = useState(false)
    const [job_category, setJobCategory] = useState([])

    useEffect(() => {
        axiosInstance.get('/user-profile').then((res) => {
            setData({
                career_level: res.data?.data?.job_preference?.career_level,
                hide_salary: res.data?.data?.job_preference?.hide_salary,
                job_type: res.data?.data?.job_preference?.job_type,
                workplace: res.data?.data?.job_preference?.workplace,
                min_salary: res.data?.data?.job_preference?.min_salary,
                interested_job_category: res.data?.data?.job_preference?.interested_job_category
            })
        })
    }, [])


    const handleSubmit = () => {
        setLoading(true)
        axiosInstance.post(`/update-job_preference`, data).then(() => {
            toast.success('Updated Successfully')
            axiosInstance.get('/user-profile').then((res) => {
                setData({
                    career_level: res.data?.data?.job_preference?.career_level,
                    hide_salary: res.data?.data?.job_preference?.hide_salary,
                    job_type: res.data?.data?.job_preference?.job_type,
                    workplace: res.data?.data?.job_preference?.workplace,
                    min_salary: res.data?.data?.job_preference?.min_salary,
                    interested_job_category: res.data?.data?.job_preference?.interested_job_category
                })
            })
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
        }).finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])
    return (
        <Layout>
            <div className='w-full bg-white relative z-[2] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>

                <div className='flex flex-col w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s your current career level ?</span>
                    <CustomSelectMenu options={experienceLevels} defaultData={+(data?.career_level) || 0} onChange={(e: any) => setData((prev: any) => ({ ...prev, career_level: e.id }))} />
                </div>
                <div className="w-[calc(100%-50px)] mt-4">
                    <CustomSelectMenu defaultData={data?.interested_job_category} label="Career Interest" options={job_category} onChange={(e: any) => setData((prev: any) => ({ ...prev, interested_job_category: e.id }))} />
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What type(s) of job are you open to? <span className='text-[12px]'>(you can choose more than one more job type)</span></span>
                    <div className="mt-2 ">
                        <CustomSelectMultipleMenu options={jobTypes} defaultData={data?.job_type?.map((e: any) => +(e))} onChange={(e: any) => setData((prev: any) => ({ ...prev, job_type: e }))} />
                    </div>
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s your preferred workplace settings? <span className='text-[12px]'>(you can choose more than one Workplace setting)</span></span>
                    <div className="mt-2 ">
                        <CustomSelectMultipleMenu options={workModes} defaultData={data?.workplace?.map((e: any) => +(e))} onChange={(e: any) => setData((prev: any) => ({ ...prev, workplace: e }))} />
                    </div>
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s the minimum salary you would accept?<span className='text-[12px]'> Add a net  salary</span></span>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center w-[100%] sm:w-[70%] gap-4'>
                        <div className='w-[80%] sm:w-[50%] flex flex-row items-start sm:items-center'>
                            <InputAndLabel type="text" value={data?.min_salary} setData={setData} name="min_salary" />
                        </div>
                        <span>Egypt Pound (EGP / Month)</span>
                    </div>
                    <div className="flex flex-row items-center gap-2 mt-2">
                        <input id="hide_salary" type="checkbox" checked={data?.hide_salary} onChange={(e: any) => setData((prev: any) => ({ ...prev, hide_salary: e.target.checked ? 1 : 0 }))} />
                        <label htmlFor="hide_salary" className='text-[12px]'>Hide my salary</label>
                    </div>
                </div>
                <div className='flex flex-row items-center justify-end w-full mt-10'>
                    <button disabled={loading} onClick={handleSubmit} className='min-w-[150px] h-[45px] bg-main text-white flex flex-col items-center justify-center me-10 rounded-[14px]'>
                        {loading && <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2' />}
                        {!loading && 'Save'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}
