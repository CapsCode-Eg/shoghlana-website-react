import InputAndLabel from "../../../components/input/inputAndLabel";
import Layout from "../../../components/setting/layout";
import CustomSelectMultipleMenu from "../general-info/components/customeMultiSelectMenu";


export default function CareerInteresting() {
    // const jobTypes = [
    //     "Full Time",
    //     "Part Time",
    //     "Freelance / Project",
    //     "Internship",
    //     "Shift Based",
    //     "Volunteering",
    //     "Student Activity",
    // ];

    // const workplaceSettings = ["On-Site", "Remote", "Hybrid"];

    // const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
    // const [selectedWorkplaces, setSelectedWorkplaces] = useState<string[]>([]);

    // const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    //     setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
    // };

    return (
        <Layout>
            <div className='w-full bg-white relative z-[2] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] ps-[25px] pt-[45px] flex flex-col items-start'>
                <div className='flex flex-col w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s your current career level ?</span>
                    <CustomSelectMultipleMenu options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} />
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What type(s) of job are you open to? <span className='text-[12px]'>(you can choose more than one more job type)</span></span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {/* {jobTypes.map((job) => (
                            <button
                                key={job}
                                className={`px-3 py-1 border rounded-md ${selectedJobs.includes(job)
                                    ? "bg-main text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                onClick={() => toggleSelection(job, selectedJobs, setSelectedJobs)}
                            >
                                {job}
                            </button>
                        ))} */}
                    </div>
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s your preferred workplace settings? <span className='text-[12px]'>(you can choose more than one Workplace setting)</span></span>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {/* {workplaceSettings.map((setting) => (
                            <button
                                key={setting}
                                className={`px-3 py-1 border rounded-md ${selectedWorkplaces.includes(setting)
                                    ? "bg-main text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                onClick={() => toggleSelection(setting, selectedWorkplaces, setSelectedWorkplaces)}
                            >
                                {setting}
                            </button>
                        ))} */}
                    </div>
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`re the job titles that describe what you`re looking for?<span className='text-[12px]'>(Add up to 10)</span></span>
                    <CustomSelectMultipleMenu options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} />

                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What job categories are you interested in?<span className='text-[12px]'>Add 1 or more.</span></span>
                    <CustomSelectMultipleMenu options={[{ id: 1, name: "Beginner" }, { id: 2, name: "Intermediate" }, { id: 3, name: "Advanced" }]} />
                </div>
                <div className='flex flex-col pt-[26px] mt-[26px] border-t-[1px] border-gray-200 border-dashed w-[calc(100%-50px)]'>
                    <span className='font-medium text-[24px] mb-3 text-black'>What`s the minimum salary you would accept?<span className='text-[12px]'> Add a net  salary</span></span>
                    <div className='flex flex-col sm:flex-row items-start sm:items-center w-[100%] sm:w-[70%] gap-4'>
                        <div className='w-[80%] sm:w-[50%] flex flex-row items-start sm:items-center'>
                            <InputAndLabel />
                        </div>
                        <span>Egypt Pound (EGP / Month)</span>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
