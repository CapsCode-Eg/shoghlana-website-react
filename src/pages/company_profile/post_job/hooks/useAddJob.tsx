import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";
import { jobDataSchema } from "../validation/jobDataSchema";

interface Job {
    skills: number[];
    max_salary: null | number;
    min_salary: null | number;
    max_year: null | number;
    min_year: null | number;
    description: string;
    title: string;
    country_id: number | null;
    city_id: number | null;
    job_category_id: number | null;
    user_id: number | null;
    status: number;
    level: string;
    work_place: string;
    post_type: string;
}

type Errors = {
    skills: string;
    max_salary: string;
    min_salary: string;
    max_year: string;
    min_year: string;
    description: string;
    title: string;
    country_id: string;
    city_id: string;
    job_category_id: string;
    user_id: string;
    status: string;
    level: string;
    work_place: string;
    post_type: string;
};

export function useAddJob() {
    const [data, setData] = useState<Job>({
        skills: [],
        max_salary: null,
        min_salary: null,
        max_year: null,
        min_year: null,
        description: "",
        title: "",
        country_id: null,
        city_id: null,
        job_category_id: null,
        user_id: null,
        status: 0,
        level: "",
        work_place: "",
        post_type: "",
    })
    const { id } = useParams()
    const navigate = useNavigate()

    const [errors, setErrors] = useState<Errors>({
        skills: "",
        max_salary: "",
        min_salary: "",
        max_year: "",
        min_year: "",
        description: "",
        title: "",
        country_id: "",
        city_id: "",
        job_category_id: "",
        user_id: "",
        status: "",
        level: "",
        work_place: "",
        post_type: "",
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            axiosInstance.get(`/jobs/${id}`).then((res) => {
                setData({
                    ...res?.data?.data, skills: res?.data?.data?.skills?.map((item: any) => {
                        return item.id
                    })
                })
            })
        }
    }, [id])
    const [countries, setCountries] = useState([])
    const [skills, setSkills] = useState([])
    const [cities, setCities] = useState([])
    const [job_category, setJobCategory] = useState([])
    useEffect(() => {
        axiosInstance.get(`/country`).then((res) => {
            setCountries(res.data.data)
        })
        axiosInstance.get(`/skills`).then((res) => {
            setSkills(res.data.data)
        })
        axiosInstance.get('/job-category').then((res) => {
            setJobCategory(res.data.data)
        })
    }, [])
    useEffect(() => {
        if (data?.country_id !== null) {
            axiosInstance.get(`/get-cities-by-country-id/${data?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.country_id])
    // useEffect(() => {
    //     if (jobQuestion && id) {
    //         console.log(jobQuestion)
    //         setData({
    //             ...jobQuestion, skills: jobQuestion?.skills?.map((item: any) => {
    //                 return item.id
    //             })
    //         })
    //     }
    // }, [jobQuestion])
    useEffect(() => {
        setData({
            max_salary: 0,
            min_salary: 0,
            max_year: 0,
            min_year: 0,
            description: "",
            title: "",
            country_id: null,
            city_id: null,
            job_category_id: null,
            user_id: null,
            status: 0,
            level: "",
            work_place: "",
            post_type: "",
            skills: []
        })
    }, [navigate])
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value,
        });
    }
    const [, setUserData] = useState<any>({});
    useEffect(() => {
        const user = window.localStorage.getItem("user");
        if (user) {
            setUserData(JSON.parse(user));
        }
    }, [])
    const handleSubmit = async () => {
        setErrors({
            skills: "",
            max_salary: "",
            min_salary: "",
            max_year: "",
            min_year: "",
            description: "",
            title: "",
            country_id: "",
            city_id: "",
            job_category_id: "",
            user_id: "",
            status: "",
            level: "",
            work_place: "",
            post_type: "",
        })
        try {
            setLoading(true);
            await jobDataSchema.validate(data, { abortEarly: false });
            if (id) {
                axiosInstance.put(`/jobs/${id}`, data).then(() => {
                    toast.success('Updated Successfully', { id: 'add-industries' });
                    navigate(-1)
                }).catch((error) => {
                    toast.error(error?.response?.data?.message, { id: 'add-industries' })
                })
            } else {
                axiosInstance.post('/jobs', data).then(() => {
                    toast.success('Add Successfully', { id: 'add-industries' });
                    navigate(-1)
                }).catch((error) => {
                    toast.error(error?.response?.data?.message, { id: 'add-industries' })
                })
            }
        } catch (err: any) {
            if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                console.log(validationErrors)
                setErrors(validationErrors);
            }
            return null;
        } finally {
            setLoading(false);
        }
    }
    return {
        data,
        countries,
        skills,
        cities,
        errors,
        setData,
        handleSubmit, job_category,
        handleOnChange, loading
    };
}