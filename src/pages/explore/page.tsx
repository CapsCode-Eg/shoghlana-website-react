import { useEffect, useState } from "react";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import JobsFilter from "../../components/explore/filter";
import JobsFilterMobile from "../../components/explore/filterMobile";
import TabsForJobs from "../../components/explore/tabsForJobs";
import Footer from "../../components/footer/footer";
import axiosInstance from "../../utils/axiosInstance";
import { useSearchParams } from "react-router";

export default function Explore() {
    const [data, setData] = useState<any>({})
    const [searchParams] = useSearchParams();
    const [selectedFilters, setSelectedFilters] = useState<any>({})

    console.log(selectedFilters)
    function toSearchParamsString(obj: Record<string, (string | number)[]>) {
        const params = new URLSearchParams();
        console.log(obj)

        Object.entries(obj).forEach(([key, value]) => {
            params.set(key, JSON.stringify(value));
        });
        return `${params.toString()}`;
    }
    useEffect(() => {
        axiosInstance.get(`/jobs`, { params: toSearchParamsString(selectedFilters) }).then((res) => {
            setData(res.data.data)
        }).catch((err) => {
            console.error(err);
        })
    }, [searchParams])


    useEffect(() => {
        const parsedFilters: { [key: string]: (number | string)[] } = {};

        for (const [key, value] of searchParams.entries()) {
            try {
                const parsedValue = JSON.parse(value); // e.g., "[5]" => [5]
                if (Array.isArray(parsedValue)) {
                    parsedFilters[key] = parsedValue;
                }
            } catch (err) {
                console.warn(`Could not parse value for ${key}: ${value}`);
            }
        }

        setSelectedFilters(prev => ({ ...prev, ...parsedFilters }));
    }, [searchParams]);
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-x-hidden'>
            <NavbarTwo />
            <div className='w-[98%] xl:w-[80%] min-h-[55vh] h-full flex flex-col md:flex-row gap-4 mx-auto my-[20px] xl:my-[54px]'>
                <div className='pt-[60px] hidden  lg:block'><JobsFilter /></div>
                <div className='flex flex-col gap-[0px] md:gap-[22.5px] flex-1 h-fit w-full'>
                    <span className='text-[16px] flex flex-row justify-between pe-[20px] md:text-[21px] text-[#1C3042] font-[700] ms-5 lg:ms-0'>Explore New Career Opportunities
                        <div className='lg:hidden block'><JobsFilterMobile /></div>
                    </span>
                    <TabsForJobs data={data} />
                </div>
            </div>
            <Footer />
        </div>
    )
}
