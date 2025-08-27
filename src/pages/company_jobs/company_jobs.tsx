import { useEffect, useState } from "react";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import Pagination from "../../components/common/pagination/pagination";
import axiosInstance from "../../utils/axiosInstance";
import TabsForJobs from "../../components/explore/tabsForJobs";

export default function CompanyJobs() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<any>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosInstance.get(`/company/jobs-pagination?page=${page}`);
                setData(res.data.data);
                setMeta(res?.data?.data?.links['total-page']);
                setPage(res?.data?.data?.meta?.current_page);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [page]);
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }, [page]);
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <span className='font-[700] text-[28px] mt-4 ms-4'>Jobs</span>
                <TabsForJobs withoutShadow data={data} />
                <Pagination currentPage={page} totalPages={meta || 1} onPageChange={(page: number) => { setPage(page) }}
                />
            </div>
        </div>
    )
}
