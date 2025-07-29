
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import InputAndLabel from "../../../components/input/inputAndLabel";
import { Link } from "react-router";
import { useState } from "react";
import { userSchema } from "./validation/userSchema";
import { HttpMethod, useApi } from "../../../utils/hooks/useApi";

export default function SignUp() {
    const [data, setData] = useState<{
        email?: string,
        first_name?: string,
        last_name?: string,
        password?: string,
        terms_and_conditions?: boolean | null
    }>({
        email: '',
        first_name: '',
        last_name: '',
        password: '',
        terms_and_conditions: null,
    })

    const { fetchData, errors, loading } = useApi({
        endPoint: "user/register",
        method: HttpMethod.POST,
        payload: data,
        toast_message: 'Sign up Successfully',
        validation: userSchema,
        navigateTo: '/login'
    })

    return (
        <div
            className="w-full min-h-screen flex sm:px-30 items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/front-view-office-desk-with-laptop-chair 1.png')" }}
        >
            <div className="w-full flex flex-col xl:flex-row items-center justify-center px-4">
                <div className="w-full md:w-[657px] bg-white p-3 md:p-30 rounded-[32px] flex flex-col  items-center  shadow-lg border">
                    <h1 className="w-full md:w-[409.67px] text-center md:text-start mt-4 md:mt-16 mb-4 text-[32px]  font-medium text-black">
                        Join us to check out job opportunities!
                    </h1>

                    <form className="space-y-4 flex flex-col items-center max-w-full md:max-w-[385px]">
                        <InputAndLabel name='email' setData={setData} error={errors?.email} type="email" value={data.email || ""} isLogin label="Email" placeholder="Shoghlana@email.com" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <InputAndLabel name='first_name' setData={setData} error={errors?.first_name} type="text" value={data.first_name || ""} isLogin label="First Name" placeholder="Ahmed" />
                            <InputAndLabel name='last_name' setData={setData} error={errors?.last_name} type="text" value={data.last_name || ""} isLogin label="Last Name" placeholder="Mohamed" />
                        </div>
                        <InputAndLabel see name='password' setData={setData} error={errors?.password} type="password" value={data.password || ""} isLogin label="Password" placeholder="Password" />

                        <div className="flex flex-col  w-full md:w-[349px] items-start gap-1">
                            <div className="flex items-start gap-5">
                                <input onChange={(e) => setData({ ...data, terms_and_conditions: e.target.checked })} title="agree" type="checkbox" className="mt-1" required />
                                <p className="text-[12px] text-[#84818A]">
                                    By clicking Create account, I agree that I have read and accepted the Terms of Use Privacy Policy
                                </p>
                            </div>
                            <span className="text-[#FF0000] text-[12px]">{errors?.terms_and_conditions}</span>
                        </div>


                        <button
                            type="button"
                            onClick={fetchData}
                            disabled={loading}
                            className="w-full md:w-[393px] bg-[#0055D9] text-white py-2 rounded-lg text-md font-medium hover:bg-blue-700 transition">
                            {loading &&
                                <span className="flex w-full items-center justify-center h-full">
                                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                </span>
                            }
                            {!loading && <span className="text-white font-medium">Start Now</span>}
                        </button>
                    </form>

                    <div className="text-center font-medium text-[14px] mt-3 mb-5">
                        <p className="text-black">
                            Already on Shoghlana? <Link to="/login" className="text-[#0055D9] font-medium">Log in</Link>
                        </p>
                    </div>

                    <div className="border border-[#DCDBDD] mb-2"></div>

                    {/* <p className="text-[12px] text-[#84818A] mt-3 text-center mb-4">
                        Protected by reCAPTCHA and subject to the{" "}
                        <a href="#" className="text-[#0055D9] text-[12px]">Shoghlana Privacy <br /> Policy</a> and{" "}
                        <a href="#" className="text-[#0055D9] text-[12px]">Terms of Service</a>.
                    </p> */}
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