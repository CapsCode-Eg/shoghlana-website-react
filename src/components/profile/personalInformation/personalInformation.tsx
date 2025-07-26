import { Link } from "react-router";
import { educationLevels, jobTypes, personal_type, workModes } from "../../../utils/constant/profile";
import { useEffect, useState } from "react";

export default function PersonalInformation({ userData, deleteCV, countries, jobCategory, handleFileChange, handleUnlockCv }: { jobCategory: any, countries: any, userData: any, deleteCV?: () => void, handleFileChange?: any, handleUnlockCv?: any }) {
    function getAge(dateString: string): number {
        const birthDate = new Date(dateString);
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
            today.getMonth() > birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) {
            age--;
        }

        return age;
    }
    // console.log()
    const [newJobCategory, setNewJobCategory] = useState<any[]>([]);
    useEffect(() => {
        if (userData) {
            const jobCategories = userData?.experience?.map((exp: any) => exp?.job_category)
            setNewJobCategory(jobCategories);
        }
    }, [userData])
    const [data, setData] = useState<any>('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setData(localStorage.getItem('token') || JSON.parse(localStorage.getItem('token') || ''))
        }
    }, [])
    return (
        <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px]  flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md relative overflow-hidden py-[33px] px-[28.68px]">
            {/* Contact Info */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-[16px] text-[#001433] font-bold mb-5">Contact Info</h2>
                <div className="flex items-start md:items-center flex-col md:flex-row flex-wrap  md:space-x-[200px]">
                    <span className="text-[#001433] flex flex-row items-center gap-1"><svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.6536 18.33C22.6536 18.69 22.5736 19.06 22.4036 19.42C22.2336 19.78 22.0136 20.12 21.7236 20.44C21.2336 20.98 20.6936 21.37 20.0836 21.62C19.4836 21.87 18.8336 22 18.1336 22C17.1136 22 16.0236 21.76 14.8736 21.27C13.7236 20.78 12.5736 20.12 11.4336 19.29C10.2836 18.45 9.19359 17.52 8.15359 16.49C7.12359 15.45 6.19359 14.36 5.36359 13.22C4.54359 12.08 3.88359 10.94 3.40359 9.81C2.92359 8.67 2.68359 7.58 2.68359 6.54C2.68359 5.86 2.80359 5.21 3.04359 4.61C3.28359 4 3.66359 3.44 4.19359 2.94C4.83359 2.31 5.53359 2 6.27359 2C6.55359 2 6.83359 2.06 7.08359 2.18C7.34359 2.3 7.57359 2.48 7.75359 2.74L10.0736 6.01C10.2536 6.26 10.3836 6.49 10.4736 6.71C10.5636 6.92 10.6136 7.13 10.6136 7.32C10.6136 7.56 10.5436 7.8 10.4036 8.03C10.2736 8.26 10.0836 8.5 9.84359 8.74L9.08359 9.53C8.97359 9.64 8.92359 9.77 8.92359 9.93C8.92359 10.01 8.93359 10.08 8.95359 10.16C8.98359 10.24 9.01359 10.3 9.03359 10.36C9.21359 10.69 9.52359 11.12 9.96359 11.64C10.4136 12.16 10.8936 12.69 11.4136 13.22C11.9536 13.75 12.4736 14.24 13.0036 14.69C13.5236 15.13 13.9536 15.43 14.2936 15.61C14.3436 15.63 14.4036 15.66 14.4736 15.69C14.5536 15.72 14.6336 15.73 14.7236 15.73C14.8936 15.73 15.0236 15.67 15.1336 15.56L15.8936 14.81C16.1436 14.56 16.3836 14.37 16.6136 14.25C16.8436 14.11 17.0736 14.04 17.3236 14.04C17.5136 14.04 17.7136 14.08 17.9336 14.17C18.1536 14.26 18.3836 14.39 18.6336 14.56L21.9436 16.91C22.2036 17.09 22.3836 17.3 22.4936 17.55C22.5936 17.8 22.6536 18.05 22.6536 18.33Z" stroke="#171717" strokeWidth="1.5" strokeMiterlimit="10" />
                    </svg>
                        {userData?.mobile}</span>
                    <span className="text-[#001433] text-nowrap mt-2 md:mt-0 flex flex-row items-center gap-1">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.4736 20.6101H7.47363C4.47363 20.6101 2.47363 19.1101 2.47363 15.6101V8.61011C2.47363 5.11011 4.47363 3.61011 7.47363 3.61011H17.4736C20.4736 3.61011 22.4736 5.11011 22.4736 8.61011V15.6101C22.4736 19.1101 20.4736 20.6101 17.4736 20.6101Z" stroke="#171717" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M17.4736 9.11011L14.3436 11.6101C13.3136 12.4301 11.6236 12.4301 10.5936 11.6101L7.47363 9.11011" stroke="#171717" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        +{userData?.email}</span>
                </div>
            </div>
            {/* General Info */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-[16px] text-[#001433] font-bold mb-5">General Info</h2>
                <ul className="text-[#001433] space-y-2">
                    <li className="flex flex-row"><strong className="w-[146px]">Age:</strong> {getAge(userData?.seeker?.birth_day)} years</li>
                    <li className="flex flex-row"><strong className="min-w-[146px] ">Minimum Salary:</strong> {userData?.job_preference?.min_salary}</li>
                    {/* <li className="flex flex-row"><strong className="me-2 min-w-[146px]">Job Search Status:</strong> <span className="text-green-600">Actively searching</span></li> */}
                    <li className="flex flex-row"><strong className="w-[146px]">Nationality:</strong>{countries.find((country: any) => country.id == userData?.seeker?.country_id)?.name}</li>
                    <li className="flex flex-row"><strong className="w-[146px]">Education Level:</strong> {educationLevels.find((level: any) => level.id == userData?.education?.education_level)?.name}</li>
                    <li className="flex flex-row"><strong className="w-[146px]">Gender:</strong> {personal_type.find((item: any) => item.id === userData?.seeker?.gender)?.name}</li>
                </ul>
            </div>

            {/* Career Interests */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-4">Career Interests</h2>
                <ul className="text-[#001433] space-y-2">
                    {/* <li className="flex flex-col"><strong>Job Titles and Keywords:</strong> UI Designer · UI/UX Designer · UI Web Developer · UX Designer</li> */}
                    <li className="flex flex-col"><strong>Job Categories:</strong>{newJobCategory?.map((category: any) => jobCategory.find((item: any) => item.id == category)?.name).join(', ')}</li>
                    <li className="flex flex-col"><strong>Job Types:</strong>{userData?.job_preference?.job_type?.map((type: any) => jobTypes.find((item: any) => item.id == type)?.name).join(', ')}</li>
                    <li className="flex flex-col"><strong>Preferred Workplaces:</strong>{userData?.job_preference?.workplace?.map((type: any) => workModes.find((item: any) => item.id == type)?.name).join(', ')}</li>
                </ul>
            </div>
            {/* CV Section */}
            {userData?.seeker?.cv &&
                <div className="">
                    <h2 className="text-[16px] text-[#001433] font-bold mb-4">My CV:</h2>
                    <div className="flex relative items-center justify-between max-w-[400px] min-w-[300px] h-[70px] bg-gray-100 p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-3 rounded">PDF</span>
                            <div>
                                <p className="text-gray-800 font-medium">Cv</p>
                            </div>
                        </div>
                        {deleteCV && <span onClick={deleteCV} className="absolute top-2 right-2">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.61143 14.6967C3.86688 14.6967 0.823242 11.6531 0.823242 7.90855C0.823242 4.164 3.86688 1.12036 7.61143 1.12036C11.356 1.12036 14.3996 4.164 14.3996 7.90855C14.3996 11.6531 11.356 14.6967 7.61143 14.6967ZM7.61143 2.06755C4.39099 2.06755 1.77043 4.68811 1.77043 7.90855C1.77043 11.129 4.39099 13.7496 7.61143 13.7496C10.8319 13.7496 13.4524 11.129 13.4524 7.90855C13.4524 4.68811 10.8319 2.06755 7.61143 2.06755Z" fill="#292D32" />
                                <path d="M5.82455 10.1693C5.70458 10.1693 5.5846 10.1251 5.48988 10.0304C5.30676 9.84729 5.30676 9.54418 5.48988 9.36106L9.06394 5.787C9.24707 5.60388 9.55017 5.60388 9.73329 5.787C9.91641 5.97012 9.91641 6.27322 9.73329 6.45635L6.15923 10.0304C6.07082 10.1251 5.94453 10.1693 5.82455 10.1693Z" fill="#292D32" />
                                <path d="M9.39862 10.1693C9.27864 10.1693 9.15866 10.1251 9.06394 10.0304L5.48988 6.45635C5.30676 6.27322 5.30676 5.97012 5.48988 5.787C5.673 5.60388 5.9761 5.60388 6.15923 5.787L9.73329 9.36106C9.91641 9.54418 9.91641 9.84729 9.73329 10.0304C9.63857 10.1251 9.51859 10.1693 9.39862 10.1693Z" fill="#292D32" />
                            </svg>
                        </span>}
                        {data && <div className="flex space-x-4 text-blue-600 text-[10px] md:text-sm">
                            {data && handleUnlockCv ?
                                <button onClick={handleUnlockCv} className="hover:underline">Unlock CV</button>
                                : <Link to={userData?.seeker?.cv} target="_blank" className="hover:underline">Preview CV</Link>}
                            {data && handleFileChange &&
                                <>
                                    <div className="w-[1px] h-4 bg-gray-300" />
                                    <label htmlFor="cv" className="hover:underline">Update CV</label>
                                    <input accept="application/pdf" id="cv" type="file" onChange={handleFileChange} className="hidden" />
                                </>
                            }
                        </div>}
                    </div>
                </div>
            }
        </div>
    );
};

