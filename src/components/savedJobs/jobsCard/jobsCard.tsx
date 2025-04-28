import { Link } from "react-router";

export default function JobsCard({ isDone, isAccepted }: { isDone?: boolean, isAccepted?: boolean }) {
    return (
        <div className="max-w-[98%] mx-auto relative bg-white rounded-lg shadow-md p-4 flex items-start">
            <div className="flex-grow">
                <h2 className="text-xl font-bold flex flex-row flex-wrap text-blue-600">
                    <Link to={`/job/1`}>UI UX Designer</Link>
                    <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Full Time
                    </span>
                    <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        On-site
                    </span>
                </h2>
                <p className="text-[#001433] flex flex-row items-center mt-1">
                    <Link to={`company/2`} className='font-semibold text-[12px]'>CapsCode EG</Link>
                    <img src='/assets/icons/verified.svg' width={20} height={20} className='mb-1 mx-2' alt='Verified' />
                    <span className='text-[11px] text-[#4D6182] text-semibold'>- Cairo, Egypt</span>
                </p>
                <p className="text-[#4D6182] font-[400] text-[12px] mt-2 max-w-[634px]">
                    Experienced (Non-Manager) · 3-6 Yrs of Exp · 2 Vacancies · Females Preferred · UI · UX · UX Design · UI Design · UI/UX · Design · English · Figma · Graphic Design · Wireframes · <span className="text-[#2C9266]">4 days ago</span>
                </p>
                {!isDone && <button className="mt-4 px-4 py-2 bg-[#0055D9]/[14%] text-[#0055D9] rounded-[10px] font-[400] text-[12px] flex flex-row items-center gap-1.5">
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 14.0051L13.5309 15.8384C13.6535 15.9133 13.7956 15.9502 13.9393 15.9445C14.0829 15.9388 14.2216 15.8908 14.338 15.8064C14.4543 15.722 14.5431 15.6051 14.5932 15.4704C14.6432 15.3356 14.6523 15.1891 14.6192 15.0492L13.8159 11.6017L16.4967 9.27922C16.9859 8.85505 16.7234 8.05172 16.08 8.00088L12.5525 7.70088L11.1717 4.44338C10.9234 3.85172 10.0767 3.85172 9.82837 4.44338L8.44754 7.69338L4.92004 7.99338C4.27671 8.04505 4.01421 8.84838 4.50337 9.27172L7.18421 11.5942L6.38087 15.0417C6.34781 15.1816 6.35688 15.3281 6.40692 15.4629C6.45697 15.5976 6.54576 15.7145 6.66212 15.7989C6.77848 15.8833 6.91721 15.9313 7.06082 15.937C7.20444 15.9427 7.34653 15.9058 7.46921 15.8309L10.5 14.0051Z" fill="#0055D9" />
                    </svg>
                    You fit this role.
                </button>}
                {
                    isDone && <Link to='job/1/apply' className='text-main border-main border-[1px] text-[12px] font-[400]  w-[155px] mt-4 h-[32px] flex flex-col items-center justify-center rounded-[4px]'>
                        View your Application
                    </Link>
                }
            </div>
            <div className="ml-4 flex-shrink-0">
                <img
                    src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?q=80&w=1394&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Company Logo"
                    width={70}
                    height={70}
                    className="rounded-[10px] w-[70px] h-[70px]"
                />
            </div>
            <div className="flex absolute bottom-[10px] end-[14px] flex-row space-x-4">
                {
                    isDone && isAccepted && <span className='flex flex-row gap-2 items-center justify-center text-[#2C9266] text-[12px] font-[400] bg-[#2C9266]/[14%] px-2 py-1 w-[90px] h-[40px] rounded-[4px]'>
                        <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.40768 13.6912L15.648 6.45088C15.8189 6.28001 16.0182 6.19458 16.2461 6.19458C16.4739 6.19458 16.6732 6.28001 16.8441 6.45088C17.0149 6.62174 17.1004 6.82478 17.1004 7.06001C17.1004 7.29523 17.0149 7.49799 16.8441 7.66828L9.00571 15.528C8.83484 15.6989 8.6355 15.7843 8.40768 15.7843C8.17986 15.7843 7.98052 15.6989 7.80966 15.528L4.13609 11.8544C3.96522 11.6836 3.88321 11.4808 3.89004 11.2462C3.89688 11.0115 3.98601 10.8085 4.15744 10.637C4.32888 10.4656 4.53192 10.3802 4.76657 10.3807C5.00123 10.3813 5.20399 10.4667 5.37485 10.637L8.40768 13.6912Z" fill="#2C9266" />
                        </svg>
                        Accepted
                    </span>
                }
                {
                    isDone && !isAccepted && <span className='flex flex-row gap-2 items-center justify-center text-[#E41216] text-[12px] font-[400] bg-[#E41216]/[14%] px-2 py-1 w-[90px] h-[40px] rounded-[4px]'>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.23242 5.48071L14.062 13.3103M6.23242 13.3103L14.062 5.48071" stroke="#E41216" stroke-width="1.9574" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        Rejected
                    </span>
                }
                <button type='button' title='Share' className='bg-[#0055D9] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 4.5C5.9 4.5 5 5.4 5 6.5V20.5L12 17.5L19 20.5V6.5C19 5.4 18.1 4.5 17 4.5H7Z" fill="white" />
                    </svg>
                </button>
                <button type='button' title='Share' className='bg-white border-[1px] border-[#4D6182] rounded-[5px] flex flex-col items-center w-[38px] h-[40px] justify-center'>
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.8 14.652V18.343L21 12.036L13.8 5.75V9.336C6.802 10.243 4.012 14.736 3 19.25C5.497 16.086 8.805 14.652 13.8 14.652Z" fill="#4D6182" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

