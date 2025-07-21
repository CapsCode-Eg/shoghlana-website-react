import { useEffect, useState } from 'react'
import NavbarTwo from '../../components/common/navbarTwo/navbarTwo'
import axiosInstance from '../../utils/axiosInstance'


interface PlanProps {
    created_at: string;
    end_at: string;
    guarantee: number;
    id: number;
    invitation: number;
    jobs: number;
    plan_id: {
        currency: string;
        cv_unlock: number;
        description: string;
        guarantee: number;
        id: number;
        invitation: number;
        jobs: number;
        monthly_price: string;
        name: string;
        users: number;
        yearly_price: string;
    };
    cv_unlock: number;
    users: number;
    status: number;
}
export default function LastSubscription() {
    const [data, setData] = useState<PlanProps>()

    useEffect(() => {
        axiosInstance.get('/company/last-subscription').then((res) => {
            setData(res.data.data)
        })
    }, [])
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[24px] py-8 px-6 flex flex-col gap-4  rounded-xl shadow-md">
                <span className="font-semibold text-[24px]">Last Subscription</span>
                <div className="grid grid-cols-1 gap-6">
                    {data?.plan_id ? (
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all hover:shadow-xl">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">{data?.plan_id.name}</h2>
                                        <p className="mt-2 text-gray-600">{data?.plan_id.description}</p>
                                    </div>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                        Active
                                    </span>
                                </div>

                                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">Jobs: {data?.jobs}/{data?.plan_id.jobs}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">Invitations: {data?.invitation}/{data?.plan_id?.invitation}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">CV Unlock: {data?.cv_unlock}/{data?.plan_id.cv_unlock}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">Users: {data?.users}/{data?.plan_id.users}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-700">Created: {new Date(data?.created_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-700">Expires: {new Date(data?.end_at).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-700">Monthly: {data?.plan_id.currency}{data?.plan_id.monthly_price}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-gray-700">Yearly: {data?.plan_id.currency}{data?.plan_id.yearly_price}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                        <span className="text-gray-700">Guarantee: {data?.guarantee}/{data?.plan_id?.guarantee}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="min-h-[30vh] flex flex-col items-center justify-center text-center p-6">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Subscription Plan</h3>
                            <p className="text-gray-500">You don't have an active subscription plan yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
