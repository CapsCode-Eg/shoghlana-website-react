import { useState } from 'react'
import InputAndLabel from '../input/inputAndLabel'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import { Trash } from 'lucide-react'

export default function YourExperties({ handleNext, handleBack }: { handleNext: () => void, handleBack: () => void }) {
    const [languages, setLanguages] = useState([{
        id: 1,
        language: '',
        level: '',
    }])

    const handleAddMoreLanguage = () => {
        setLanguages([...languages, {
            id: languages.length + 1,
            language: '',
            level: '',
        }])
    }

    const handleRemoveLanguage = (id: number) => {
        if (languages.length > 1) {
            const updatedLanguages = languages.filter((lang) => lang.id !== id);
            setLanguages(updatedLanguages);
        }
    }
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-5 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Expertise</span>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What languages do you speak? </span>
                {
                    languages.map((item, index) => {
                        return (
                            <div key={index} className='grid grid-cols-1 sm:grid-cols-2 mb-4 gap-[22px] relative'>
                                <div className='mt-1'>
                                    <InputAndLabel label="Language" placeholder="Language" />
                                </div>
                                <CustomSelectMenu shadow={true} label="Level" options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} isGray />
                                {
                                    index === languages.length - 1 && (
                                        <button type='button' onClick={handleAddMoreLanguage} className='w-[123px] h-[34px] rounded-[8px] flex flex-col items-center justify-center text-[15px] font-[400] text-white border-[1px] bg-main'>
                                            Add
                                        </button>
                                    )
                                }
                                <button onClick={() => handleRemoveLanguage(item.id)} title='delete' className='rounded-[8px] absolute end-0 top-0 flex flex-col items-center justify-center text-[16px] font-medium text-red-500'>
                                    <Trash size={16} />
                                </button>
                            </div>
                        )
                    })
                }
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What skills and tools do you bring to the table? (up to +10)</span>
                <div className='w-[100%] sm:w-[calc(60%)]'>
                    <CustomSelectMenu shadow={true} options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} isGray />
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleBack} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' onClick={handleNext} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}
