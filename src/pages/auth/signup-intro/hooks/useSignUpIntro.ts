import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { HttpMethod, useApi } from "../../../../utils/hooks/useApi";
import { SingUpAsUser } from "../validation/singUpAsUser";


type Language = {
    language: string;
    level: number;
};

type FormData = {
    job_title: string;
    birth_day: string | null;
    gender: number | null;
    nationality_id: string | null;
    country_id: string | null;
    city_id: string | null;
    cv: File | null;
    mobile: string;
    enroll_year: string;
    field_of_study: string;
    university: string;
    graduation_year: string;
    grade: string;
    education_level: string;

    years_of_experience: string;
    experience_job_title: string;
    company: string;
    job_category_id: string | null;

    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
    still_working: number;

    career_level: number | null;
    job_type: number | null;
    workplace: number | null;

    min_salary: string | null;
    hide_salary: number;

    languages: Language[];
    skills: number[];
};




export function useSignUpIntro() {
        const [step, setStep] = useState(0);
        const handleNext = () => setStep(step + 1);
        const handleBack = () => setStep(step - 1);
        const [countries, setCountries] = useState([])
        const [cities, setCities] = useState([])
        const [nationalties, setNationalties] = useState([])
        const [skills, setSkills] = useState([])
        const [job_category, setJobCategory] = useState([])
        const [formData, setFormData] = useState<FormData>({
            birth_day: null,
            gender: null,
            nationality_id: null,
            country_id: null,
            city_id: null,
            mobile: '',
            job_title: '',
    
            field_of_study: '',
            university: '',
            graduation_year: '',
            enroll_year: '',
            grade: '',
            education_level: '',
    
            cv: null,
            years_of_experience: '',
            experience_job_title: '',
            company: '',
            job_category_id: '',
    
            start_month: '',
            start_year: '',
            end_month: '',
            end_year: '',
            still_working: 0,
    
            career_level: null,
            job_type: null,
            workplace: null,
    
            min_salary: null,
            hide_salary: 0,
    
            languages: [],
            skills: [],
        });
        const { fetchData, errors, loading } = useApi({
            endPoint: "register-all-user-data",
            method: HttpMethod.POST,
            payload: formData,
            toast_message: 'Signup Successfully',
            validation: SingUpAsUser,
            navigateTo:'/profile',
            withFormData: true
        })
        useEffect(()=>{
            setFormData((prev) => ({ ...prev, languages: formData.languages.filter((lang) => lang.language !== "") }));
        },[step])
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
            axiosInstance.get('/nationalities').then((res) => {
                setNationalties(res.data.data)
            })
        }, [])
        useEffect(() => {
            if (formData?.country_id !== null && formData?.country_id !== "") {
                axiosInstance.get(`/get-cities-by-country-id/${formData?.country_id}`).then((res) => {
                    setCities(res.data.data)
                })
            }
        }, [formData?.country_id])
    
    
        const currentYear = new Date().getFullYear();
        const startYear = 1990;
        const years: { label: string; value: number; }[] = [];
        for (let year = currentYear; year >= startYear; year--) {
            years.push({ label: year.toString(), value: year });
        }
    
        return { step, handleNext, handleBack, countries, nationalties, skills, cities, job_category, formData, setFormData, years, errors, loading, fetchData }
}