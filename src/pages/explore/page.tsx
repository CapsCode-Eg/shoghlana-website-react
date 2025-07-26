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

    function toSearchParamsString(obj: Record<string, (string | number)[]>) {
        const paramsArray = Object.entries(obj).map(
            ([key, value]) => `${key}=[${value.join(',')}]`
        );

        const paramsString = paramsArray.join('&');
        return paramsString;
    }
    // Fetch data when selectedFilters change
    const searchStringToFilters = (params: URLSearchParams) => {
        const parsedFilters: any = {};
        params.forEach((value, key) => {
            try {
                const parsedValue = JSON.parse(value);
                if (Array.isArray(parsedValue)) {
                    parsedFilters[key] = parsedValue;
                }
            } catch (err) {
                console.warn(`Could not parse value for ${key}: ${value}`);
                console.error(err);
            }
        });
        return parsedFilters;
    };

    // Fetch data whenever filters change
    useEffect(() => {
        const fetchData = async () => {
            try {
                const paramsString = toSearchParamsString(selectedFilters);
                const res = await axiosInstance.get(`/jobs?${paramsString}&page=${page}`);
                setData(res.data.data);
                setMeta(res?.data?.data?.links['total-page']);
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

    return (
        <MainLayout>
            <div className='w-[98%] xl:w-[80%] min-h-[55vh] h-full flex flex-col md:flex-row gap-4 mx-auto my-[20px] xl:my-[54px]'>
                <div className='pt-[60px] hidden lg:block'>
                    <JobsFilter />
                </div>
                <div className='flex flex-col gap-[0px] md:gap-[22.5px] flex-1 h-fit w-full'>
                    <span className='text-[16px] flex flex-row justify-between pe-[20px] md:text-[21px] text-[#1C3042] font-[700] ms-5 lg:ms-0'>
                        Explore New Career Opportunities
                        <div className='lg:hidden block'>
                            <JobsFilterMobile />
                        </div>
                    </span>
                    <TabsForJobs data={data} />
                    <Pagination currentPage={meta?.current_page} totalPages={meta || 1} onPageChange={(page: number) => { setPage(page) }}
                    />
                </div>
            </div>
        </MainLayout>
    );
}