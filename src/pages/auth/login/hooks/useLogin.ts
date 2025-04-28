import { useEffect, useState } from "react"
import { HttpMethod, useApi } from "../../../../utils/hooks/useApi"
import { loginValidation } from "../validation/loginValidation"
import { useNavigate } from "react-router"

export function useLogin() {
    const [data, setData] = useState<{
        email: string,
        password: string
    }>({
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const { fetchData, errors, loading, payLoad } = useApi({
        endPoint: "login",
        method: HttpMethod.POST,
        payload: data,
        toast_message: 'Login Successfully',
        validation: loginValidation,
    })

    useEffect(() => {
        if (payLoad?.data) {
            window.localStorage.setItem('user', JSON.stringify(payLoad?.data?.user))
            if (payLoad.data) {
                window.localStorage.setItem('token', payLoad?.data?.access_token)
            }
        }
    }, [payLoad])
    
    const handleLogin = async ()=>{
        const res = await fetchData()
        if(res?.data?.user){
            if(res?.data?.user?.type === 'company'){
                navigate('/company_profile')
            }
        }
    }
    return {
        errors, handleLogin, loading, data, setData, payLoad
    }
}