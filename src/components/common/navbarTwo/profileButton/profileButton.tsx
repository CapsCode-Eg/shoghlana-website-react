import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import axiosInstance from '../../../../utils/axiosInstance';
import { Link } from 'react-router';
import Logo from '../../../logo/logo';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../utils/redux/store';

export default function ProfileButton() {
    const [isOpen, setIsOpen] = useState(false);
    const User = useSelector((state: RootState) => state.UserData.user)
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLogout = async () => {
        axiosInstance.post('/logout').then(() => {
            toast.success('Logout successful');
            window.location.href = '/';
            window.localStorage.clear();
        }).catch((error) => {
            toast.error(error?.response?.data?.msg, { id: 'add-country' })
            toast.error('Logout failed');
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [userData, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])
    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {userData?.image ? <img
                    src={userData?.image ? User?.image || userData?.image : ''}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full w-[44px] h-[44px] object-cover flex-1 flex-shrink-0"
                /> :
                    <Logo isDisabled={true} />}
                <div className="ml-3 flex-1 hidden lg:block">
                    <p className="font-bold">{userData?.name || userData?.first_name || 'Loading...'}</p>
                    <p className="text-sm text-gray-500">{userData?.email || 'Loading...'}</p>
                </div>
            </div>

            {isOpen && (
                <div className="absolute z-[100] start-[-30%] lg:-start-2 mt-2 w-56 bg-white rounded-md shadow-lg">
                    <ul className="py-1">
                        <li>
                            <Link to={userData?.type === 'company' ? "/company_profile" : "/profile"} onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                View Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/setting/general-info" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Setting
                            </Link>
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            About Us
                        </li>
                        <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Contact Us
                        </li>
                        <li onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

