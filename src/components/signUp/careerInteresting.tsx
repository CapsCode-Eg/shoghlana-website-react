import React, { useState } from 'react'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import CustomSelectMultipleMenu from '../multiSelectMenu/multiSelectMenu';
import InputAndLabel from '../input/inputAndLabel';
import { Link } from 'react-router';

export default function CareerInteresting({ handleBack }: { handleBack: () => void }) {

    const jobTypes = [
        "Full Time",
        "Part Time",
        "Freelance / Project",
        "Internship",
        "Shift Based",
        "Volunteering",
        "Student Activity",
    ];

    const workplaceSettings = ["On-Site", "Remote", "Hybrid"];

    const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([]);

    const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
        setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
    };

    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Career Interesting</span>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`s your current career level ?</span>
                <CustomSelectMenu shadow={true} options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} isGray />
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What type(s) of job are you open to? <span className='text-[12px]'>(you can choose more than one more job type)</span></span>
                <div className="mt-2 flex flex-wrap gap-2">
                    {jobTypes.map((job) => (
                        <button
                            key={job}
                            className={`px-3 py-1 border rounded-md ${selectedJobs.includes(job)
                                ? "bg-main text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => toggleSelection(job, selectedJobs, setSelectedJobs)}
                        >
                            {job}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`s your preferred workplace settings? <span className='text-[12px]'>(you can choose more than one Workplace setting)</span></span>
                <div className="mt-2 flex flex-wrap gap-2">
                    {workplaceSettings.map((setting) => (
                        <button
                            key={setting}
                            className={`px-3 py-1 border rounded-md ${selectedWorkplaces.includes(setting)
                                ? "bg-main text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            onClick={() => toggleSelection(setting, selectedWorkplaces, setSelectedWorkplaces)}
                        >
                            {setting}
                        </button>
                    ))}
                </div>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`re the job titles that describe what you`re looking for?<span className='text-[12px]'>(Add up to 10)</span></span>
                <CustomSelectMultipleMenu options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} />

            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What job categories are you interested in?<span className='text-[12px]'>Add 1 or more.</span></span>
                <CustomSelectMultipleMenu options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} />
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`s the minimum salary you would accept?<span className='text-[12px]'> Add a net  salary</span></span>
                <div className='flex flex-col sm:flex-row items-start sm:items-center w-[100%] sm:w-[70%] gap-4'>
                    <div className='w-[80%] sm:w-[50%] flex flex-row items-start sm:items-center'>
                        <InputAndLabel />
                    </div>
                    <span>Egypt Pound (EGP / Month)</span>
                </div>
            </div>
            <div className='flex flex-row mt-2 gap-2 items-center'>
                <input title='hide' type="checkbox" name="Hide This From Other Users" id="" />
                <span>Hide This From Other Users</span>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleBack} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <Link to={"/profile"} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</Link>
            </div>
        </div>
    )
}
