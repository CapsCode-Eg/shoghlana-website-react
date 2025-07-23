import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Logo from '../../../logo/logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';
import { ChevronDown, ChevronUp } from 'lucide-react'; // You can use any icon library

export default function ProfileAccordion() {
    const [isOpen, setIsOpen] = useState(false);
    const User = useSelector((state: RootState) => state.UserData.user)
    const accordionRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (accordionRef.current && !accordionRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // const handleLogout = async () => {
    //     axiosInstance.post('/logout').then(() => {
    //         toast.success('Logout successful');
    //         window.location.href = '/';
    //         window.localStorage.clear();
    //     }).catch((error) => {
    //         toast.error(error?.response?.data?.message, { id: 'add-country' })
    //         toast.error('Logout failed');
    //     })
    // }

    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])

    return (
        <div className="relative w-full" ref={accordionRef}>
            <div
                className="flex items-center justify-between p-4 cursor-pointer rounded-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center ">
                    {userData?.image ?
                        <img
                            src={userData?.image ? User?.image || userData?.image : ''}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full border border-white w-[44px] h-[44px] object-cover flex-1 flex-shrink-0"
                        /> :
                        <div className='border border-white rounded-full'>
                            <Logo isDisabled={true} />
                        </div>
                    }
                    <div className="ml-3 flex-1 text-white">
                        <p className="font-bold">{userData?.name || userData?.first_name || 'Loading...'}</p>
                        <p className="text-sm text-white/80">{userData?.email || 'Loading...'}</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp className="text-white" /> : <ChevronDown className="text-white" />}
            </div>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="py-1 space-y-1">
                    <li>
                        <Link
                            to={userData?.type === 'company' ? "/company_profile" : "/profile"}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded"
                        >
                            View Profile
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/setting/general-info"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded"
                        >
                            Setting
                        </Link>
                    </li>
                    <li className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded">
                        About Us
                    </li>
                    <li className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded">
                        Contact Us
                    </li>
                    {/* <li
                        onClick={handleLogout}
                        className="block px-4 py-2 text-white hover:text-white/80 hover:scale-105 duration-500 transition-all cursor-pointer rounded "
                    >
                        Logout
                    </li> */}
                </ul>
            </div>
        </div>
    );
};