import { useLocation, useNavigate } from "react-router";

interface Tab {
    id: number;
    name: string;
    link: string;
}

interface NavigationTabsProps {
    tabs: Tab[];
}

export function NavigationTabs({ tabs }: NavigationTabsProps) {
    const router = useNavigate();
    const pathname = useLocation(); // Get the current route

    const handleTabClick = (link: string) => {
        router(link); // Navigate to the new route
    };

    return (
        <nav className="flex overflow-x-auto scrollbar-hide rounded-[30px] border-b mt-4">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.link)}
                    className={`px-[24px] py-[8px] hover:bg-gray-50 text-nowrap font-medium text-[16px] relative ${pathname.pathname === tab.link
                        ? 'text-black after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#018AAf]'
                        : 'text-[#7E939A]'
                        }`}
                >
                    {tab.name}
                </button>
            ))}
        </nav>
    );
}
