import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import Footer from "../../components/footer/footer";
import JobsCard from "../../components/savedJobs/jobsCard/jobsCard";

export default function Applications() {
    return (
        <div className='flex flex-col max-w-screen overflow-hidden'>
            <NavbarTwo />
            <div className='w-[98%] xl:w-[80%] min-h-[60vh] mx-auto mt-[20px] xl:mt-[54px] '>
                <span className='font-[700] text-[28px] '>Applications</span>
                <div className='mt-[35px] space-y-4'>
                    <JobsCard isDone isAccepted />
                    <JobsCard isDone />
                </div>
            </div>
            <Footer />
        </div>
    )
}
