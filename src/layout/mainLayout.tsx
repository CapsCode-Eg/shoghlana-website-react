import { useEffect, useState } from "react";
import { HttpMethod, useApi } from "../utils/hooks/useApi";
import NavbarTwo from "../components/common/navbarTwo/navbarTwo";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

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

    useEffect(() => {
        handleFetchData()
        if (localStorage.getItem('token')) {
            setData(localStorage.getItem('token') || JSON.parse(localStorage.getItem('token') || ''))
        }
    }, [])
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            {data ? <NavbarTwo /> : <Navbar />}
            {children}
            <Footer data={home?.settings} />
        </div>
    )
}
