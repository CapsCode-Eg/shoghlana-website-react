import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import JobsFilter from "../../components/explore/filter";
import JobsFilterMobile from "../../components/explore/filterMobile";
import TabsForJobs from "../../components/explore/tabsForJobs";
import Footer from "../../components/footer/footer";

export default function Explore() {
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-x-hidden'>
            <NavbarTwo />
            <div className='w-[98%] xl:w-[80%] min-h-[55vh] h-full flex flex-col md:flex-row gap-4 mx-auto my-[20px] xl:my-[54px]'>
                <div className='pt-[60px] hidden  lg:block'><JobsFilter /></div>
                <div className='flex flex-col gap-[0px] md:gap-[22.5px] flex-1 h-fit w-full'>
                    <span className='text-[16px] flex flex-row justify-between pe-[20px] md:text-[21px] text-[#1C3042] font-[700] ms-5 lg:ms-0'>Explore New Career Opportunities
                        <div className='lg:hidden block'><JobsFilterMobile /></div>
                    </span>
                    <TabsForJobs />
                </div>
            </div>
            <Footer />
        </div>
    )
}
