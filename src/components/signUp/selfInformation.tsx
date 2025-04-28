import InputAndLabel from '../input/inputAndLabel'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'

export default function SelfInformation({ handleNext }: { handleNext: () => void }) {
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-3 sm:ms-0 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Your Self</span>
            </div>
            <div className='flex flex-col w-full ps-[15px] mt-2 sm:-mt-3 pe-[50px]'>
                <span className='font-medium text-[24px] text-black'>Your information</span>
                <div className='flex flex-col sm:flex-row w-full mt-4 mb-[30px] gap-[32px]'>
                    <InputAndLabel label="First name" placeholder="First name" />
                    <InputAndLabel label="Last name" placeholder="Last name" />
                </div>
                <InputAndLabel type='date' label="Birthdate" placeholder="Birthdate" />
                <div className='w-[100%] sm:w-1/3 mt-7'>
                    <CustomSelectMenu shadow={true} label="Gender" options={[{ id: 1, name: "Male" }, { id: 2, name: "Female" }]} isGray />
                </div>
                <div className='w-[100%] sm:w-1/2 mt-7'>
                    <CustomSelectMenu shadow={true} label="Nationality" options={[{ id: 1, name: "Egyptian" }, { id: 2, name: "Saudi" }]} isGray />
                </div>
            </div>
            <div className='flex flex-col pt-[22px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)] ps-[15px]'>
                <span className='font-medium text-[24px] text-black'>Your Location</span>
                <div className='w-[100%] sm:w-[70%] grid grid-cols-1 sm:grid-cols-3 mt-3 items-center gap-5'>
                    <CustomSelectMenu shadow={true} label="Country" options={[{ id: 1, name: "Egypt" }, { id: 2, name: "Saudi Arabia" }]} isGray />
                    <CustomSelectMenu shadow={true} label="City" options={[{ id: 1, name: "Cairo" }, { id: 2, name: "Riyadh" }]} isGray />
                    <CustomSelectMenu shadow={true} label="Area" options={[{ id: 1, name: "Cairo" }, { id: 2, name: "Riyadh" }]} isGray />

                </div>
            </div>
            <div className='flex flex-col pt-[22px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)] ps-[15px]'>
                <span className='font-medium text-[24px] text-black'>Contact info</span>
                <div className='w-[100%] sm:w-[35%]'>
                    <InputAndLabel label="Mobile Number" placeholder="e.g,+20" />
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleNext} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}
