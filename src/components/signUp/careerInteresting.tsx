import React from 'react'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import CustomSelectMultipleMenu from '../multiSelectMenu/multiSelectMenu';
import InputAndLabel from '../input/inputAndLabel';

export default function CareerInteresting({ handleBack, setData, handleSubmit, formData, errors, loading }: { loading: boolean, errors: any, formData: any, handleSubmit: () => void, setData: React.Dispatch<React.SetStateAction<any>>, handleBack: () => void }) {

    const experienceLevels = [
        { id: 0, name: "junior" },
        { id: 1, name: "mid_level" },
        { id: 2, name: "senior" }
    ];
    const jobTypes = [
        { id: 0, name: "Full-time" },
        { id: 1, name: "Part-time" },
        { id: 2, name: "Freelance" }
    ];
    const workModes = [
        { id: 0, name: "On-site" },
        { id: 1, name: "Remote" },
        { id: 2, name: "Hybrid" }
    ];

    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Career Interesting</span>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`s your current career level ?</span>
                <CustomSelectMenu error={errors?.career_level} defaultData={formData?.career_level} name='career_level' shadow={true} options={experienceLevels} isGray onChange={(e: any) => setData((prev) => ({ ...prev, career_level: e.id }))} />
            </div>
            <div className='w-[95%] grid grid-cols-2 gap-4 mt-7 me-3'>
                <CustomSelectMultipleMenu defaultData={formData?.job_type || []} error={errors?.job_type} label="Job Type" options={jobTypes} onChange={(e) => setData((prev: any) => ({ ...prev, job_type: e }))} />
                <CustomSelectMultipleMenu defaultData={formData?.workplace || []} error={errors?.workplace} label="Work Mode" options={workModes} onChange={(e) => setData((prev: any) => ({ ...prev, workplace: e }))} />
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What`s the minimum salary you would accept?<span className='text-[12px]'> Add a net  salary</span></span>
                <div className='flex flex-col sm:flex-row items-start sm:items-center w-[100%] sm:w-[70%] gap-4'>
                    <div className='w-[80%] sm:w-[50%] flex flex-row items-start sm:items-center'>
                        <InputAndLabel error={errors?.min_salary} value={formData?.min_salary} setData={setData} name='min_salary' placeholder="Minimum Salary" type='number' min={1} />
                    </div>
                    <span>Egypt Pound (EGP / Month)</span>
                </div>
            </div>
            <div className='flex flex-row mt-2 gap-2 items-center'>
                <input title='hide' type="checkbox" name="Hide This From Other Users" id="hide" onChange={(e) => setData((prev: any) => ({ ...prev, hide_salary: e.target.checked ? 1 : 0 }))} />
                <label htmlFor="hide">Hide This From Other Users</label>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleBack} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' disabled={loading} onClick={() => {
                    handleSubmit();
                    console.log('submitted');
                }} title='submit' className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Submit</button>
            </div>
        </div>
    )
}
