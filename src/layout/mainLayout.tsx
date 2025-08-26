import { useEffect, useState } from "react";
import { HttpMethod, useApi } from "../utils/hooks/useApi";
import NavbarTwo from "../components/common/navbarTwo/navbarTwo";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useLocation } from "react-router";
import GlobalErrorBoundary from "../components/GlobalErrorBoundary";
import { ErrorProvider } from "../utils/context/ErrorContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<any>('');
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
    const { pathname } = useLocation();

    useEffect(() => {
        // "document.documentElement.scrollTo" is the magic for React Router Dom v6
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Optional if you want to skip the scrolling animation
        });
    }, [pathname]);
    useEffect(() => {
        handleFetchData()
        if (localStorage.getItem('token')) {
            setData(localStorage.getItem('token') || JSON.parse(localStorage.getItem('token') || ''))
        }
    }, [])
    return (
        <GlobalErrorBoundary>
            <ErrorProvider>
                <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
                    {data ? <NavbarTwo /> : <Navbar />}
                    {children}
                    <Footer data={home?.settings} />
                </div>
            </ErrorProvider>
        </GlobalErrorBoundary>
    )
}
