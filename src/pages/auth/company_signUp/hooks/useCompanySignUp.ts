import { useEffect, useState } from "react"
import { HttpMethod, useApi } from "../../../../utils/hooks/useApi"
import { useNavigate } from "react-router"
import { companySignUp } from "../validation/companySchema"

export function useCompanySignUp() {
    const [data, setData] = useState<{
        email: string,
        password: string,
        first_name: string,
        hiring_title: string,
        last_name: string,
        terms_and_conditions: boolean | null,
        mobile: string
    }>({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        hiring_title: "",
        mobile: "",
        terms_and_conditions: null
    })
    const navigate = useNavigate()
    const { fetchData, errors, loading, payLoad } = useApi({
        endPoint: "register",
        method: HttpMethod.POST,
        payload: data,
        toast_message: 'Signup Successfully',
        validation: companySignUp,
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
        if(res?.status === 200){
           navigate('/login-as-company')
        }
    }
    return {
        errors, handleLogin, loading, data, setData, payLoad
    }
}