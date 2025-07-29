import { useState } from "react"

export default function TabsSearchHomePage({ setData }: any) {
    const [tab, setTab] = useState(1)

    const handleChange = (index: number) => {
        setTab(index)
        setData((prev) => {
            return {
                ...prev,
                work_places: index
            }
        })
    }
    return (
        <div className='flex flex-row gap-4 mt-4 items-center w-full max-w-full overflow-x-auto'>
            <span onClick={() => handleChange(1)} className={`w-[100px] text-nowrap md:w-[101px] h-[24px] md:h-[37px] text-center text-[11px] md:text-[15px] px-1.5 md:px-3 flex items-center justify-center font-[600] cursor-pointer ${tab === 1 ? 'text-white bg-main rounded-md' : 'text-[#818181]'} `}>
                Full Time
            </span>
            <span onClick={() => handleChange(2)} className={`w-[80px] text-nowrap md:w-[101px] h-[24px] md:h-[37px] text-center text-[11px] md:text-[15px] px-1.5 md:px-3 flex items-center justify-center font-[600] cursor-pointer ${tab === 2 ? 'text-white bg-main rounded-md' : 'text-[#818181]'} `}>
                Hybird
            </span>
            <span onClick={() => handleChange(3)} className={`w-[80px] text-nowrap md:w-[101px] h-[24px] md:h-[37px] text-center text-[11px] md:text-[15px] font-[600] px-1.5 md:px-3 flex items-center justify-center cursor-pointer ${tab === 3 ? 'text-white bg-main rounded-md ' : 'text-[#818181]'} `}>
                Remote
            </span>
        </div>
    )
}
