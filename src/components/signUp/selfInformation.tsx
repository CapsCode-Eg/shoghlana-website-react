import InputAndLabel from '../input/inputAndLabel'
import CustomSelectMenu from '../customeSelectMenu/customSelectMenu'
import InputPhone from '../../pages/setting/general-info/components/inputPhone'

export default function SelfInformation({ handleNext, setData, nationalties, countries, cities, formData, errors }: { errors: any, formData: any, countries: any, cities: any, nationalties: any, setData: React.Dispatch<React.SetStateAction<any>>, handleNext: () => void }) {
    return (
        <div className='w-[99%] sm:w-[90%] lg:w-[60%] bg-white relative z-[2] -mt-[80px] minh-[693px] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
            <div className='flex flex-col sm:flex-row items-center w-full -ms-3 sm:ms-0 gap-1.5'>
                <span className='font-bold text-[29px] text-black'>Tell Us About Your</span>
                <span className='font-extrabold text-[39px] mb-1 text-main'>Your Self</span>
            </div>
            <div className='flex flex-col w-full ps-[15px] mt-2 sm:-mt-3 pe-[50px]'>
                <span className='font-medium text-[24px] text-black'>Your information</span>

                <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7'>
                    <InputAndLabel error={errors?.job_title} value={formData?.job_title} setData={setData} name='job_title' type='text' label="Jop Title" placeholder="Jop Title" />
                    <InputAndLabel error={errors?.birth_day} value={formData?.birth_day} setData={setData} name='birth_day' type='date' label="Birthdate" placeholder="Birthdate" />
                </div>
                <div className='w-[100%] grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7'>
                    <CustomSelectMenu error={errors?.gender} defaultData={formData?.gender} shadow={true} label="Gender" options={[{ id: 0, name: "Male" }, { id: 1, name: "Female" }]} isGray onChange={(e: any) => setData((prev) => ({ ...prev, gender: e.id }))} />
                    <CustomSelectMenu error={errors?.nationality_id} defaultData={formData?.nationality_id} shadow={true} label="Nationality" options={nationalties?.length > 0 ? nationalties : []} isGray onChange={(e: any) => setData((prev) => ({ ...prev, nationality_id: e.id }))} />
                </div>
            </div>
            <div className='flex flex-col pt-[22px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)] ps-[15px]'>
                <span className='font-medium text-[24px] text-black'>Your Location</span>
                <div className='w-[100%] sm:w-[100%] grid grid-cols-1 sm:grid-cols-2 mt-3 items-center gap-5'>
                    <CustomSelectMenu error={errors?.country_id} defaultData={formData?.country_id} shadow={true} label="Country" options={countries?.length > 0 ? countries : []} isGray onChange={(e: any) => setData((prev) => ({ ...prev, country_id: e.id }))} />
                    <CustomSelectMenu error={errors?.city_id} defaultData={formData?.city_id} shadow={true} label="City" options={cities?.length > 0 ? cities : []} isGray onChange={(e: any) => setData((prev) => ({ ...prev, city_id: e.id }))} />
                </div>
            </div>
            <div className='flex flex-col pt-[22px] mt-[26px] border-t-[1px] mt-2 border-gray-200 border-dashed w-[calc(100%-50px)] ps-[15px]'>
                <span className='font-medium text-[24px] text-black'>Contact info</span>
                <div className='w-full grid grid-cols-1 sm:grid-cols-2 mt-1'>
                    <InputPhone error={errors?.mobile} value={formData?.mobile} onChange={(e: any) => setData((prev) => ({ ...prev, mobile: e }))} name='phone' label="Phone Number" placeholder="e.g,+20" />
                </div>
            </div>
            <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4 pe-10 sm:pe-0'>
                <button type='button' onClick={handleNext} className='w-[130px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
            </div>
        </div>
    )
}
