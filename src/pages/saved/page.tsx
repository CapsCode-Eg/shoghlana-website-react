import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import Footer from "../../components/footer/footer";
import JobsCard from "../../components/savedJobs/jobsCard/jobsCard";

export default function Saved() {
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className='w-[98%] xl:w-[80%] min-h-[60vh] mx-auto mt-[20px] xl:mt-[54px] '>
                <span className='font-[700] text-[28px] '>(1) Active Saved Job</span>
                <div className='mt-[35px]'>
                    <JobsCard />
                </div>
            </div>
            <Footer />
        </div>
    )
}
