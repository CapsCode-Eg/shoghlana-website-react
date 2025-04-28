import { useState } from 'react'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import InputAndLabel from '../input/inputAndLabel'
import { Trash } from 'lucide-react'
import { DocumentUpload } from './uploadCv'

export default function YourExperience({ handleNext, handleBack }: { handleNext: () => void, handleBack: () => void }) {
    const [experience, setExperience] = useState([{
        id: 1,
        jobTitle: '',
        company: '',
        jobCategory: '',
        experience: '',
        startDate: '',
        endDate: '',
        currentlyWorkingThere: false,
    }])

    const handleAddMoreExperience = () => {
        setExperience([...experience, {
            id: experience.length + 1,
            jobTitle: '',
            company: '',
            jobCategory: '',
            experience: '',
            startDate: '',
            endDate: '',
            currentlyWorkingThere: false,
        }])
    }

    const handleRemoveExperience = (id: number) => {
        if (experience.length > 1) {
            const updatedExperience = experience.filter((exp) => exp.id !== id);
            setExperience(updatedExperience);
        }
    }
    const [, setSelectedFile] = useState<File | null>(null);

    const handleFileUpload = (file: File) => {
        setSelectedFile(file);
        console.log('Uploaded file:', file);
    };
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] min-h-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pe-[25px] sm:pe-[65px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center mx-auto sm:mx-0 justify-center gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Experience</span>
            </div>
            <div className='flex flex-col w-full mt-10'>
                <span className='font-medium text-[24px] mb-[10px] text-black'>How many years of experience do you have?</span>
                <CustomSelectMenu options={[]} />
            </div>
            <span className='font-medium text-[24px] mt-10 mb-[10px] text-black'>What`s your work experience?</span>
            {
                experience.map((item, index) => (
                    <div key={index} className='flex flex-col relative w-full items-start'>
                        <div className='flex flex-col w-[90%] sm:w-[60%] gap-5'>
                            <InputAndLabel label="Job title" placeholder="Job title" />
                            <InputAndLabel label="Company" placeholder="Company" />
                            <CustomSelectMenu shadow={true} label="Job category" options={[{ id: 1, name: "High School" }, { id: 2, name: "Bachelor" }, { id: 3, name: "Master" }, { id: 4, name: "PhD" }]} isGray />
                            <CustomSelectMenu shadow={true} label="Experience Type" options={[{ id: 1, name: "High School" }, { id: 2, name: "Bachelor" }, { id: 3, name: "Master" }, { id: 4, name: "PhD" }]} isGray />
                        </div>
                        <div className='grid grid-cols-2 gap-5 mt-5 w-full'>
                            <InputAndLabel label="Start Date" type='date' placeholder="Company" />
                            <InputAndLabel label="End Date" type='date' placeholder="Company" />
                        </div>
                        <div className='flex flex-row items-center mt-5 gap-2'>
                            <input type="checkbox" title='checkBox' />
                            <span className='font-medium text-[14px] text-[#737373]'>Currently working there</span>
                        </div>
                        <div className='w-full flex flex-row gap-5 justify-end mt-7'>
                            <button onClick={() => handleRemoveExperience(item.id)} title='delete' className='rounded-[8px] absolute top-6 flex flex-col items-center justify-center text-[20px] font-medium text-red-500'>
                                <Trash />
                            </button>
                            <button onClick={handleAddMoreExperience} className='px-4 h-[40px] rounded-[8px] flex flex-col items-center justify-center text-[16px] font-medium text-[#033A8E]/40 bg-[#DCE5F3]/50'>Add More</button>
                        </div>
                    </div>
                ))
            }
            <DocumentUpload setFile={handleFileUpload} />
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4'>
                <button type='button' onClick={handleBack} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' onClick={handleNext} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}