import { useState } from 'react'
import { changeCompanyPassword } from './validation/changeCompanyPassword'
import { toast } from 'sonner'
import axiosInstance from '../../../utils/axiosInstance'
import Layout from '../../../components/setting/layout'
import InputAndLabel from '../../../components/input/inputAndLabel'

export default function ChangePassword() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        current_password: '',
        password: "",
        password_confirmation: ""
    })
    const [errors, setError] = useState({
        current_password: '',
        password: "",
        password_confirmation: ""
    })

    const handleSubmit = async () => {
        setError({
            current_password: '',
            password: "",
            password_confirmation: ""
        })
        setLoading(true)
        try {
            await changeCompanyPassword.validate(data, { abortEarly: false })
            axiosInstance.post('company/change-password', data).then(() => {
                setData({
                    current_password: '',
                    password: "",
                    password_confirmation: ""
                })
                toast.success('Password changed successfully')
            }).catch((err) => {
                toast.error(err?.response?.data?.message || 'Something went wrong')
            })
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            if (err.inner) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const validationErrors: any = {};
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setError(validationErrors);
            }
            return null;
        } finally {
            setLoading(false)
        }
    }
    return (
        <Layout>
            <div className=" shadow-2xl p-6 mb-20 h-fit mx-auto rounded-[25px] overflow-hidden w-full">
                <h1 className='font-bold text-[20px]'>Change Password</h1>
                <div className='flex flex-col gap-4 mt-4'>
                    <InputAndLabel label="Old Password" name="current_password" type='password' see value={data?.current_password || ""} setData={setData} error={errors?.current_password} />
                    <InputAndLabel label="New Password" name="password" type='password' see value={data?.password || ""} setData={setData} error={errors?.password} />
                    <InputAndLabel label="Confirma New Password" name="password_confirmation" type='password' see value={data?.password_confirmation || ""} setData={setData} error={errors?.password_confirmation} />
                </div>
                <div className='flex flex-row items-center justify-end w-full mt-10'>
                    <button disabled={loading} onClick={handleSubmit} className='min-w-[150px] h-[45px] bg-main text-white flex flex-col items-center justify-center rounded-[14px]'>
                        {loading && <div className='w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin mr-2' />}
                        {!loading && 'Save'}
                    </button>
                </div>
            </div>
        </Layout>
    )
}
