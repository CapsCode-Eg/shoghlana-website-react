import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import InputAndLabel from '../input/inputAndLabel'

export default function YourEducation({ handleNext, handleBack }: { handleNext: () => void, handleBack: () => void }) {
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-3 sm:ms-0 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Education</span>
            </div>
            <div className='w-full pe-[45px]'>
                <CustomSelectMenu shadow={true} label="What`s your education level right now?" options={[{ id: 1, name: "High School" }, { id: 2, name: "Bachelor" }, { id: 3, name: "Master" }, { id: 4, name: "PhD" }]} isGray />
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] text-black'>Degree Details </span>
                <div className='w-[100%] sm:w-[55%] flex flex-col gap-[22px] mt-[22px]'>
                    <InputAndLabel label="Field(s) of Study" placeholder="e.g,Computer Engineering" />
                    <InputAndLabel label="University / institution" placeholder="e.g,Computer Engineering" />
                    <div className='flex flex-col gap-[22px]'>
                        <CustomSelectMenu shadow={true} label=" when did you finish your degree?" options={[{ id: 1, name: "High School" }, { id: 2, name: "Bachelor" }, { id: 3, name: "Master" }, { id: 4, name: "PhD" }]} isGray />
                        <CustomSelectMenu shadow={true} label="Grade" options={[{ id: 1, name: "fair" }, { id: 2, name: "good" }, { id: 3, name: "excellent" }]} isGray />

                    </div>
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleBack} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                <button type='button' onClick={handleNext} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}
