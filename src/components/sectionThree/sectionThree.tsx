import { Link } from 'react-router';
import Background from '../background/background';


const jobData = [
    {
        category: "Marketing and Sales Jobs",
        total: 983,
        jobs: [
            { title: "UI/UX Designer", count: 335 },
            { title: "Inside Sales Jobs", count: 209 },
            { title: "Online Marketing/Social Media Jobs", count: 89 },
            { title: "Telemarketing and Sales Jobs", count: 73 },
            { title: "Executive Marketing and Sales Jobs", count: 48 },
        ],
    },
    {
        category: "Tourism and Hospitality Jobs",
        total: 150,
        jobs: [
            { title: "Cooking Jobs", count: 60 },
            { title: "Food and Beverage Service Jobs", count: 51 },
            { title: "Hospitality and Reception Jobs", count: 15 },
            { title: "Cleaning and Internet Supervision Jobs", count: 12 },
            { title: "Reservation Jobs", count: 8 },
        ],
    },
    {
        category: "Craft Jobs",
        total: 170,
        jobs: [
            { title: "Electrical Jobs", count: 73 },
            { title: "Refrigeration and Air Conditioning Jobs", count: 28 },
            { title: "Welding Jobs", count: 12 },
            { title: "Carpentry Jobs", count: 10 },
            { title: "Blacksmithing and Moulding Jobs", count: 8 },
        ],
    },
];

export default function SectionThree() {
    return (
        <div className='pt-[48px] px-4 sm:px-[48px] flex flex-col'>
            <div className='flex flex-col gap-3 mb-10'>
                <span className='font-medium text-[31px] text-[#010101]'>Job vacancies today in Egypt</span>
                <span className='font-[400] text-[#737373] text-[20px]'>Job vacancies for all specialties in Egypt</span>
            </div>
            <div className="grid md:grid-cols-3 gap-16">
                {jobData.map((category, index) => (
                    <div key={index}>
                        <h3 className="text-[18px] font-bold mb-8 text-[#34495E] flex justify-between">
                            {category.category} <span className="text-[#34495E]">{category.total}</span>
                        </h3>
                        <ul className="mt-3 space-y-4">
                            {category.jobs.map((job, idx) => (
                                <li key={idx} className="flex justify-between text-gray-700">
                                    <a href="#" className="text-main hover:underline">{job.title}</a>
                                    <span className="text-gray-500">{job.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="text-center h-[270px] flex flex-col pt-[100px] mb-[100px] items-center justify-center bg-gradient-to-t from-white bg-white/80 -mt-[70px] relative z-10">
                <Link to='/explore' className="text-[48px] relative z-[10000]  font-bold text-main">View More</Link>
                <Background blueOnly linesOnly />
            </div>
        </div>
    )
}
