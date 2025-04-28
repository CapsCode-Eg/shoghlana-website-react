import { useEffect, useState } from 'react';

export default function JobsFilter() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [seeMore, setSeeMore] = useState<number>(3);
    const [searchInput, setSearchInput] = useState<string>('');
    const [filteredArray, setFilteredArray] = useState<{
        title: string;
        options: string[];
    }[]>([]);
    const filters = [
        { title: 'Country', options: ['Egypt', 'Saudi Arabia', 'Libya', 'United Arab Emirates'] },
        { title: 'Governance', options: ['Cairo', 'Giza', 'Alexandria', 'Sharqia'] },
        { title: 'Region', options: ['6th of October', 'Nasr City', 'Fifth Settlement', 'New Cairo'] },
        { title: 'Educational Level', options: ['Not required', 'Illiterate', 'Literacy', 'Primary'] },
        { title: 'Field', options: ['Marketing and Sales', 'Administrative Work', 'Finance and Legal'] },
        { title: 'Specialization', options: ['Sales & Distribution', 'Accounts', 'Internal Sales'] },
        { title: 'Type', options: ['Males', 'Females'] },
        { title: 'Special Needs', options: ['Mild Physical Disability', 'Use of Crutches'] },
        { title: 'Driver’s License', options: ['Yes', 'No'] },
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
        setSearchInput(''); // Reset search input when toggling
    };

    useEffect(() => {
        if (searchInput !== '') {
            setFilteredArray(filters.map(filter => ({
                ...filter,
                options: filter.options.filter(option => option.toLowerCase().includes(searchInput.toLowerCase()))
            })));
        } else {
            setFilteredArray(filters);
        }
    }, [searchInput]);

    return (
        <div className="w-[260px] bg-white rounded-lg shadow-md ">
            <h2 className="text-lg font-bold text-blue-600 p-4">Jobs Filter</h2>
            <ul className="space-y-2">
                {filteredArray.map((filter: { title: string; options: string[] }, index: number) => (
                    <li key={filter.title} className="border-b">
                        <div
                            className="flex justify-between items-center py-2 px-4 cursor-pointer"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="text-gray-700">{filter.title}</span>
                            <svg className={`${openIndex === index ? 'rotate-90' : 'rotate-0'} duration-500 transition-all`} width="7" height="18" viewBox="0 0 7 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.382045 5.68286C0.317871 5.74703 0.285784 5.82083 0.285784 5.90426C0.285784 5.98769 0.317871 6.06149 0.382045 6.12566L4.16511 9.90873L0.382045 13.6918C0.317871 13.756 0.285784 13.8298 0.285784 13.9132C0.285784 13.9966 0.317871 14.0704 0.382045 14.1346L0.863351 14.6159C0.927525 14.6801 1.00133 14.7122 1.08475 14.7122C1.16818 14.7122 1.24198 14.6801 1.30615 14.6159L5.79192 10.1301C5.8561 10.066 5.88818 9.99215 5.88818 9.90873C5.88818 9.8253 5.8561 9.7515 5.79192 9.68733L1.30615 5.20155C1.24198 5.13738 1.16818 5.10529 1.08475 5.10529C1.00133 5.10529 0.927525 5.13738 0.863351 5.20155L0.382045 5.68286Z" fill="#B2AAAA" />
                            </svg>
                        </div>
                        {openIndex === index && (
                            <ul className="py-2 px-4 bg-[#f6f6f6]">
                                {filter.options.slice(0, seeMore).map((option: string) => (
                                    <li key={option} className="text-gray-600  w-full flex flex-row items-center justify-between px-3 py-1">
                                        <span>{option}</span>
                                        <input title='option' type="checkbox" name={option} id="" />
                                    </li>
                                ))}
                                {filter.options.length > seeMore && (
                                    <li className="text-blue-600 py-1 cursor-pointer" onClick={() => setSeeMore(filter.options.length)}>
                                        See More
                                    </li>
                                )}
                                {filter.options.length <= seeMore && (
                                    <li className="text-blue-600 py-1 cursor-pointer" onClick={() => setSeeMore(3)}>
                                        See Less
                                    </li>
                                )}
                                <li>
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder={`Search ${filter.title}`}
                                        className='w-full border-[1px] p-1 rounded-[5px] ps-2 border-[#DCDBDD] focus:outline-none focus:border-black'
                                    />
                                </li>
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}