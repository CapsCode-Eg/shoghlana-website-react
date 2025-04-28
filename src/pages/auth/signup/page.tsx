
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import InputAndLabel from "../../../components/input/inputAndLabel";
import { Link } from "react-router";

export default function SignUp() {
    return (
        <div
            className="w-full min-h-screen flex px-30 items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/front-view-office-desk-with-laptop-chair 1.png')" }}
        >
            <div className="w-full flex flex-col xl:flex-row items-center justify-center">
                <div className="w-full md:w-[657px] bg-white p-30 rounded-[32px] flex flex-col items-center  shadow-lg border">
                    <h1 className="w-[409.67px] text-center md:text-start mt-16 mb-4 text-[32px] font-medium text-black">
                        Join us to check out job opportunities!
                    </h1>

                    <form className="space-y-4 flex flex-col items-center max-w-[385px]">
                        <InputAndLabel label="Email" isLogin />
                        <div className="grid grid-cols-2 gap-4">
                            <InputAndLabel label="First name" isLogin />
                            <InputAndLabel label="Last name" isLogin />
                        </div>
                        <InputAndLabel label="Password" isLogin see />

                        <div className="flex-1">
                            <label className="block text-[14px] text-[#84818A]">What job titles are you looking for?</label>
                            <input
                                title="multi select tags"
                                type="text"
                                className="w-[385px] border-b border-[#DCDBDD] focus:outline-none focus:border-black"
                            />
                        </div>

                        <div className="flex w-[349px] items-start gap-5">
                            <input title="agree" type="checkbox" className="mt-1" />
                            <p className="text-[12px] text-[#84818A]">
                                By clicking Create account, I agree that I have read and accepted the Terms of Use Privacy Policy
                            </p>
                        </div>

                        <button className="w-[393px] bg-[#0055D9] text-white py-2 rounded-lg text-md font-medium hover:bg-blue-700 transition">
                            <Link to="/signup-intro" className="text-white font-medium">Start Free Trial</Link>
                        </button>
                    </form>

                    <div className="text-center font-medium text-[14px] mt-3 mb-5">
                        <p className="text-black">
                            Already on Shoghlana? <Link to="/login" className="text-[#0055D9] font-medium">Log in</Link>
                        </p>
                    </div>

                    <div className="border border-[#DCDBDD] mb-2"></div>

                    <p className="text-[12px] text-[#84818A] mt-3 text-center mb-4">
                        Protected by reCAPTCHA and subject to the{" "}
                        <a href="#" className="text-[#0055D9] text-[12px]">Shoghlana Privacy <br /> Policy</a> and{" "}
                        <a href="#" className="text-[#0055D9] text-[12px]">Terms of Service</a>.
                    </p>
                </div>

                <div className="w-1/2 hidden xl:block text-white ps-10 xl:p-[126.5px]">
                    <img width={156.47} height={156.47} src="/assets/logo.png" alt="Logo" className="w-[156.47px] mb-4" />
                    <h2 className="text-[28px]  font-bold">Find the Best Jobs in Egypt</h2>
                    <ul className=" mt-4 space-y-2">
                        <li className="flex items-center gap-2">
                            <IoCheckmarkCircleSharp className="text-white text-[20px]" /> Job hunting made super easy!
                        </li>
                        <li className="flex items-center gap-2">
                            <IoCheckmarkCircleSharp className="text-white text-[20px]" /> Get notified about the coolest job opportunities!
                        </li>
                        <li className="flex items-center gap-2">
                            <IoCheckmarkCircleSharp className="text-white text-[20px]" /> Let the coolest companies find you!
                        </li>
                        <li className="flex items-center gap-2">
                            <IoCheckmarkCircleSharp className="text-white text-[20px]" /> Check out the best jobs and career options for you!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}