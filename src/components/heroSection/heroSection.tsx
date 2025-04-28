import React from 'react'
import Background from '../background/background'
import HomePageSearch from '../homePageSearch/homePageSearch'

export default function HeroSection() {
    return (
        <div className='mx-[8px] w-[calc(100%-16px)] rounded-[25px] relative pb-[24px]
         !bg-black/15 my-[10px] overflow-hidden'>
            <Background />
            <div className='flex flex-col items-center !pt-[200px] md:pt-[281px] text-white h-full'>
                <div className='flex flex-col text-center'>
                    <span className='text-[25px] md:text-[50px] lg:text-[76px] font-medium'>
                        Find the Best Jobs in Egypt
                    </span>
                    <span className='text-[25px] md:text-[50px] lg:text-[76px] md:-mt-6 font-medium'>
                        and the MENA Region
                    </span>
                </div>
                <span className='w-[90%] md:w-[80%] lg:w-[50%] 3xl:w-[39%] text-[13px] md:text-[25px] mb-[100px] md:mb-[163px] text-center'>
                    Searching for vacancies & career opportunities? Shocholy helps you in your job search in Egypt
                </span>
                <HomePageSearch />
            </div>
        </div>
    )
}
