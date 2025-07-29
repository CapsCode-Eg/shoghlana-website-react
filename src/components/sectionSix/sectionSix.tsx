
export default function SectionSix() {
    return (
        <div className="pt-[48px] px-[40px] md:px-[48px] gap-10 flex flex-col items-center xl:flex-row justify-evenly mb-[110px]">
            <div className='flex flex-col items-center xl:items-start'>
                <div className='bg-main flex mb-[60px] flex-col items-center justify-center rounded-[19px] w-[74px] h-[74px]'>
                    <img width={40} height={40} src={'/assets/icons/contact-support.svg'} alt='Contact Support' className='me-1' />
                </div>
                <span className='text-main mb-[28px] font-medium text-[14.7px]'>
                    # Contact us
                </span>
                <span className='text-[#333333] font-extrabold text-[45px] sm:text-[70px] mb-[30px] sm:mb-[60px] w-full text-center xl:text-start xl:max-w-[540px] leading-[70px]'>24/7 real-time support.</span>
                <span className='font-medium text-[17.2px] max-w-[98%] sm:max-w-[70%] xl:max-w-[510px] mb-[50px] text-center xl:text-start text-[#292D34]'>Need assistance? Reach out to our dedicated support team anytime! We are available 24/7, even on holidays, to help you with any questions or issues you may have.</span>
                <div className='flex flex-row flex-wrap xl:flex-col gap-[30px] items-center xl:items-start justify-center'>
                    <div className='flex flex-row gap-2 items-center justify-start'>
                        <img width={23} height={23} src={'/assets/icons/contact-right.svg'} alt='Contact Support' className='me-1' />
                        <span className='text-[17.3px] text-[#292D34] font-medium'>Email Support</span>
                    </div>
                    <div className='flex flex-row gap-2 items-center justify-start'>
                        <img width={23} height={23} src={'/assets/icons/contact-right.svg'} alt='Contact Support' className='me-1' />
                        <span className='text-[17.3px] text-[#292D34] font-medium'>Live Chat What`sApp</span>
                    </div>
                </div>
            </div>
            <div>
                <img width={760} height={580} src={'/assets/images/contact-support.png'} alt='Contact Support' />
            </div>
        </div>
    )
}
