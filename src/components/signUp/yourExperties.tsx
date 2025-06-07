import { useEffect, useState } from 'react'
import InputAndLabel from '../input/inputAndLabel'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import { Trash } from 'lucide-react'
import { v4 as uuidv4 } from 'uuid';
import CustomSelectMultipleMenu from '../../pages/setting/general-info/components/customeMultiSelectMenu';
import { toast } from 'sonner';

export default function YourExperties({ handleNext, handleBack, setData, skills, formData, errors }: { errors: any, formData: any, skills: any, setData: React.Dispatch<React.SetStateAction<any>>, handleNext: () => void, handleBack: () => void }) {
    const [languages, setLanguages] = useState([{
        id: uuidv4(),
        language: '',
        level: '',
    }]);

    const languageLevels = [
        { id: 1, name: "beginner" },
        { id: 2, name: "intermediate" },
        { id: 3, name: "advanced" },
        { id: 4, name: "fluent" },
        { id: 5, name: "native" }
    ];
    useEffect(() => {
        console.log('languages', formData?.languages)
        if (formData?.languages?.length > 1) {
            console.log('languages', formData?.languages)
            setLanguages(formData?.languages)
        }
    }, [])
    const handleRemoveLanguage = (id: string) => {
        if (languages.length > 1) {
            const updatedLanguages = languages.filter((lang) => lang.id !== id);
            setLanguages(updatedLanguages);
            setData((prev: any) => ({
                ...prev,
                languages: updatedLanguages
            }))
        }
    }
    useEffect(() => {
        if (errors?.languages) {
            toast.error(errors?.languages)
        }
    }, [errors])
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-5 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Expertise</span>
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What languages do you speak? </span>
                {
                    languages.map((item, index) => (
                        <div key={item.id} className='grid grid-cols-1 sm:grid-cols-2 mb-4 gap-[22px] relative'>
                            <div className='mt-1'>
                                <InputAndLabel
                                    normalChange
                                    label="Language"
                                    placeholder="Language"
                                    value={item.language}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const updated = [...languages];
                                        updated[index].language = e.target.value;
                                        setLanguages(updated);
                                    }}
                                />
                            </div>
                            <CustomSelectMenu
                                shadow
                                label="Level"
                                isGray
                                defaultData={+(item.level)}
                                options={languageLevels}
                                onChange={(selected: any) => {
                                    const updated = [...languages];
                                    updated[index].level = selected.id;
                                    setLanguages(updated);
                                }}
                            />
                            {item.id === languages[languages.length - 1].id && (
                                <button
                                    type='button'
                                    onClick={() => {
                                        const last = languages[languages.length - 1];
                                        if (!last.language || !last.level) {
                                            toast.error("Please fill all the fields");
                                            return;
                                        }
                                        const updated = [
                                            ...languages,
                                            { id: uuidv4(), language: '', level: '' }
                                        ];
                                        setLanguages(updated);
                                        setData((prev: any) => ({
                                            ...prev,
                                            languages: updated
                                        }));
                                    }}
                                    className='w-[123px] h-[34px] rounded-[8px] flex flex-col items-center justify-center text-[15px] font-[400] text-white border-[1px] bg-main'
                                >
                                    Add
                                </button>
                            )}
                            <button
                                onClick={() => handleRemoveLanguage(item.id)}
                                title='delete'
                                className='rounded-[8px] absolute end-0 top-0 flex flex-col items-center justify-center text-[16px] font-medium text-red-500'
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    ))
                }

            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] mb-3 text-black'>What skills and tools do you bring to the table? (up to +10)</span>
                <div className='w-[100%]'>
                    <CustomSelectMultipleMenu defaultData={formData?.skills} options={skills} onChange={(e) => setData((prev: any) => ({ ...prev, skills: e }))} />
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleBack} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' onClick={handleNext} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}