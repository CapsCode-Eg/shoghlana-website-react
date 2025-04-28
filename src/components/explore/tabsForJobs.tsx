import { useState } from 'react';
import JobsCard from '../savedJobs/jobsCard/jobsCard';

export default function TabsForJobs() {
    const [activeTab, setActiveTab] = useState('Recommended');

    const tabs = ['Recommended', 'Outside Egypt'];

    const jobs = [
        {
            title: 'UI UX Designer',
            company: 'CapsCode EG',
            location: 'Cairo, Egypt',
            type: 'Full Time',
            mode: 'On-site',
            description: 'Experienced (Non-Manager) · 3-6 Yrs of Exp · 2 Vacancies · Females Preferred · UI · UX · UX Design · UI Design · UI/UX · Design · English · Figma · Graphic Design · Wireframes',
            daysAgo: '4 days ago',
        },
        {
            title: 'UI UX Designer',
            company: 'CapsCode EG',
            location: 'Cairo, Egypt',
            type: 'Full Time',
            mode: 'On-site',
            description: 'Experienced (Non-Manager) · 3-6 Yrs of Exp · 2 Vacancies · Females Preferred · UI · UX · UX Design · UI Design · UI/UX · Design · English · Figma · Graphic Design · Wireframes',
            daysAgo: '4 days ago',
        },
        {
            title: 'UI UX Designer',
            company: 'CapsCode EG',
            location: 'Cairo, Egypt',
            type: 'Full Time',
            mode: 'On-site',
            description: 'Experienced (Non-Manager) · 3-6 Yrs of Exp · 2 Vacancies · Females Preferred · UI · UX · UX Design · UI Design · UI/UX · Design · English · Figma · Graphic Design · Wireframes',
            daysAgo: '4 days ago',
        },
        // Add more job objects as needed
    ];

    return (
        <div className="w-full bg-white flex-1 rounded-lg shadow-md p-4">
            <div className="flex border-b mb-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`px-4 py-2 font-medium ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
            <div className='pb-5 space-y-4'>
                {jobs.map((_, index) => (
                    <JobsCard key={index} />
                ))}
            </div>
        </div>
    );
};
