import { Link } from "react-router";


export default function Logo({ isDisabled }: { isDisabled?: boolean }) {
    return (
        <Link to={isDisabled ? '' : '/'} className='relative z-[100] w-[50px] md:w-[70px] flex flex-col justify-center items-center h-[50px] md:h-[70px] rounded-full bg-[#0055d9]'>
            <img src={'/assets/lines.png'} alt='background' className="absolute" />
            <img width={60} height={45} className='object-scale-down' src={'/assets/logoWhite.png'} alt='background' />
        </Link>
    )
}
