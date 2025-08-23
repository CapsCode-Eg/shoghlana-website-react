import { useEffect, useState } from "react";
import Layout from "../../../components/setting/layout";
import axiosInstance from "../../../utils/axiosInstance";
import CustomSelectMultipleMenu from "../general-info/components/customeMultiSelectMenu";
import LanguageManager from "../../../components/languageManager/languageManager";
import ExperienceHandler from "../../../components/experienceHandler/ExperienceHandler";


export default function ExperiencePage() {
    const [skills, setSkills] = useState<any>([])
    const [arrayOfSkills, setArrayOfSkills] = useState<any>([])
    const [arrayOfLanguage, setArrayOfLanguage] = useState<any>([])
    const [experience, setExperience] = useState<any>([])
    const [job_category, setJobCategory] = useState([])

    useEffect(() => {
        axiosInstance.get(`/skills`).then((res) => {
            setSkills(res.data.data)
        })
        axiosInstance.get('/user-profile').then((res) => {
            setArrayOfSkills(res?.data?.data?.skills)
            setArrayOfLanguage(res?.data?.data?.languages)
            setExperience(res?.data?.data?.experience.map((item: any) => {
                return {
                    ...item,
                    job_category_id: item.job_category
                }
            }))
        })
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])

    const deleteSkills = (id: any) => {
        axiosInstance.delete(`/user-skills/${id}`).then((res) => {
            setArrayOfSkills(res?.data?.data?.skills)
        })
    }
    return (
        <Layout>
            <div className='w-full  relative z-[2] mb-20 mx-auto rounded-[25px] pb-[32px] px-[25px] gap-[20px] flex flex-col items-start'>
                {/* Years of Experience */}
                <div className="  w-full bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-8">Experience</h2>
                    <ExperienceHandler job_category={job_category} setExperience={setExperience} experience={experience} />
                </div>

                {/* Skills */}
                <div className="  w-full bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-2">Skills, Tools & Technologies</h2>
                    <CustomSelectMultipleMenu noValue defaultData={[]} options={skills} onChange={(e) => {
                        axiosInstance.post('/user-skills', {
                            skill_id: e[0]
                        }).then((res) => {
                            setArrayOfSkills(res?.data?.data?.skills)
                        })
                    }} />
                    <p className="text-sm text-gray-500 mt-4 mb-2 ms-3">Add up to 30</p>
                    <div className="flex gap-2 flex-row">
                        {arrayOfSkills.map((skill, index) => (
                            <div key={index} className="flex justify-between gap-3 items-center max-w-[300px] p-2 shadow-2xl border-[1px] border-[#525252]/20 rounded-xl mb-2">
                                <span>{skill.name}</span>
                                <button type="button" onClick={() => deleteSkills(skill.id)} className="text-gray-500">✕</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className=" p-4  w-full bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-2">Languages</h2>
                    <p className="text-sm text-gray-500 mb-4">You can add more than one</p>
                    <LanguageManager languages={arrayOfLanguage} setLanguages={setArrayOfLanguage} />
                </div>
            </div>
        </Layout>
    )
}
