"use client"

import { useEffect, useState } from 'react'
import { HttpMethod, useApi } from '../../utils/hooks/useApi'
import NavbarTwo from '../../components/common/navbarTwo/navbarTwo'
import ProfileHeroSection from '../../components/profile/heroSection/profileHeroSection'

export default function CompanyProfile() {
    const [data, setData] = useState({})

    const { fetchData, payLoad } = useApi({
        endPoint: 'company/profile',
        method: HttpMethod.GET,
        withOutToast: true
    })

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (payLoad?.data) {
            setData(payLoad?.data?.data)
        }
    }, [payLoad])
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <ProfileHeroSection isCompany={true} userData={data} />

        </div>
    )
}
