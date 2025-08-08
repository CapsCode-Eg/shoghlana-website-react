import { useEffect, useState } from "react";
import CustomSelectMenu from "../customeSelectMenu/customSelectMenu";
import TabsSearchHomePage from "../tabsSearchHomePage/tabsSearchHomePage";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HomePageSearch() {
    const [countries, setCountries] = useState<any>([]);
    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
    }, [])
    const [search, setSearch] = useState<string>('');
    const [data, setData] = useState<any>({
        country_ids: null,
        work_places: 1
    })
    const navigate = useNavigate()
    const handleSubmit = () => {
        // /explore
        if (search === '' || data.country_ids === null || data.work_places === null) {
            toast.error('Please select all fields')
            return
        }
        navigate(`/explore?search=${search}&country_ids=[${data.country_ids}]&work_places=[${data.work_places}]`)
    }
    return (
        <div className='w-[calc(100%-16px)] md:w-[calc(100%-56px)] z-[10] flex flex-col items-start justify-start p-[23px]  bg-white 
        h-fit rounded-[20px] text-text'>
            <span className='text-[18px] md:text-[31px] font-[500]'>Discover. Explore your Job Offer</span>
            <TabsSearchHomePage setData={setData} />
            <div className='flex flex-col lg:flex-row mt-[10px] xl:mt-[10px] mb-4 items-center justify-between w-[100%]'>
                <div className='w-[100%] lg:w-[60.5%] xl:w-[70.5%] pt-6.5'>
                    <input
                        type='text'
                        placeholder='Search Jobs (e.g. UI/UX Desinger)'
                        className='w-full h-[38px] px-[15px] border border-gray-300 rounded-[5px] text-text text-[15px]'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className='w-[100%] lg:w-[39%] xl:w-[28.5%]'>
                    <CustomSelectMenu placeholder='Find Location (e.g. inside Egypt)' icon={
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3_4685)">
                                <path d="M21 9.99951C21 16.9995 12 22.9995 12 22.9995C12 22.9995 3 16.9995 3 9.99951C3 7.61256 3.94821 5.32338 5.63604 3.63555C7.32387 1.94772 9.61305 0.999512 12 0.999512C14.3869 0.999512 16.6761 1.94772 18.364 3.63555C20.0518 5.32338 21 7.61256 21 9.99951Z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12 12.9995C13.6569 12.9995 15 11.6564 15 9.99951C15 8.34266 13.6569 6.99951 12 6.99951C10.3431 6.99951 9 8.34266 9 9.99951C9 11.6564 10.3431 12.9995 12 12.9995Z" stroke="#464646" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_3_4685">
                                    <rect width="24" height="24" fill="white" transform="translate(0 -0.000488281)" />
                                </clipPath>
                            </defs>
                        </svg>
                    }
                        onChange={(e: any) => setData((prev: any) => ({ ...prev, country_ids: e.id }))}
                        options={countries} label='Location' shadow={false} noBorder isGray />
                </div>
            </div>
            <button
                type='button'
                onClick={handleSubmit}
                className='bg-main text-white flex flex-row items-center gap-2 text-[15px] font-[500] py-[9px] px-[18px] rounded-[5px] w-full  justify-center'>Discover Now <img width={15} height={15} src={'/assets/arrow-right.svg'} alt='arrow' />
            </button>
        </div>
    )
}
