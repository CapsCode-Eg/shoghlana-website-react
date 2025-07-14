import { useParams } from "react-router";
import NavbarTwo from "../../../components/common/navbarTwo/navbarTwo";
import CustomSelectMenu from "../../../components/customeSelectMenu/customSelectMenu";
import InputAndLabel from "../../../components/input/inputAndLabel";
import TextEditor from "../../setting/general-info/components/textEditor";
import ButtonGroup from "../../../components/common/buttonGroup/buttonGroup";
import { useAddJob } from "./hooks/useAddJob";
import { LEVELS, PLACES, TYPES } from "../../../utils/constant/job";
import CustomSelectMultipleMenu from "../../setting/general-info/components/customeMultiSelectMenu";
import QuestionList from "../../../components/questionList/QuestionList";

export default function PostJob() {
    const { func } = useParams();
    const { data, errors, cities, countries, skills, setData, handleSubmit, loading, job_category, jobQuestion } = useAddJob();
    return (
        <div className='flex flex-col max-w-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[24px] pb-8 px-6 flex flex-col bg-white rounded-[24px] shadow-xl ">
                <div className="flex flex-col md:max-w-[81%] md:min-w-[80%] gap-8 mx-auto mt-6 pb-10">
                    <InputAndLabel disabled={func === 'view'} label="Job Title" name="title" type='text' value={data?.title || ""} setData={setData} error={errors?.title} />
                    <div className="grid grid-cols-2 gap-4">
                        <InputAndLabel disabled={func === 'view'} label="Minimum Salary" name="min_salary" type='number' value={data?.min_salary || ""} setData={setData} error={errors?.min_salary} />
                        <InputAndLabel disabled={func === 'view'} label="Maximum Salary" name="max_salary" type='number' value={data?.max_salary || ""} setData={setData} error={errors?.max_salary} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <InputAndLabel disabled={func === 'view'} label="Minimum Years" name="min_year" type='number' value={data?.min_year || ""} setData={setData} error={errors?.min_year} />
                        <InputAndLabel disabled={func === 'view'} label="Maximum Years" name="max_year" type='number' value={data?.max_year || ""} setData={setData} error={errors?.max_year} />
                    </div>
                    <div className="h-[20vh] mb-4">
                        <TextEditor
                            label='Description'
                            value={data?.description}
                            error={errors?.description}
                            onChange={(e) => {
                                setData({ ...data, description: e.target.value });
                            }}
                        />
                    </div>
                    <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.job_category_id && +(data?.job_category_id) || null} label="Job Category" placeholder="Select Job Category" options={job_category} onChange={(value: any) => setData({ ...data, job_category_id: value?.id })} error={errors?.job_category_id} />
                    <div className="grid grid-cols-2 gap-4">
                        <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.country_id && +(data?.country_id) || null} label="Country" placeholder="Select Country" options={countries} onChange={(value: any) => setData({ ...data, country_id: value?.id })} error={errors?.country_id} />
                        <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.city_id && +(data?.city_id) || null} label="City" placeholder="Select City" options={cities} onChange={(value: any) => setData({ ...data, city_id: value?.id })} error={errors?.city_id} />
                    </div>
                    <CustomSelectMultipleMenu
                        isDisabled={func === 'view'}
                        name="skills"
                        defaultData={data?.skills ? data?.skills : []}
                        onChange={(value: any) => setData({ ...data, skills: value })} error={errors?.skills} label="Skills" placeholder="Select Skill" options={skills} />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.post_type && +(data?.post_type) || null} label="Type" placeholder="Select Type" options={TYPES} onChange={(value: any) => setData({ ...data, post_type: value?.id })} error={errors?.post_type} />
                        <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.work_place && +(data?.work_place) || null} label="Work Place" placeholder="Select Work Place" options={PLACES} onChange={(value: any) => setData({ ...data, work_place: value?.id })} error={errors?.work_place} />
                        <CustomSelectMenu isDisabled={func === 'view'} defaultData={data?.level && +(data?.level) || null} label="Experience" placeholder="Select Experience" options={LEVELS} onChange={(value: any) => setData({ ...data, level: value?.id })} error={errors?.level} />
                    </div>
                    <QuestionList setData={setData} data={data} jobQuestion={jobQuestion} />

                    <div className="flex flex-row justify-end w-[100%] pb-10">
                        <ButtonGroup handleSubmit={handleSubmit} isDisabled={loading || func === 'view'} isLoading={loading} />
                    </div>
                </div>
            </div>
        </div>
    )
}
