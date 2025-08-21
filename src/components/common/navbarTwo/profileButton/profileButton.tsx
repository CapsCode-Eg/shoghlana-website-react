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
    const [isCompany, setIsCompany] = useState(false);
    useEffect(() => {
        if (window.localStorage.getItem('user')) {
            const user = JSON.parse(window.localStorage.getItem('user') || '{}');
            setIsCompany(user?.type === 'company');
        }
    }, [])
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
            toast.error(error?.response?.data?.message, { id: 'add-country' })
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
                className="flex items-center text-white relative cursor-pointer rounded-full bg-main  px-2.5 py-1"
                onClick={() => setIsOpen(!isOpen)}
            >
                {userData?.image ? <img
                    src={userData?.image ? User?.image || userData?.image : ''}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full z-5 w-[45px] h-[45px] object-cover flex-1 flex-shrink-0"
                /> :
                    <Logo isDisabled={true} />}
                <div className="ml-3 flex-1 z-5 hidden lg:block">
                    <p className="font-bold text-[16px]">{userData?.name || userData?.first_name || 'Loading...'}</p>
                    <p className="text-[13px] ">{userData?.email || 'Loading...'}</p>
                </div>
                <svg className={`ms-8 z-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.82716 12.2803C8.9678 12.4209 9.15854 12.4999 9.35741 12.4999C9.55628 12.4999 9.74701 12.4209 9.88766 12.2803L14.1304 8.03751C14.202 7.96833 14.2592 7.88557 14.2985 7.79407C14.3378 7.70256 14.3585 7.60415 14.3593 7.50456C14.3602 7.40498 14.3412 7.30622 14.3035 7.21405C14.2658 7.12188 14.2101 7.03814 14.1397 6.96772C14.0693 6.8973 13.9855 6.84161 13.8934 6.8039C13.8012 6.76619 13.7024 6.74721 13.6029 6.74808C13.5033 6.74894 13.4049 6.76963 13.3134 6.80894C13.2219 6.84824 13.1391 6.90538 13.0699 6.97701L9.35741 10.6895L5.64491 6.97701C5.50346 6.84039 5.31401 6.7648 5.11736 6.76651C4.92071 6.76822 4.7326 6.84709 4.59354 6.98615C4.45449 7.1252 4.37561 7.31331 4.3739 7.50996C4.37219 7.70661 4.44779 7.89606 4.58441 8.03751L8.82716 12.2803Z" fill="white" />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-[100] start-0 mt-2 w-62 bg-white rounded-md shadow-lg">
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
                        {(isCompany && window.localStorage.getItem('user') !== null) && <Link to="/company_jobs" className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">Jobs</Link>}

                        {isCompany && <li>
                            <Link to="/old-grantees" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Grantees
                            </Link>
                        </li>}
                        {isCompany && <li>
                            <Link to="/last-subscription" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                Subscription
                            </Link>
                        </li>}
                        <li onClick={handleLogout} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

