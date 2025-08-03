import { Link } from "react-router";
import InputAndLabel from "../../../components/input/inputAndLabel";
import { useLogin } from "../login/hooks/useLogin";


export default function LoginAsCompany() {
    const { handleLogin, errors, data, setData, loading } = useLogin();

    return (
        <div
            className="w-full min-h-screen flex items-center justify-center flex-wrap overflow-hidden px-1.5  py-10 bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/front-view-office-desk-with-laptop-chair 1.png')" }}
        >
            <div className="w-full flex flex-col-reverse xl:flex-row items-center justify-center xl:justify-between gap-10">
                <div className="w-full md:w-[657px] bg-white ms-0 md:ms-10 3xl:ms-40 px-5 md:px-16 pt-16 rounded-[32px] shadow-xl border">
                    <h1 className=" text-[#202020] w-[340px] text-[30px] md:text-[40.36px] p-0 md:p-8 font-bold text-center mb-10 md:mb-0 md:text-start">Log in, buddy!</h1>

                    <form className="space-y-4 px-0 md:px-10">
                        <InputAndLabel name='email' setData={setData} error={errors?.email} type="email" value={data.email || ""} isLogin label="Email" placeholder="Shoghlana@email.com" />
                        <InputAndLabel see name='password' setData={setData} error={errors?.password} type="password" value={data.password || ""} isLogin label="Password" placeholder="Password" />

                        <button
                            type='button'
                            title='Submit'
                            onClick={handleLogin} disabled={loading} className="w-full md:w-[440.61px] bg-main text-white py-3 rounded-lg text-[15.7px] font-medium mb-6">
                            Sign In
                        </button>
                    </form>

                    <div className="text-center my-4">
                        <Link to="/contact-us" className="text-[#0055D9] text-[15.7px]">Forgot Password?</Link>
                    </div>

                    <div className="text-center mt-3 text-[#202020] text-[15.7px] mb-16 max-w-[75%] mx-auto">
                        New Company to Shoghlana? <Link to="/signup-as-company" className="text-[#0055D9] text-[15.7px]">Start your account as company</Link>
                    </div>

                    {/* <p className="text-xs text-[#84818A] text-13.45px mt-6 text-center mb-10">
                        Protected by reCAPTCHA and subject to the <a href="#" className="text-[#0055D9]">Privacy <br /> Policy</a> and <a href="#" className="text-[#0055D9]">Terms of Service</a>.
                    </p> */}
                </div>

                <div className="w-fit 2xl:w-1/2 text-white text-center hidden md:block xl:text-start p-8">
                    <img width={200} height={200} src="/assets/logo.png" alt="Logo" className="w-[156.47px] mb-4 mx-auto xl:mx-0" />
                    <h2 className="text-[32px] 3xl:text-[48px] max-w-[667.11px] font-semibold">Check out the coolest job opportunities in Egypt and<br /> the MENA area!</h2>
                    <p className="mt-4 text-[14px] w-[430.4px] mx-auto xl:mx-0 text-sm text-white">Looking for job openings and career options? Shoghlana’s <br /> got your back in your job hunt in Egypt!</p>
                    <div className="mt-4 flex items-center justify-center xl:justify-start">
                        <div className="flex -space-x-2">
                            <img width={32} height={32} src="/assets/Oval.png" alt='Oval' className="w-[32px]  rounded-full border border-white " />
                            <img width={32} height={32} src="/assets/Oval (1).png" alt='Oval' className="w-[32px] rounded-full border border-white" />
                            <img width={32} height={32} src="/assets/Oval (2).png" alt='Oval' className="w-[32px] rounded-full border border-white" />
                        </div>
                        <p className="ml-3 text-[14px] font-medium">3k+ people joined us, now it`s your turn</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
