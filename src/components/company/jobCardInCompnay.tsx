import { Link } from "react-router";

export default function JobCardInCompnay() {
    return (
        <div className="w-full relative bg-white rounded-lg shadow-md px-[24px] py-[17px] flex items-start">
            <div className="flex-grow">
                <Link to='/job/1' className="text-xl font-bold text-main">
                    UI UX Designer
                </Link>
                <p className="text-[#001433] flex flex-row items-center mt-1 mb-2">
                    <span className='text-[11px] text-[#4D6182] text-semibold'>- Cairo, Egypt</span>
                </p>
                <div className='flex flex-row'>
                    <span className=" text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Full Time
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        On-site
                    </span>
                </div>
                <p className="text-[#4D6182] font-[400] text-[12px] mt-2 max-w-[634px]">
                    Experienced (Non-Manager) · 3-6 Yrs of Exp · 2 Vacancies · Females Preferred · UI · UX · UX Design · UI Design · UI/UX · Design · English · Figma · Graphic Design · Wireframes · <span className="text-[#2C9266]">4 days ago</span>
                </p>
            </div>
            <div className="ml-4 flex-shrink-0 flex flex-row items-center gap-1">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.71647 3.87549C5.7998 3.87549 5.0498 4.62549 5.0498 5.54215V17.2088L10.8831 14.7088L16.7165 17.2088V5.54215C16.7165 4.62549 15.9665 3.87549 15.0498 3.87549H6.71647Z" fill="#0055D9" />
                </svg>
                <span className='text-[14px] font-[600] text-[#0055D9]'>Saved</span>
            </div>

        </div>
    );
};

