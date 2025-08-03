import { useEffect, useState } from "react";
import MainLayout from "../../layout/mainLayout";
import { HttpMethod, useApi } from "../../utils/hooks/useApi";

const ContactSection = () => {
    const { fetchData } = useApi({
        endPoint: "home",
        method: HttpMethod.GET,
        withOutToast: true
    })
    const [home, setHome] = useState<any>({})

    const handleFetchData = async () => {
        const res = await fetchData()
        if (res?.data) {
            setHome(res?.data?.data)
        }
    }
    useEffect(() => {
        handleFetchData()

    }, [])
    return (
        <MainLayout>
            <section className="w-full text-white">
                {/* Banner */}
                <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
                    <img
                        src="https://images.unsplash.com/photo-1559030623-0226b1241edd?q=80&w=2062&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image path
                        alt="Contact Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-semibold">Contact us easily at any time</h1>
                        <p className="mt-4 text-sm md:text-base max-w-xl">
                            Our team is ready to respond to your inquiries and provide the support you need
                        </p>
                    </div>
                </div>

                {/* Second Section */}
                <div className="bg-white text-black px-4 py-10 md:py-16">
                    <div className="max-w-6xl mx-auto text-center">
                        <h2 className="text-2xl md:text-4xl font-bold">
                            Contact us easily at <span className="text-blue-600">any time</span>
                        </h2>
                        <p className="mt-4 text-gray-700">
                            Our team is ready to respond to your inquiries and provide the support you need
                        </p>
                        <p className="mt-2 text-blue-600 font-medium underline underline-offset-4">
                            Start your journey now with a shopping experience that combines elegance, innovation, and trust.
                        </p>

                        {/* Contact Cards */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* Phone */}
                            <div className="border rounded-lg p-6 text-center shadow-sm">
                                <div className="text-blue-600 text-3xl mb-4">📞</div>
                                <h4 className="font-bold">CALL US</h4>
                                <p className="mt-2 text-gray-700">{home?.settings?.phone}</p>
                                <p className="text-gray-700">{home?.settings?.whatsapp}</p>
                            </div>

                            {/* Email */}
                            <div className="border rounded-lg p-6 text-center bg-blue-600 text-white shadow-sm">
                                <div className="text-3xl mb-4">✉️</div>
                                <h4 className="font-bold">EMAIL</h4>
                                <p className="mt-2">shoghlana@org.com</p>
                                <p>shoghlana@org.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};

export default ContactSection;
