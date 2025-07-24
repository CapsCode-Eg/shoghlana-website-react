import { useEffect, useState } from 'react'
import NavbarTwo from '../../components/common/navbarTwo/navbarTwo'
import axiosInstance from '../../utils/axiosInstance'
import UsersTable from '../invitePerson/table';

export default function CompanyUsers() {
    const [data, setData] = useState([])
    useEffect(() => {
        axiosInstance.get(`/company/users`).then((res) => {
            setData(res.data.data)
        })
    }, [])
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <UsersTable isUsers={true} data={data} />
            </div>
        </div>
    )
}
