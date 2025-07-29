"use client";
import ProfileButton from "./profileButton/profileButton";
import { useEffect, useRef, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import ProfileAccordion from "./profileButton/AccordionProfile";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosInstance";

export default function NavbarTwo() {
    const location = useLocation();
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
    const handleLogout = async () => {
        axiosInstance.post('/logout').then(() => {
            toast.success('Logout successful');
            window.location.href = '/';
            window.localStorage.clear();
        }).catch((error) => {
            toast.error(error?.response?.data?.message, { id: 'add-country' })
            toast.error('Logout failed');
        })
    }
    return (
        <nav className="bg-white relative max-w-screen px-6 py-3 flex items-center shadow-lg justify-between">
            {/* Left Section (Logo) */}
            <div className="lg:hidden">
                <img
                    src="/assets/logos/logoBlue.png"
                    title="Audit Station Logo"
                    className="h-[45px] w-[115px]"
                />
            </div>
            <div className="flex-row f items-center lg:flex hidden gap-8 text-[15px] font-[600] text-text">
                <img
                    src="/assets/logos/logoBlue.png"
                    title="Audit Station Logo"
                    className="h-[45px] w-[115px]"
                />
                <div className="hidden items-center lg:flex space-x-8">
                    <Link to="/" className={`${location.pathname === "/" ? "text-[#0055D9] text-[24px] font-bold" : "text-[#4D6182]  text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/") && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Home</Link>
                    {isCompany && <Link to="/pricing" className={`${location.pathname === "/pricing" || location.pathname.includes("/pricing/") ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/explore" || location.pathname.includes("/job/")) && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Pricing Plan</Link>}
                    {isCompany && <Link to="/invitations" className={`${location.pathname === "/invitations" || location.pathname.includes("/invitations/") ? "text-[#0055D9]  text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/invitations" || location.pathname.includes("/invitations/")) && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Invitations</Link>}
                    {isCompany && <Link to="/grantee" className={`${location.pathname === "/grantee" || location.pathname.includes("/grantee/") ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/grantee" || location.pathname.includes("/grantee/")) && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Grantee</Link>}
                    {isCompany && <Link to="/company-users" className={`${location.pathname === "/company-users" || location.pathname.includes("/company-users/") ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/company-users" || location.pathname.includes("/company-users/")) && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Company User</Link>}
                    {!isCompany && <Link to="/explore" className={`${location.pathname === "/explore" || location.pathname.includes("/job/") ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {(location.pathname === "/explore" || location.pathname.includes("/job/")) && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Explore</Link>}
                    {(!isCompany && window.localStorage.getItem('user') !== null) && <Link to="/saved" className={`${location.pathname === "/saved" ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {location.pathname === "/saved" && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Saved</Link>}
                    {(!isCompany && window.localStorage.getItem('user') !== null) && <Link to="/applications" className={`${location.pathname === "/applications" ? "text-[#0055D9] text-[18px] xl:text-[24px] font-bold" : "text-[#4D6182]  text-[16px] xl:text-[20px] font-semibold"}  relative`}>
                        {location.pathname === "/applications" && (
                            <div className="w-full absolute -bottom-[30px] rounded-full h-0.5 bg-[#0055D9]" />
                        )}
                        Application</Link>}
                </div>
            </div>


            {/* Right Section (Profile) */}
            <div className="lg:block hidden">
                {window.localStorage.getItem('user') &&
                    <ProfileButton />
                }
            </div>
            <div className="lg:hidden" ref={menuRef}>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <MenuIcon size={30} />
                </div>
                <div
                    className={`absolute z-[1000] top-0 w-[80%] -end-2 text-start min-w-[129px] p-0 bg-main  flex flex-col items-center pt-10 h-screen
                            transition-all duration-300 ease-in-out ${isOpen ? '-translate-x-0' : 'translate-x-[3000px]'
                        }`}
                >
                    <img width={150} height={150} src={'/assets/logo.png'} alt='background' className='object-cover' />
                    <div className=" px-[10px]  flex flex-col w-full  gap-4 text-[20px] font-bold pt-[30px]">
                        <ProfileAccordion />
                        {<Link to="/" className=" px-4 py-2 -mt-4 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">

                            Home</Link>}
                        {!isCompany && <Link to="/explore" className=" px-4 py-2 -mt-4 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">

                            Explore</Link>}
                        {(!isCompany && window.localStorage.getItem('user') !== null) &&
                            <Link to="/saved" className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">
                                Saved</Link>
                        }
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/old-grantees" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Grantees</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/company_jobs" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Jobs</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/grantee" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">New Grantee</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/last-subscription" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Subscription</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/pricing" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Pricing Plan</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/company-users" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Company User</Link>}
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/invitations" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Invitations</Link>}
                        {(!isCompany && window.localStorage.getItem('user') !== null) && <Link to="/applications" className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Application</Link>}
                        {(window.localStorage.getItem('user') !== null) && <span onClick={handleLogout} className="block px-4 py-1 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded ">Logout</span>}
                    </div>
                </div>
            </div>
        </nav>
    );
};
