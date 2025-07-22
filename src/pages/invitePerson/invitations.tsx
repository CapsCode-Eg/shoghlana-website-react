import { useEffect, useState } from 'react'
import NavbarTwo from '../../components/common/navbarTwo/navbarTwo'
import axiosInstance from '../../utils/axiosInstance'
import UsersTable from './table'
import Pagination from '../../components/common/pagination/pagination'

export default function Invitations() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<any>({});
    useEffect(() => {
        axiosInstance.get(`/company/invite-users?page=${page}`).then((res) => {
            console.log(res)
            setMeta(res?.data?.data?.links['total-page'])
            setData(res.data.data?.data)
        })
    }, [])
    console.log(meta)
    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <UsersTable data={data} />
                <Pagination currentPage={page} totalPages={meta} onPageChange={(page: number) => setPage(page)} />
            </div>
        </div>
    )
}
