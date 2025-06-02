import { useState } from 'react'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import InputAndLabel from '../input/inputAndLabel'
import { DocumentUpload } from './uploadCv'

export default function YourExperience({ handleNext, handleBack, setData, years, job_category, formData, errors }: { errors: any, formData: any, job_category: any, years: any, setData: React.Dispatch<React.SetStateAction<any>>, handleNext: () => void, handleBack: () => void }) {



    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const handleFileUpload = (file: File) => {
        setSelectedFile(file);
        setData((prev) => ({ ...prev, cv: file }))
        console.log('Uploaded file:', file);
    };
    const months = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        return { id: month, name: month.toString() };
    });
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] min-h-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pe-[25px] sm:pe-[65px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center mx-auto sm:mx-0 justify-center gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Experience</span>
            </div>
            <div className='flex flex-col w-full mt-10'>
                <span className='font-medium text-[24px] mb-[10px] text-black'>How many years of experience do you have?</span>
                <CustomSelectMenu defaultData={formData?.years_of_experience} error={errors?.years_of_experience} options={[{ id: 1, name: "1" }, { id: 2, name: '2' }, { id: 3, name: '3' }, { id: 4, name: '4' }, { id: 5, name: '5' }]} onChange={(e: any) => setData((prev) => ({ ...prev, years_of_experience: e.id }))} />
            </div>
            <span className='font-medium text-[24px] mt-10 mb-[10px] text-black'>What`s your work experience?</span>

            <div className='flex flex-col relative w-full items-start'>
                <div className='grid grid-cols-2 w-full gap-5'>
                    <InputAndLabel value={formData?.experience_job_title} error={errors?.experience_job_title} label="Job title" placeholder="Job title" setData={setData} name='experience_job_title' />
                    <InputAndLabel value={formData?.company} error={errors?.company} label="Company" placeholder="Company" name='company' setData={setData} />
                    <CustomSelectMenu defaultData={formData?.job_category_id} error={errors?.job_category_id} shadow={true} label="Job category" options={job_category} isGray onChange={(e: any) => setData((prev) => ({ ...prev, job_category_id: e.id }))} />
                </div>
                <div className='grid grid-cols-2 gap-5 mt-5 w-full'>
                    <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                        <CustomSelectMenu defaultData={formData?.start_year} error={errors?.start_year} shadow={true} label="Start year" options={years.map((year: any) => ({ id: year.value, name: year.value }))} isGray onChange={(e: any) => setData((prev) => ({ ...prev, start_year: e.id }))} />
                        <CustomSelectMenu defaultData={formData?.start_month} error={errors?.start_month} shadow={true} label="Start Month" options={months} isGray onChange={(e: any) => setData((prev) => ({ ...prev, start_month: e.id }))} />
                    </div>
                    <div className='w-[100%] grid grid-cols-1 gap-4 mt-7'>
                        <CustomSelectMenu defaultData={formData?.end_year} error={errors?.end_year} shadow={true} label="End year" options={years.map((year: any) => ({ id: year.value, name: year.value }))} isGray onChange={(e: any) => setData((prev) => ({ ...prev, end_year: e.id }))} />
                        <CustomSelectMenu defaultData={formData?.end_month} error={errors?.end_month} shadow={true} label="End Month" options={months} isGray onChange={(e: any) => setData((prev) => ({ ...prev, end_month: e.id }))} />
                    </div>
                </div>
                <div className='flex flex-row items-center mt-5 gap-2 mb-10'>
                    <input checked={formData?.still_working === 1 ? true : false} id='checkBox' type="checkbox" title='checkBox' onChange={(e: any) => setData((prev) => ({ ...prev, still_working: e.target.checked ? 1 : 0 }))} />
                    <label htmlFor='checkBox' className='font-medium text-[14px] text-[#737373]'>Currently working there</label>
                </div>
            </div>

            <DocumentUpload file={formData?.cv} setFile={handleFileUpload} />
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4'>
                <button type='button' onClick={handleBack} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' onClick={handleNext} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}