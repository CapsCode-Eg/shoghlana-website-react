
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import axiosInstance from '../../../utils/axiosInstance'
import Layout from '../../../components/setting/layout'

export default function DeleteAccount() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = () => {
        setLoading(true)
        axiosInstance.delete('company/delete-account').then(() => {
            toast.success('We will miss you, we hope to see you again in the future.')
            window.localStorage.clear()
            navigate('/')
        }).catch((err) => {
            toast.error(err?.response?.data?.message, { id: 'add-country' })
        }).finally(() => {
            setLoading(false)
        })
    }
    return (
        <Layout>
            <div className=" shadow-2xl p-6 mb-20 flex flex-col gap-6 mx-auto rounded-[25px] h-fit overflow-hidden w-full">
                <h1 className='font-bold text-[20px]'>Delete Account</h1>
                <span className=' text-[18px] text-red-500 font-medium'>Warning: Once you delete your account, it cannot be recovered. All your data will be permanently lost and cannot be restored. Please make sure you really want to proceed.</span>
                <div className='flex flex-row items-center justify-end w-full'>
                    <button disabled={loading} onClick={handleSubmit} className='min-w-[150px] h-[45px] bg-main text-white flex flex-col items-center justify-center rounded-[14px]'>
                        {loading && <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2' />}
                        {!loading && 'Save'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}
