import { Link } from 'react-router';
import Background from '../background/background';

export default function SectionThree({ jobs }: { jobs: any }) {
    return (
        <div className='pt-[48px] px-4 sm:px-[48px] flex flex-col'>
            <div className='flex flex-col gap-3 mb-10'>
                <span className='font-medium text-[31px] text-[#010101]'>Job vacancies today in Egypt</span>
                <span className='font-[400] text-[#737373] text-[20px]'>Job vacancies for all specialties in Egypt</span>
            </div>
            <div className="w-full flex items-center justify-between">
                <ul className="mt-3 w-full space-y-4 grid grid-cols-1  md:grid-cols-3 justify-between">
                    {jobs?.map((job, idx) => (
                        <li key={idx} className="flex justify-between max-w-[90%] text-gray-700">
                            <a href="#" className="text-main hover:underline">{job.name}</a>
                            <span className="text-gray-500">{job.jobs_count}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-center h-[270px] flex flex-col pt-[100px] mb-[100px] items-center justify-center bg-gradient-to-b from-transparent via-white to-white -mt-[100px] relative z-10">
                <Link to='/explore' className="text-[48px] relative z-[10000]  font-bold text-main">View More</Link>
                <Background blueOnly linesOnly />
            </div>
        </div>
    )
}
