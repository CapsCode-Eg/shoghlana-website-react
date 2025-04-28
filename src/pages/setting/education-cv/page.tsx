import CustomSelectMenu from "../../../components/customeSelectMenu/customSelectMenu";
import Layout from "../../../components/setting/layout";

export default function Education() {
    return (
        <Layout>
            <div className='w-full bg-white relative z-[2] shadow-2xl mb-20 mx-auto rounded-[25px] pb-[32px] px-[25px] pt-[45px] flex flex-col items-start'>
                <div className="border-b pb-4 mb-4">
                    <button className="text-blue-600 underline">+ Add Cv</button>
                    <p className="text-sm text-gray-600 mt-2">
                        <strong>You last updated your CV on Tuesday, December 24, 2024</strong>.{' '}
                        <span className="text-blue-600 underline cursor-pointer">Preview CV</span> |{' '}
                        <span className="text-red-600 underline cursor-pointer">Delete</span>
                    </p>
                </div>

                <div className="mb-4 w-full">
                    <label className="block text-lg font-medium mb-2">Whats your education level right now?</label>
                    <CustomSelectMenu />
                </div>

                <section className="mb-4 w-full">
                    <h3 className="text-lg font-semibold mb-2">University Degrees</h3>
                    <div className="border w-full rounded-md p-4 bg-[#FCFCFC]">
                        <h4 className="font-medium pb-1 mb-3 w-fit border-b-[1px]  border-black/40">Bachelors Degree in Computer Engineering</h4>
                        <p className="text-sm text-gray-600">Modern Academy for Engineering and Technology (MIA), Egypt 2025 (Expected)</p>
                    </div>
                    <button className="mt-3 text-white bg-main px-3 py-1 rounded-[8px]">+ Add Degree</button>
                </section>

                <section className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">High School</h3>
                    <button className="text-white bg-main px-3 py-1 rounded-[8px]">+ Add High School</button>
                </section>

                <section className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Certifications</h3>
                    <button className="text-white bg-main px-3 py-1 rounded-[8px]">+ Add Certificate</button>
                </section>

                <section>
                    <h3 className="text-lg font-semibold mb-2">Training and Courses</h3>
                    <button className="text-white bg-main px-3 py-1 rounded-[8px]">+ Add Training</button>
                </section>
            </div>
        </Layout>
    )
}
