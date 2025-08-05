import { useState } from 'react';

type TabType = 'all' | 'pending' | 'accepted' | 'rejected' | 'inConsider';

export default function ResponsiveTabs({ setSelected }: any) {
    const [activeTab, setActiveTab] = useState<TabType>('all');

    const tabs: { id: TabType; label: string }[] = [
        { id: 'all', label: 'All' },
        { id: 'pending', label: 'Pending' },
        { id: 'accepted', label: 'Accepted' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'inConsider', label: 'In Consider' },
    ];

    return (
        <div className="w-full">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => { setActiveTab(tab.id); setSelected(tab.id) }}
                                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile Dropdown */}
            <div className="md:hidden">
                <select
                    title='tab'
                    value={activeTab}
                    onChange={(e) => { setActiveTab(e.target.value as TabType); setSelected(e.target.value as TabType) }}
                    className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 mt-3 text-blue-600 focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                    {tabs.map((tab) => (
                        <option className='text-black' key={tab.id} value={tab.id}>
                            {tab.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

