import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { MenuIcon } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null)
    const [isCompany, setIsCompany] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user') || '{}');
            setIsCompany(user?.type === 'company');
        }
    }, [])
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // @ts-expect-error: Type mismatch
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        return () => document.body.classList.remove("no-scroll");
    }, [isOpen]);
    return (
        <div className="fixed top-[0px] shadow-2xl md:top-[10px] w-[calc(100%-16px)] md:w-[calc(100%-24px)] mx-[8px] md:mx-[12px] rounded-[20px] bg-white border-[1px] border-gray-200 h-[86.41px] z-[1000] flex items-center ">
            <div className="w-[calc(100%-64px)] mx-auto flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-8 text-[15px] font-[600] text-text">
                    <img
                        src="/assets/logos/logoBlue.png"
                        title="Audit Station Logo"
                        className="h-[45px] w-[115px]"
                    />
                    {!isCompany && <Link to="/" className={`${location.pathname === "/" ? "text-[#0055D9] text-[24px] font-bold" : "text-[#4D6182]  text-[20px] font-semibold"}  relative hidden lg:block`}>
                        Home</Link>}
                    {!isCompany && <Link to="/explore" className={`${location.pathname === "/explore" || location.pathname.includes("/job/") ? "text-[#0055D9] text-[24px] font-bold" : "text-[#4D6182]  text-[20px] font-semibold"}  relative hidden lg:block`}>
                        Explore</Link>}
                </div>
                <div className="text-[15px]  font-[600] text-text hidden lg:flex flex-row">
                    <Link to='/login-as-company' className="flex flex-row items-center me-[28px] hover:scale-105 duration-300">
                        <img width={17} height={15} src="/bag.svg" alt="bag" className="me-2" />
                        <span>Post Job</span>
                    </Link>
                    <div className="h-[50px] w-[2px] bg-gray-200 me-[35px]" />
                    <Link to='/login' className="flex flex-row items-center me-[28.23px] gap-2 py-[9px] px-[18px] border-main border-[2px] rounded-[5px] ">
                        Log in
                    </Link>
                    <Link to='/sign' className="flex flex-row items-center gap-2 py-[9px] px-[18px] border-main border-[2px] bg-main text-white rounded-[5px] ">
                        Start Now
                    </Link>
                </div>
                <div className="flex lg:hidden" ref={menuRef}>
                    <div onClick={() => setIsOpen(!isOpen)}>
                        <MenuIcon size={30} />
                    </div>
                    <div
                        className={`fixed z-[1000] top-0 w-[80%] -end-4 text-start p-0 bg-main  flex flex-col items-center pt-10 h-screen
                            transition-all duration-300 ease-in-out ${isOpen ? '-translate-x-0' : 'translate-x-[3000px]'
                            }`}
                    >
                        <img width={150} height={150} src={'/assets/logo.png'} alt='background' className='object-cover' />
                        <div className=" px-[10px]  flex flex-col w-full  gap-4 text-[20px] font-bold pt-[30px]">
                            <Link to="/" className=" px-4 py-2  text-white hover:text-white/80  duration-500 transition-all cursor-pointer rounded ">
                                Home
                            </Link>
                            {!isCompany &&
                                <Link to="/explore" className=" px-4 py-2  text-white hover:text-white/80 duration-500 transition-all cursor-pointer rounded ">
                                    Explore
                                </Link>
                            }
                            <Link to='/login-as-company' className=" px-4 py-2 flex flex-row items-center text-white hover:text-white/80  duration-500 transition-all cursor-pointer rounded ">
                                <span>Post Job</span>
                            </Link>
                            <div className="grid grid-cols-1 gap-2 mx-4 justify-center items-center">
                                <Link to='/login' className="flex flex-row text-main font-bold items-center justify-center bg-white  gap-2 py-[9px] px-[18px] border-main border-[2px] rounded-[10px] ">
                                    Log in
                                </Link>
                                <Link to='/sign' className="flex flex-row text-main font-bold items-center justify-center bg-white gap-2 py-[9px] px-[18px] border-main border-[2px] rounded-[10px] ">
                                    Start Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
