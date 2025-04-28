import { Link } from "react-router";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import JobDetails from "../../../components/jobs/jobDetails";
import JobRequirements from "../../../components/jobs/jobRequirements";
import Footer from "../../../components/footer/footer";

export default function ViewJob() {
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Icon"
                        className='object-cover'
                    />
                </div>
                <div className="p-6 rounded-xl bg-white -mt-10 relative z-[10]">
                    <div className="flex items-center">
                        <img
                            src="https://images.unsplash.com/photo-1496200186974-4293800e2c20?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-[10px] w-[80px] h-[80px] object-cover absolute end-[10px] top-[25px] mr-4"
                        />
                        <div className='flex flex-row items-center gap-1'>
                            <h2 className="text-[25.73px] text-[#001433] font-bold">CapsCode</h2>
                        </div>
                    </div>
                    <div className='flex flex-row -ms-2.5 mt-1.5'>
                        <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Full Time
                        </span>
                        <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            On-site
                        </span>
                    </div>
                    <p className="text-main flex flex-row items-center mt-2">
                        <Link to={`/company/2`} className='font-[700] text-[14px]'>CapsCode EG</Link>
                        <img src='/assets/icons/verified.svg' width={20} height={20} className='mb-1 mx-2' alt='Verified' />
                        <span className='text-[14px] text-[#4D6182] font-[600]'>- Cairo, Egypt</span>
                    </p>
                    <span className='mt-4 text-[13px] font-[400] text-[#4D6182]'>Posted 4 days ago</span>
                    <div className="flex flex-col-reverse md:flex-row gap-4 md:justify-between flex-wrap justify-center items-center mt-[31px]">
                        <div className='flex flex-col-reverse md:flex-row gap-5 justify-start items-start md:items-center'>
                            <Link to={`2/apply`} className="bg-main rounded-[5px] h-[40px] w-full md:w-[160px] lg:w-[200px] text-[15px] font-[400] text-white flex flex-col items-center justify-center">
                                Apply For Job
                            </Link>
                            <div className=" items-center md:flex hidden ms-0 xl:ms-[30px]">
                                <span className="font-[600] text-[22px] xl:text-[28px] text-[#4D6182]">20</span>
                                <span className="font-[600] text-[13px] ms-1 xl:ms-2 text-[#4D6182]">Applicants for</span>
                            </div>
                            <div className='flex flex-row ms-4 md:ms-0 xl:ms-10 divide-x-[1px] divide-black/40'>
                                <div className="flex flex-col items-center pe-4 px-0 lg:pe-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">3</span>
                                    <span className="font-[400] text-[13px] text-[#4D6182]">Viewed</span>
                                </div>
                                <div className="flex flex-col items-center px-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">0</span>
                                    <span className="font-[400] text-[13px] text-nowrap text-[#4D6182]">In Consideration</span>
                                </div>
                                <div className="flex flex-col items-center ps-4 px-0 lg:ps-4 lg:px-6">
                                    <span className="font-[600] text-[16px] text-[#4D6182]">0</span>
                                    <span className="font-[400] text-[13px] text-nowrap text-[#4D6182]">Not Selected</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row space-x-4">
                            <div className="flex md:hidden items-center ms-0 md:ms-[30px]">
                                <span className="font-[600] text-[28px] text-[#4D6182]">20</span>
                                <span className="font-[600] text-[13px] ms-2 text-[#4D6182]">Applicants for</span>
                            </div>
                            <button type='button' title='Share' className='bg-[#0055D9] rounded-[5px] hidden md:flex flex-col items-center w-[38px] h-[40px] justify-center'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 4.5C5.9 4.5 5 5.4 5 6.5V20.5L12 17.5L19 20.5V6.5C19 5.4 18.1 4.5 17 4.5H7Z" fill="white" />
                                </svg>
                            </button>
                            <button type='button' title='Share' className='bg-white border-[1px] border-[#4D6182] rounded-[5px] hidden md:flex flex-col items-center w-[38px] h-[40px] justify-center'>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.8 14.652V18.343L21 12.036L13.8 5.75V9.336C6.802 10.243 4.012 14.736 3 19.25C5.497 16.086 8.805 14.652 13.8 14.652Z" fill="#4D6182" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div className='w-[98%] xl:w-[80%] mx-auto mt-[20px] lg:mt-[36px]'>
                <JobDetails />
            </div>
            <div className='w-[98%] xl:w-[80%] mx-auto my-[20px] lg:my-[36px]'>
                <JobRequirements />
            </div>
            <Footer />

        </div>
    )
}
