import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'

// Import Swiper styles
import "swiper/swiper-bundle.css";

import { HttpMethod, useApi } from "../../../utils/hooks/useApi";
import axiosInstance from "../../../utils/axiosInstance";
import { toast } from "sonner";
import MainLayout from "../../../layout/mainLayout";



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function PricingPlan() {
    const [isAnnual, setIsAnnual] = useState(true);
    const swiperRef = useRef(null)
    const [planes, setPlanes] = useState([])
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
    const handleWhatsAppClick = (plan) => {
        const message = `Hi, I'm interested in the ${plan.name} plan (${isAnnual ? plan.yearly_price : plan.monthly_price}/${isAnnual ? 'yearly' : 'monthly'}) Description: ${plan.description}`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappNumber = `+2${home?.settings?.whatsapp}`;
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    };

    const navigationPrevRef = useRef(null)
    const navigationNextRef = useRef(null)


    useEffect(() => {
        handleFetchData()
        axiosInstance.get('/plans').then((res) => {
            setPlanes(res.data.data)
        }).catch((error) => {
            toast.error(error?.response?.data?.message, { id: 'add-country' })
        })
    }, [])

    return (
        <MainLayout>
            <div className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8 mt-10">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base/7 font-semibold text-main">Pricing</h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">
                        Choose the right plan for you
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                    Choose an affordable plan that's packed with the best features for engaging your audience, creating customer
                    loyalty, and driving sales.
                </p>
                <div className="flex justify-center max-w-[14rem] m-auto my-8">
                    <div className="relative flex w-full p-1 bg-white dark:bg-slate-900 rounded-full">
                        <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                            <span
                                className={`absolute inset-0 w-1/2 bg-main rounded-full shadow-sm shadow-indigo-950/10 transform transition-transform duration-150 ease-in-out ${isAnnual ? 'translate-x-0' : 'translate-x-full'
                                    }`}
                            ></span>
                        </span>
                        <button
                            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                                }`}
                            onClick={() => setIsAnnual(true)}
                            aria-pressed={isAnnual}
                        >
                            Yearly{' '}
                        </button>
                        <button
                            className={`relative flex-1 text-sm font-medium h-8 rounded-full focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ease-in-out ${isAnnual ? 'text-slate-500 dark:text-slate-400' : 'text-white'
                                }`}
                            onClick={() => setIsAnnual(false)}
                            aria-pressed={!isAnnual}
                        >
                            Monthly
                        </button>
                    </div>
                </div>
                <div className="mt-16 mx-auto max-w-6xl relative px-4 sm:px-6 lg:px-8">
                    <button
                        ref={navigationPrevRef}
                        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-4 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-colors"
                        aria-label="Previous plan"
                    >
                        <ChevronLeft className="h-6 w-6 text-indigo-600" />
                    </button>

                    <button
                        ref={navigationNextRef}
                        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-4 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-colors"
                        aria-label="Next plan"
                    >
                        <ChevronRight className="h-6 w-6 text-indigo-600" />
                    </button>
                    <Swiper
                        ref={swiperRef}
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={30}
                        slidesPerView={1}
                        onInit={(swiper: any) => {
                            // Override default navigation elements with our custom refs
                            swiper.params.navigation.prevEl = navigationPrevRef.current
                            swiper.params.navigation.nextEl = navigationNextRef.current
                            swiper.navigation.init()
                            swiper.navigation.update()
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 2.5,
                            },
                            1280: {
                                slidesPerView: 3,
                            },
                            1536: {
                                slidesPerView: 3,
                            },

                        }}
                        navigation={{
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        }}
                        pagination={{
                            clickable: true,
                            el: '.swiper-pagination',
                            type: 'bullets',
                        }}
                        a11y={{
                            prevSlideMessage: 'Previous slide',
                            nextSlideMessage: 'Next slide',
                        }}
                        className="relative !px-4 !py-10"
                    >
                        {planes?.length > 0 && planes?.map((tier: any, index: number) => (
                            <SwiperSlide key={index}>
                                <div
                                    className={classNames(
                                        tier.featured ? 'relative bg-main shadow-2xl' : 'bg-white/60',
                                        'h-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10',
                                    )}
                                >
                                    <h3
                                        id={tier.id}
                                        className={classNames(tier.featured ? 'text-white' : 'text-main', 'text-base/7 font-semibold')}
                                    >
                                        {tier.name}
                                    </h3>
                                    <p className="mt-4 flex items-baseline gap-x-2">
                                        <span
                                            className={classNames(
                                                tier.featured ? 'text-white' : 'text-gray-900',
                                                'text-5xl font-semibold tracking-tight',
                                            )}
                                        >
                                            {isAnnual ? tier.yearly_price : tier.monthly_price}
                                        </span>
                                        <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/{isAnnual ? 'year' : 'month'}</span>
                                    </p>
                                    <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                                        {tier.description}
                                    </p>
                                    <ul
                                        role="list"
                                        className={classNames(
                                            tier.featured ? 'text-gray-300' : 'text-gray-600',
                                            'mt-8 space-y-3 text-sm/6 sm:mt-10',
                                        )}
                                    >
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-white' : 'text-main', 'h-6 w-5 flex-none')}
                                            />
                                            {tier?.guarantee} Guarantee / month
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-white' : 'text-main', 'h-6 w-5 flex-none')}
                                            />
                                            {tier?.cv_unlock} CV Unlock / month
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-white' : 'text-main', 'h-6 w-5 flex-none')}
                                            />
                                            {tier?.invitation} Invitation / month
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-white' : 'text-main', 'h-6 w-5 flex-none')}
                                            />
                                            {tier?.jobs} Jobs / month
                                        </li>
                                        <li className="flex gap-x-3">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className={classNames(tier.featured ? 'text-white' : 'text-main', 'h-6 w-5 flex-none')}
                                            />
                                            {tier?.users} Users / month
                                        </li>
                                    </ul>
                                    <button
                                        onClick={() => handleWhatsAppClick(tier)}
                                        aria-describedby={tier.id}
                                        className={classNames(
                                            tier.featured
                                                ? 'bg-white text-main shadow-xs hover:bg-indigo-400 focus-visible:outline-main'
                                                : 'text-main ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600',
                                            'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 w-full',
                                        )}
                                    >
                                        Get started today
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>


                    {/* Mobile navigation buttons - shown only on small screens */}
                    <div className="-mt-7 flex justify-center gap-4 md:hidden z-10 relative">
                        <button
                            // @ts-expect-error type mismatch
                            onClick={() => swiperRef.current?.swiper.slidePrev()}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-colors"
                            aria-label="Previous plan"
                        >
                            <ChevronLeft className="h-6 w-6 text-indigo-600" />
                        </button>

                        <button
                            // @ts-expect-error type mismatch
                            onClick={() => swiperRef.current?.swiper.slideNext()}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-50 focus:outline-none transition-colors"
                            aria-label="Next plan"
                        >
                            <ChevronRight className="h-6 w-6 text-indigo-600" />
                        </button>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}