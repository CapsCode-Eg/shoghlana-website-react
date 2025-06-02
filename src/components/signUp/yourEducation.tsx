import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import InputAndLabel from '../input/inputAndLabel'

export default function YourEducation({ handleNext, handleBack, setData, years, formData, errors }: { errors: any, formData: any, years: any, setData: React.Dispatch<React.SetStateAction<any>>, handleNext: () => void, handleBack: () => void }) {
    const educationLevels = [
        { id: 0, name: "Bachelors Degree" },
        { id: 1, name: "Masters Degree" },
        { id: 2, name: "Doctorate Degree" },
        { id: 3, name: "High School" },
        { id: 4, name: "Vocational" },
        { id: 5, name: "Diploma" }
    ];
    const gradeLevels = [
        { id: 0, name: "Pass (50% - 64%)" },
        { id: 1, name: "Good (65% - 74%)" },
        { id: 2, name: "Very Good (75% - 84%)" },
        { id: 3, name: "Excellent (85% - 100%)" }
    ];
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-3 sm:ms-0 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Education</span>
            </div>
            <div className='w-full pe-[45px]'>
                <CustomSelectMenu defaultData={formData?.education_level} error={errors?.education_level} shadow={true} label="What`s your education level right now?" options={educationLevels} isGray onChange={(e: any) => setData((prev) => ({ ...prev, education_level: e.id }))} />
            </div>
            <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                <span className='font-medium text-[24px] text-black'>Degree Details </span>
                <div className='w-[100%] flex flex-col gap-[22px] mt-[22px]'>
                    <InputAndLabel value={formData?.field_of_study} error={errors?.field_of_study} label="Field(s) of Study" placeholder="e.g,Computer Engineering" name='field_of_study' setData={setData} />
                    <InputAndLabel value={formData?.university} error={errors?.university} label="University / institution" placeholder="e.g,Computer Engineering" name='university' setData={setData} />
                    <div>
                        <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7'>
                            <CustomSelectMenu defaultData={formData?.enroll_year} error={errors?.enroll_year} shadow={true} label="Enroll year" options={years.map((year: any) => ({ id: year.value, name: year.value }))} isGray onChange={(e: any) => setData((prev) => ({ ...prev, enroll_year: e.id }))} />
                            <CustomSelectMenu defaultData={formData?.graduation_year} error={errors?.graduation_year} shadow={true} label="Grade year" options={years.map((year: any) => ({ id: year.value, name: year.value }))} isGray onChange={(e: any) => setData((prev) => ({ ...prev, graduation_year: e.id }))} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[22px]'>
                        <CustomSelectMenu defaultData={formData?.grade} error={errors?.grade} shadow={true} label="Grade" options={gradeLevels} isGray onChange={(e: any) => setData((prev) => ({ ...prev, grade: e.id }))} />
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
