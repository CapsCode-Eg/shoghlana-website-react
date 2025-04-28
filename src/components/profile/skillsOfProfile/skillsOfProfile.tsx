const SkillsAndExperience = () => {
    return (
        <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px]  flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md relative overflow-hidden py-[33px] px-[28.68px]">
            {/* Skills and Tools */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Skills and tools:</h2>
                <div className="flex flex-wrap gap-2">
                    {['Figma', 'Design', 'Software Engineering', 'Computer Engineering', 'UML', 'UI Design', 'UX Design', 'Adobe Photoshop'].map((skill) => (
                        <span key={skill} className="bg-gray-200 text-sm text-gray-800 px-3 py-1 rounded-lg">
                            {skill}
                        </span>
                    ))}
                </div>
                <button className="text-blue-600 text-sm mt-2">+ Add new skill</button>
            </div>

            {/* Work Experience */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Work Experience</h2>
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                        <p className="font-medium">UI/UX Designer <span className="text-sm bg-gray-200 px-2 py-1 rounded-lg ml-2">Full Time</span></p>
                        <p className="text-sm text-gray-600">Mar 2020 - Present · 3y · Remote</p>
                    </div>
                </div>
                <button className="text-blue-600 text-sm mt-2">+ Add new experience</button>
            </div>

            {/* Education */}
            <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold mb-2">Education</h2>
                <p>Bachelors Degree in Computer Engineering</p>
                <p className="text-sm text-gray-600">Modern Academy for Engineering and Technology (MIS)</p>
                <p className="text-sm text-gray-600">Jan 2023</p>
                <button className="text-blue-600 text-sm mt-2">+ Add education</button>
            </div>

            {/* Languages */}
            <div>
                <h2 className="text-xl font-bold mb-2">Languages</h2>
                <div className="space-y-2">
                    <p>Arabic ★★★★☆ — Fluent</p>
                    <p>English ★★★☆☆ — Intermediate</p>
                </div>
                <button className="text-blue-600 text-sm mt-2">+ Add Languages</button>
            </div>
        </div>
    );
};

export default SkillsAndExperience;
