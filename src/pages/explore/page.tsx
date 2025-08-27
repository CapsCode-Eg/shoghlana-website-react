import { useEffect, useState } from "react";
import JobsFilter from "../../components/explore/filter";
import JobsFilterMobile from "../../components/explore/filterMobile";
import TabsForJobs from "../../components/explore/tabsForJobs";
import { useSearchParams } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import Pagination from "../../components/common/pagination/pagination";
import MainLayout from "../../layout/mainLayout";

export default function Explore() {
    const [data, setData] = useState<any>({});
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<any>({});
    const [searchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState<any>({});
    function toSearchParamsString(
        newFilters: Record<string, (string | number)[]>,
        existingParams: URLSearchParams
    ) {
        // Create a new URLSearchParams from existing params
        const params = new URLSearchParams(existingParams);

        // Update with new filter values
        Object.entries(newFilters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length > 0) {
                params.set(key, `[${value.join(',')}]`);
            } else {
                params.delete(key); // Remove if empty
            }
        });

        return params.toString();
    }
    const searchStringToFilters = (params: URLSearchParams) => {
        const parsedFilters: any = {};
        params.forEach((value, key) => {
            // Skip pagination parameter
            if (key === 'page') return;

            try {
                // Check if the value is in array format [value1,value2]
                if (value.startsWith('[') && value.endsWith(']')) {
                    const arrayContent = value.slice(1, -1);
                    parsedFilters[key] = arrayContent ? arrayContent.split(',') : [];
                } else {
                    // For regular parameters, keep them as is
                    parsedFilters[key] = value;
                }
            } catch (err) {
                console.warn(`Could not parse value for ${key}: ${value}`);
                // Keep the original value if parsing fails
                parsedFilters[key] = value;
                return err
            }
        });
        return parsedFilters;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const paramsString = toSearchParamsString(selectedFilters, urlParams);

                const searchValue = urlParams.get('search');
                let decodedSearch = '';
                let res;

                if (searchValue) {
                    try {
                        decodedSearch = decodeURIComponent(searchValue);
                    } catch (e) {
                        console.error('Error decoding search term:', e);
                        decodedSearch = searchValue;
                    }
                }

                if (decodedSearch !== '') {
                    res = await axiosInstance.get(`/jobs?${paramsString}&page=${page}`, {
                        params: {
                            search: decodedSearch
                        }
                    });
                } else {
                    res = await axiosInstance.get(`/jobs?${paramsString}&page=${page}`);
                }
                setData(res.data.data);
                setMeta(res?.data?.data?.links['total-page']);
                setPage(res?.data?.data?.meta?.current_page);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [selectedFilters, page]);

    // Update filters when URL search params change
    useEffect(() => {
        const newFilters = searchStringToFilters(searchParams);
        setSelectedFilters(newFilters);
    }, [searchParams]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [page]);
    return (
        <MainLayout>
            <div className='w-[98%] xl:w-[80%] min-h-[55vh] h-full flex flex-col md:flex-row gap-4 mx-auto my-[20px] xl:my-[54px]'>
                <div className='pt-[60px] hidden lg:block'>
                    <JobsFilter />
                </div>
                <div className='flex flex-col mt-20 md:mt-0 gap-[0px] md:gap-[22.5px] flex-1 h-fit w-full'>
                    <span className='text-[16px] flex flex-row justify-between pe-[20px] md:text-[21px] text-[#1C3042] font-[700] ms-5 lg:ms-0'>
                        Explore New Career Opportunities
                        <div className='lg:hidden block '>
                            <JobsFilterMobile />
                        </div>
                    </span>
                    <TabsForJobs data={data} />
                    {data?.data?.length > 0 &&
                        <Pagination currentPage={page} totalPages={meta || 1} onPageChange={(page: number) => { setPage(page) }}
                        />
                    }
                </div>
            </div>
        </MainLayout>
    );
}