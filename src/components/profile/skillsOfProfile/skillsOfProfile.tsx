import { educationLevels, languageLevels } from "../../../utils/constant/profile";

export function SkillsAndExperience({ userData }: { userData: any }) {
    return (
        <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px]  flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md relative overflow-hidden py-[33px] px-[28.68px]">
            {/* Skills and Tools */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Skills and tools:</h2>
                <div className="flex flex-wrap gap-2">
                    {userData?.skills?.map((skill) => (
                        <span key={skill.id} className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-lg">
                            {skill.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Work Experience */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Work Experience</h2>
                {
                    userData?.experience?.length > 0 ? (
                        userData.experience.map((exp: any, index: number) => {
                            return (
                                (
                                    <div className="flex items-center space-x-4">
                                        <div className="w-5 h-5 bg-gray-300 rounded-full text-white font-bold flex items-center justify-center text-[13px]">{index + 1}</div>
                                        <div>
                                            <p className="font-medium">{exp.job_title} at {exp.company} <span className="text-sm bg-gray-200 px-2 py-1 rounded-lg ml-2">Full Time</span></p>
                                            <p className="text-sm text-gray-600">{exp?.start_year} - {exp?.still_working === 1 ? 'Present' : exp?.end_year} · {exp?.end_year - exp?.start_year}y · Remote</p>
                                        </div>
                                    </div>
                                )
                            )
                        })
                    ) : (
                        <p className="text-gray-600">No work experience added yet.</p>
                    )
                }
            </div>

            {/* Education */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Education</h2>
                <p>{educationLevels.find((level: any) => level.id == userData?.education?.education_level)?.name} in {userData?.education?.field_of_study}</p>
                <p className="text-sm text-gray-600">{userData?.education?.university} </p>
                <p className="text-sm text-gray-600 mt-1">({userData?.education?.graduation_year})</p>
            </div>

            {/* Languages */}
            <div>
                <h2 className="text-xl font-bold mb-2">Languages</h2>
                {
                    userData?.languages?.length > 0 ? (
                        userData.languages.map((lang: any) => (
                            <div key={lang.id} className="space-y-2">
                                <p>{lang.language} - {languageLevels.find((level) => level.id === lang.level)?.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">No languages added yet.</p>
                    )
                }
                {/* <div className="space-y-2">
                    <p>Arabic ★★★★☆ — Fluent</p>
                    <p>English ★★★☆☆ — Intermediate</p>
                </div> */}
            </div>
        </div>
    );
};

