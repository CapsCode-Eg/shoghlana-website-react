import { useEffect, useState, useMemo } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { LEVELS, TYPES } from '../../utils/constant/job';
import { useSearchParams } from 'react-router';

interface Option {
    id: number | string;
    name: string;
}

interface Filter {
    title: string;
    name: string; // Made name required
    options: Option[];
}

interface SelectedFilters {
    [key: string]: (number | string)[];
}

const INITIAL_VISIBLE_OPTIONS = 3;

export default function JobsFilter() {
    const [countries, setCountries] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [seeMore, setSeeMore] = useState<number>(INITIAL_VISIBLE_OPTIONS);
    const [searchInput, setSearchInput] = useState<string>('');
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        country_ids: [],
        city: [],
        work_places: [],
        levels: [],
        types: []
    });
    const [searchParams, setSearchParams] = useSearchParams();

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countryRes] = await Promise.all([
                    axiosInstance.get('/country')
                ]);
                setCountries(countryRes.data.data.map((item: any) => ({ id: item.id, name: item.name })));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedFilters?.country_ids.length > 0) {
            if (selectedFilters?.country_ids.length > 1) {
                axiosInstance.get(`/get-cities-by-country-ids?ids=[${selectedFilters?.country_ids}]`).then((res) => {
                    setCities(res.data.data.map((item: any) => ({ id: item.id, name: item.name })));
                });
            } else {
                axiosInstance.get(`/get-cities-by-country-ids?ids[]=${selectedFilters.country_ids}`)
                    .then((res) => setCities(res.data.data.map((item: any) => ({ id: item.id, name: item.name }))))
                    .catch(error => console.error('Error fetching cities:', error));
            }
        }
    }, [selectedFilters?.country_ids]);

    const filters: Filter[] = useMemo(() => [
        {
            title: 'Country',
            name: 'country_ids',
            options: countries.map(country => ({ id: +(country.id), name: country.name }))
        },
        {
            title: 'Governance',
            name: 'city_ids',
            options: cities
        },
        {
            name: 'work_places',
            title: 'Work Place',
            options: [
                { id: 1, name: 'On-site' },
                { id: 2, name: 'Remote' },
                { id: 3, name: 'Hybrid' }
            ]
        },
        {
            name: 'levels',
            title: 'Level',
            options: LEVELS
        },
        {
            name: 'types',
            title: 'Types',
            options: TYPES
        }
    ], [countries, cities]);

    const filteredFilters = useMemo(() => {
        if (!searchInput) return filters;

        return filters.map(filter => ({
            ...filter,
            options: filter.options.filter(option =>
                option.name.toLowerCase().includes(searchInput.toLowerCase())
            )
        }));
    }, [filters, searchInput]);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
        setSearchInput('');
    };
    useEffect(() => {
        const params: SelectedFilters = {
            country_ids: [],
            city: [],
            work_places: [],
            levels: [],
            types: []
        };

        // Process all current search parameters
        searchParams.forEach((value, key) => {
            // Skip if not one of our filter keys
            if (!['country_ids', 'city', 'work_places', 'levels', 'types'].includes(key)) {
                return;
            }

            try {
                // Handle array parameters
                if (value.startsWith('[') && value.endsWith(']')) {
                    const arrayContent = value.slice(1, -1);
                    params[key] = arrayContent ? arrayContent.split(',').map(v => {
                        // Convert to number if possible
                        const num = Number(v);
                        return isNaN(num) ? v : num;
                    }) : [];
                } else {
                    // Handle single value parameters
                    const num = Number(value);
                    params[key] = isNaN(num) ? [value] : [num];
                }
            } catch (err) {
                console.warn(`Error parsing parameter ${key}=${value}`, err);
            }
        });

        setSelectedFilters(params);
    }, [searchParams]);

    const handleFilterChange = (filterName: string, optionId: number | string) => {
        setSelectedFilters(prev => {
            const currentSelection = prev[filterName] || [];
            const newSelection = currentSelection.includes(optionId)
                ? currentSelection.filter(id => id !== optionId)
                : [...currentSelection, optionId];

            // Create new URLSearchParams from current URL
            const newSearchParams = new URLSearchParams(window.location.search);

            // Update the specific filter parameter
            if (newSelection.length > 0) {
                newSearchParams.set(filterName, `[${newSelection.join(',')}]`);
            } else {
                newSearchParams.delete(filterName);
            }

            // Update URL and state
            setSearchParams(newSearchParams);
            window.history.replaceState(null, '', `?${newSearchParams.toString()}`);

            return {
                ...prev,
                [filterName]: newSelection
            };
        });
    };
    return (
        <div className="w-[260px] bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-blue-600 p-4">Jobs Filter</h2>
            <ul className="space-y-2">
                {filteredFilters.map((filter, index) => (
                    <li key={filter.title} className="border-b">
                        <button
                            type="button"
                            className="flex justify-between items-center w-full py-2 px-4 cursor-pointer"
                            onClick={() => toggleAccordion(index)}
                        >
                            <span className="text-gray-700">{filter.title}</span>
                            <svg className={`${openIndex === index ? 'rotate-90' : 'rotate-0'} duration-500 transition-all`}
                                width="7" height="18" viewBox="0 0 7 18" fill="none">
                                <path d="M0.382045 5.68286C0.317871 5.74703 0.285784 5.82083 0.285784 5.90426C0.285784 5.98769 0.317871 6.06149 0.382045 6.12566L4.16511 9.90873L0.382045 13.6918C0.317871 13.756 0.285784 13.8298 0.285784 13.9132C0.285784 13.9966 0.317871 14.0704 0.382045 14.1346L0.863351 14.6159C0.927525 14.6801 1.00133 14.7122 1.08475 14.7122C1.16818 14.7122 1.24198 14.6801 1.30615 14.6159L5.79192 10.1301C5.8561 10.066 5.88818 9.99215 5.88818 9.90873C5.88818 9.8253 5.8561 9.7515 5.79192 9.68733L1.30615 5.20155C1.24198 5.13738 1.16818 5.10529 1.08475 5.10529C1.00133 5.10529 0.927525 5.13738 0.863351 5.20155L0.382045 5.68286Z" fill="#B2AAAA" />
                            </svg>
                        </button>
                        {openIndex === index && (
                            <div className="py-2 px-4 bg-[#f6f6f6]">
                                <ul>
                                    {filter.options.slice(0, seeMore).map((option: any) => {
                                        return (
                                            <li key={`${filter.name}-${option.id}`} className="flex items-center justify-between px-3 py-1">
                                                <label htmlFor={`${filter.name}-${option.id}`} className="text-gray-600 cursor-pointer">
                                                    {typeof option.name === 'string' ? option.name : option.name?.name}
                                                </label>
                                                <input
                                                    type="checkbox"
                                                    id={`${filter.name}-${option.id}`}
                                                    name={filter.name}
                                                    value={option.id}
                                                    checked={selectedFilters[filter.name]?.includes(+(option.id))}
                                                    onChange={() => handleFilterChange(filter.name, option.id)}
                                                    className="cursor-pointer"
                                                />
                                            </li>
                                        );
                                    })}
                                    {filter.options.length > INITIAL_VISIBLE_OPTIONS && (
                                        <li
                                            className="text-blue-600 py-1 cursor-pointer"
                                            onClick={() =>
                                                seeMore > INITIAL_VISIBLE_OPTIONS
                                                    ? setSeeMore(INITIAL_VISIBLE_OPTIONS)
                                                    : setSeeMore(filter.options.length)
                                            }
                                        >
                                            {seeMore > INITIAL_VISIBLE_OPTIONS ? "See Less" : "See More"}
                                        </li>
                                    )}
                                </ul>
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    placeholder={`Search ${filter.title}`}
                                    className="w-full border-[1px] p-1 rounded-[5px] ps-2 border-[#DCDBDD] focus:outline-none focus:border-black"
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}