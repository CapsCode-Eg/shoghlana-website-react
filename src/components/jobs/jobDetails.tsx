import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { LEVELS } from "../../utils/constant/job"

export default function JobDetails({ data }: { data?: any }) {
    const [jobCategory, setJobCategory] = useState([])
    useEffect(() => {
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])
    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-[16px] text-[#4D6182] font-bold mb-4">Job Details</h2>
            <div className="space-y-2">
                <div className='flex flex-row gap-4'>
                    <span className='w-[142px] text-nowrap font-[400] text-[16px] text-[#4D6182]'>Experience Needed:</span>
                    <span className='flex flex-row items-center gap-2 '>
                        <img src="/assets/icons/youHaveThisSkill.svg" alt="" className='mb-1' />
                        {data?.min_year} - {data?.max_year} Years</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <span className='w-[142px] text-nowrap font-[400] text-[16px] text-[#4D6182]'>Career Level:</span>
                    <span className='flex flex-row items-center gap-2 '>
                        <img src="/assets/icons/youHaveThisSkill.svg" alt="" className='mb-1' />
                        {LEVELS.find((item: any) => item.id == data?.level)?.name || 'Loading'}</span>
                </div>
                {/* <div className='flex flex-row gap-4'>
                    <span className='w-[142px] text-nowrap font-[400] text-[16px] text-[#4D6182]'>Education Level:</span>
                    <span className='flex flex-row items-center gap-2 '>
                        Not Specified</span>
                </div> */}
                <div className='flex flex-row gap-4'>
                    <span className='w-[142px] text-nowrap font-[400] text-[16px] text-[#4D6182]'>Salary:</span>
                    <span className='flex flex-row items-center gap-2 '>
                        {data?.min_salary} - {data?.max_salary}</span>
                </div>
                <div className='flex flex-row gap-4'>
                    <span className='w-[142px] text-nowrap font-[400] text-[16px] text-[#4D6182]'>Job Categories:</span>
                    <div className="flex flex-wrap gap-2">
                        <span className='flex flex-row items-center gap-2 '>
                            <img src="/assets/icons/youHaveThisSkill.svg" alt="" className='mb-0.5' />
                            {/* @ts-expect-error Type mismatch */}
                            {jobCategory?.find((item: any) => item.id === data?.job_category_id)?.name || 'Loading'}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="font-semibold text-[#4D6182] mb-2">Skills And Tools:</h3>
                <div className="flex flex-wrap gap-2 max-w-[98%] xl:max-w-[50%]">
                    {
                        data?.skills?.length > 0 ? data?.skills?.map((skill: any, index: number) => (
                            <span key={index} className="bg-gray-200 text-gray-800 flex flex-row gap-1 px-2 py-1 rounded-full">
                                <img src="/assets/icons/youHaveThisSkill.svg" alt="" className='mb-0.5' />
                                {skill.name}
                            </span>
                        )) : <span className="text-gray-500">No skills specified</span>
                    }
                </div>
            </div>
        </div>
    );
};

