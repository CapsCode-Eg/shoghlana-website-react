import { Link } from "react-router";
import Background from "../background/background";

export default function SectionFive() {
    return (
        <div className='mx-[8px] w-[calc(100%-16px)] rounded-[25px] relative pb-0 p-[40px]
        !bg-main my-[10px] overflow-hidden
        flex flex-col mb-[80px] xl:flex-row items-center gap-[0px] lg:gap-[100px] 2xl:gap-[240px] justify-center
        '>
            <Background linesOnly />
            <div className='flex flex-col pb-[10px] md:pb-[40px] mt-[40px] xl:mt-0'>
                <span className='font-medium mx-auto xl:mx-0 text-[13px] font-white mb-[16px] text-white'>EASE View</span>
                <span className='font-medium text-center xl:text-start text-[20px] md:text-[39px] font-white max-w-[100%] xl:max-w-[491px] text-white mb-[24px]'>You can now find an easy-breezy job search</span>
                <span className='font-[400] text-center xl:text-start text-[13px] md:text-[20px] text-[#E6E6E6] max-w-[100%] xl:max-w-[491px] 
                mb-[20px] md:mb-[59px]'>If you`re seeking opportunities for employment, internships, or networking, our job fair application simplifies the process of connecting with potential employers and discovering your ideal career path all from the comfort of your device.</span>
                <Link to='/explore' className='flex flex-col mx-auto hover:cursor-pointer z-10 xl:mx-0 shadow-xl shadow-white/20 items-center justify-center py-[18.32px] px-[32.57px] bg-white text-black rounded-[12.5px] font-medium text-[17px] md:text-[25px] w-fit'>
                    Get Exploor now!
                </Link>
            </div>
            <img width={700} height={700} src={'/assets/images/sectionFive.png'} alt='background' className='mt-0 xl:mt-20' />
        </div>
    )
}
