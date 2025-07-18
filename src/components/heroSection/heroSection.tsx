import Background from '../background/background'
import HomePageSearch from '../homePageSearch/homePageSearch'

export default function HeroSection({ bannar }: { bannar?: any }) {
    return (
        <div className='mx-[8px] w-[calc(100%-16px)] rounded-[25px] relative pb-[24px]
         !bg-black/15 my-[10px]'>
            <Background image={bannar?.image} />
            <div className='flex flex-col items-center !pt-[200px] md:pt-[281px] text-white h-full'>
                <div className='flex flex-col text-center'>
                    <span className='text-[25px] md:text-[50px] lg:text-[76px] font-medium'>
                        {bannar?.name}
                    </span>
                </div>
                <span className='w-[90%] md:w-[80%] lg:w-[50%] 3xl:w-[39%] text-[13px] md:text-[25px] mb-[100px] md:mb-[163px] text-center'>
                    {bannar?.description}
                </span>
                <HomePageSearch />
            </div>
        </div>
    )
}
