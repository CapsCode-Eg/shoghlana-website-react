import CustomSelectMenu from "../../../components/customeSelectMenu/customSelectMenu";
import Layout from "../../../components/setting/layout";

export default function ExperiencePage() {
    return (
        <Layout>
            <div className='w-full  relative z-[2] mb-20 mx-auto rounded-[25px] pb-[32px] px-[25px] gap-[20px] flex flex-col items-start'>
                {/* Years of Experience */}
                <div className="border w-full bg-white  p-4 rounded-lg shadow-sm">
                    <label className="block text-lg font-medium mb-2">How many years of experience do you have?</label>
                    <CustomSelectMenu options={[{ id: 1, name: "0-2 years" }, { id: 2, name: "2-5 years" }, { id: 3, name: "5-10 years" }, { id: 4, name: "10+ years" }]} />
                </div>

                {/* Work Experience */}
                <div className="border  w-full bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Work Experience</h2>
                        <button className="text-blue-600">+ Add new experience</button>
                    </div>
                    <div className="p-4 border rounded-md mb-2 flex flex-row items-center">
                        <img src="https://images.unsplash.com/photo-1556742504-16b083241fab?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className='w-[60px] object-cover rounded-[10px] h-[60px]' />
                        <div className='flex flex-col ms-4'>
                            <h3 className="font-medium">UI/UX Designer <span className="text-sm text-gray-500 border px-2 rounded">Full Time</span></h3>
                            <p className="text-sm text-gray-600">TransIT</p>
                            <p className="text-sm text-gray-500">Mar 2023 - Present · 1 yr, 9 months</p>
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <div className="border  w-full bg-white p-4 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-2">Skills, Tools & Technologies</h2>
                    <p className="text-sm text-gray-500 mb-4">Add up to 30</p>
                    {['Figma', 'Design', 'Software Engineering', 'Computer Engineering', 'UI/UX', 'UI Design', 'UX Design', 'Adobe Photoshop'].map((skill) => (
                        <div key={skill} className="flex justify-between items-center max-w-[300px] p-2 border rounded-md mb-2">
                            <span>{skill}</span>
                            <button className="text-gray-500">✕</button>
                        </div>
                    ))}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add Skill</button>
                </div>

                {/* Languages */}
                <div className="border p-4  w-full bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold mb-2">Languages</h2>
                    <p className="text-sm text-gray-500 mb-4">You can add more than one</p>
                    {['Arabic', 'English'].map((language) => (
                        <div key={language} className="border flex fle-row items-center rounded-md p-4 mb-2">
                            <h3 className="font-medium mb-2">{language}</h3>
                            <div className="grid w-full grid-cols-5 gap-2 text-sm">
                                {['Reading', 'Writing', 'Listening', 'Speaking'].map((skill) => (
                                    <div key={skill} className="flex flex-col items-center">
                                        <p>{skill}</p>
                                        <p className="text-yellow-500">★★★★★</p>
                                        <p className="text-gray-500 text-xs">Fluent</p>
                                    </div>
                                ))}
                            </div>
                            <div className='flex flex-col justify-between gap-4'>
                                <button title='Edit Language' >
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.35938 14.962V18.087H6.48438L15.701 8.87033L12.576 5.74533L3.35938 14.962ZM18.1177 6.45366C18.195 6.37657 18.2562 6.285 18.2981 6.18418C18.3399 6.08337 18.3614 5.9753 18.3614 5.86616C18.3614 5.75702 18.3399 5.64896 18.2981 5.54814C18.2562 5.44733 18.195 5.35576 18.1177 5.27866L16.1677 3.32866C16.0906 3.25141 15.999 3.19012 15.8982 3.1483C15.7974 3.10649 15.6893 3.08496 15.5802 3.08496C15.4711 3.08496 15.363 3.10649 15.2622 3.1483C15.1614 3.19012 15.0698 3.25141 14.9927 3.32866L13.4677 4.85366L16.5927 7.97866L18.1177 6.45366Z" fill="#A6B0C0" />
                                    </svg>
                                </button>
                                <button title='Delete Language'>
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.8594 3.08691C6.71187 3.08691 3.35938 6.43941 3.35938 10.5869C3.35938 14.7344 6.71187 18.0869 10.8594 18.0869C15.0069 18.0869 18.3594 14.7344 18.3594 10.5869C18.3594 6.43941 15.0069 3.08691 10.8594 3.08691ZM14.6094 13.2794L13.5519 14.3369L10.8594 11.6444L8.16687 14.3369L7.10938 13.2794L9.80187 10.5869L7.10938 7.89441L8.16687 6.83691L10.8594 9.52941L13.5519 6.83691L14.6094 7.89441L11.9169 10.5869L14.6094 13.2794Z" fill="#A6B0C0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">+ Add Language</button>
                </div>
            </div>
        </Layout>
    )
}
