import JobsCard from '../savedJobs/jobsCard/jobsCard';

export default function TabsForJobs({ data }: any) {

    return (
        <div className="w-full bg-white flex-1 rounded-lg shadow-md p-4">
            <div className=' mx-auto gap-4 mt-[20px] xl:mt-[54px] flex flex-col'>
                {
                    data?.data?.length > 0 ? data?.data?.map((job, index) => {
                        return (
                            <JobsCard key={index} job={job} />
                        )
                    }) : <h1 className='text-[16px] text-[#4D6182] font-bold text-center'>No jobs found</h1>
                }
            </div>
        </div>
    );
};
