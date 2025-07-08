import { useEffect, useState } from 'react';
import JobsCard from '../savedJobs/jobsCard/jobsCard';
import axiosInstance from '../../utils/axiosInstance';

export default function TabsForJobs() {
    // const [activeTab, setActiveTab] = useState('Recommended');

    // const tabs = ['Recommended', 'Outside Egypt'];
    const [data, setData] = useState<any>({})
    useEffect(() => {
        axiosInstance.get('/jobs').then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.error(err);
        })
    }, [])
    return (
        <div className="w-full bg-white flex-1 rounded-lg shadow-md p-4">
            {/* <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div> */}
            <div className=' mx-auto gap-4 mt-[20px] xl:mt-[54px] flex flex-col'>
                {
                    data?.data?.length > 0 && data?.data?.map((job, index) => {
                        return (
                            <JobsCard key={index} job={job} />
                        )
                    })
                }
            </div>
        </div>
    );
};
