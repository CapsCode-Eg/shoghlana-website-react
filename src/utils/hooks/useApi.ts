import { useState } from "react";
import * as yup from "yup";
import axiosInstance from "../axiosInstance";
import { toast } from "sonner";
import { flattenObject } from "../functions/flattenObject";
import { useNavigate } from "react-router";
import { appendToFormData } from "../functions/formData";

export enum HttpMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    DELETE = "delete",
    PATCH = "patch"
}

interface Props {
    endPoint: string;
    method?: HttpMethod;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
    validation?: yup.Schema;
    navigateTo?: string
    withOutToast?: boolean
    toast_message?: string,
    withFormData?: boolean
}

export function useApi<T>({ toast_message,withOutToast = false, endPoint, navigateTo, method = HttpMethod.GET, validation, payload ,withFormData=false }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [payLoad, setData] = useState<T | null | any>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate()



    const fetchData = async () => {
        setLoading(true);
        setErrors({})
        try {
            if (validation) await validation.validate(payload, { abortEarly: false });
            // await axiosInstance.get("/sanctum/csrf-cookie");
            let formData = new FormData();
            formData = appendToFormData(formData, payload)
            const response = await axiosInstance({
                method,
                url: `/${endPoint}`,
                data: withFormData ? formData : payload,
            });
            setData(response);
            // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
            { !withOutToast && toast.success(toast_message) }
            // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
            navigateTo && navigate(navigateTo)
            return response;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || "An error occurred";
            const backEndValidationError = err?.response?.data?.errors || err?.response?.data?.message || {};
            // For Validation
            if (err.inner) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const validationErrors: any = {};
                const firstError: any = err.inner[0];
                const validationErrors2 =  firstError.message;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                toast.error(validationErrors2)
                setErrors(validationErrors);
            } else {
                if (err.response?.status === 403) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    navigate("/forbidden")
                } else {
                    setErrors(flattenObject(backEndValidationError));
                                // eslint-disable-next-line  @typescript-eslint/no-unused-expressions
                    !withOutToast && ((typeof errorMessage === "string") ? toast.error(errorMessage || "An error occurred" ) : toast.error("An error occurred"))
                }
            }
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { payLoad, errors, setErrors, loading, fetchData };
}


