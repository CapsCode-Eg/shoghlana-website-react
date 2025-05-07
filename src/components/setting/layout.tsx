
import { NavigationTabs } from './tabs/tabs'
import { useEffect, useState } from 'react';
import SideMenu from './sideMenu/sideMenu';
import NavbarTwo from '../common/navbarTwo/navbarTwo';
import Footer from '../footer/footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    const userTabs = [
        { id: 1, name: 'General Info', link: '/setting/general-info' },
        { id: 2, name: 'Career Interests', link: '/setting/career-interests' },
        { id: 3, name: 'Education / CV', link: '/setting/education-cv' },
        { id: 4, name: 'Experience', link: '/setting/experience' },
        { id: 5, name: 'Online Presence', link: '/setting/online-presence' },
        { id: 6, name: 'Public Profile', link: '/setting/public-profile' },
    ];
    const companyTabs = [
        { id: 1, name: 'General Info', link: '/setting/general-info' },
        { id: 2, name: 'Change Password', link: '/setting/change-password' },
        { id: 3, name: 'Delete Account', link: '/setting/delete-account' },
    ]
    const [tabs, setTabs] = useState<typeof userTabs | typeof companyTabs>([]);

    useEffect(() => {
        const user = JSON.parse(window.localStorage.getItem('user') || '{}');
        setTabs(user?.type === 'company' ? companyTabs : userTabs);
    }, []);

    return (
        <div className="flex flex-col font-inter overflow-hidden max-w-screen bg-[#f5f5f5]">
            <NavbarTwo />
            <div className="flex flex-col min-h-[60vh] px-20 lg:flex-row w-[95%] xl:w-[80%] mx-auto justify-center xl:justify-between gap-[5px] main-body min-w-screen pb-[27px] pt-[10px] xl:pt-[calc(64px+32px)]">
                <div className="hidden me-3 !w-[clamp(300px,337px,369px)] lg:flex flex-row justify-center relative">
                    <SideMenu />
                </div>
                <div className="w-[100%] scrollbar-hide rounded-[30px] block lg:hidden bg-white">
                    <NavigationTabs
                        tabs={tabs}
                    />
                </div>
                {children}
            </div>
            <Footer />
        </div>
    )
}
