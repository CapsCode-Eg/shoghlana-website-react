import { useEffect, useState } from "react";
import { toast } from "sonner";
import parsePhoneNumberFromString from "libphonenumber-js";
import { HttpMethod, useApi } from "../../../../utils/hooks/useApi";
import axiosInstance from "../../../../utils/axiosInstance";
import { appendToFormData } from "../../../../utils/functions/formData";
import { editCompanyValidation } from "../../../../utils/validation/companyValidation";
import { userSchemaForProfile } from "../validation/userProfile";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../utils/redux/store";
import { setUserData } from "../../../../utils/redux/Slice/userSlice";


interface SocialMedia {
    platform: string;
    url: string;
  }
  


export interface SocialMediaTwo {
    id: string;
    name: string;
    url: string;
  }
  

export function useCompany() {
    const [company,setCompany]=useState<any>({})
    const [data, setData] = useState<any>({})
    const [countries,setCountries]=useState([])
    const [cities,setCities]=useState([])
    const [nationalties, setNationalties] = useState([])
    const { fetchData, payLoad } = useApi({
        endPoint: 'company/profile',
        method: HttpMethod.GET,
        withOutToast: true
    })
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('user') || '{}').type === 'company') {
            fetchData()
        }else{
            axiosInstance.get('/user-profile').then((res) => {
                setData({
                    first_name: res?.data?.data?.first_name,
                    last_name: res?.data?.data?.last_name,
                    job_title: res?.data?.data?.seeker?.job_title,
                    birth_day: res?.data?.data?.seeker?.birth_day,
                    gender: res?.data?.data?.seeker?.gender,
                    mobile: res?.data?.data?.mobile,
                    nationality_id: res?.data?.data?.seeker?.nationality_id,
                    country_id: res?.data?.data?.seeker?.country_id,
                    city_id: res?.data?.data?.seeker?.city_id,
                    image: res?.data?.data?.image,
                    type: res?.data?.data?.type
                })
                dispatch(setUserData({
                     first_name: res?.data?.data?.first_name,
                    last_name: res?.data?.data?.last_name,
                    job_title: res?.data?.data?.seeker?.job_title,
                    birth_day: res?.data?.data?.seeker?.birth_day,
                    gender: res?.data?.data?.seeker?.gender,
                    mobile: res?.data?.data?.mobile,
                    nationality_id: res?.data?.data?.seeker?.nationality_id,
                    country_id: res?.data?.data?.seeker?.country_id,
                    city_id: res?.data?.data?.seeker?.city_id,
                    image: res?.data?.data?.image,
                    type: res?.data?.data?.type
                }))
            })
        }
    }, [])
    useEffect(() => {
        if (payLoad?.data) {
            setCompany(payLoad?.data?.data)
        }
    }, [payLoad])
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const [industries,setIndustries]=useState([])

    useEffect(() => {
        axiosInstance.get('/country').then((res) => {
            setCountries(res.data.data)
        })
        axiosInstance.get(`/industries`).then((res)=>{
            setIndustries(res.data.data)
        })
              axiosInstance.get('/nationalities').then((res) => {
                        setNationalties(res.data.data)
                    })
    }, [])

    const [documentFiles, setDocumentFiles] = useState<File[]>([]);
    

    const [files, setFiles] = useState<File[]>([]);

    const [errors, setErrors] = useState< any | {
        first_name: string;
        email: string;
        password: string;
        mobile: string;
image: any;
        status: string;
        // General Data
        hiring_title: string;
        country_id: string;
        city_id: string;
        company_size: string;
        founded_year: string;
        about: string;
        // Pdf
        tax_card: string;
        // Social Info
        social_media: SocialMedia[];
        // Industry
        industries: string;
    }>({
          // Main Data
          first_name: "",
          email: "",
          password: "",
          mobile: "",
          image:"",
          status:'',
          // General Data
          hiring_title: "",
          country_id: "",
          city_id:"",
          company_size:"",
          founded_year:'',
          about:"",
          // Pdf
          tax_card:"",
  
          // Social Info
          social_media:[
              {
                  platform:"",
                  url:""
              }
          ],
          // Industry
          industries:'',
    });
    const [loading, setLoading] = useState(false);
   
    const handleFilesChange = (newFiles: File[]) => {
      setFiles(newFiles);
    };

        // To Change number of mobile
            const handleChangeNumber = (e: any) => {
            const phoneNumberObj = parsePhoneNumberFromString(e);
            if (data?.mobile && data?.mobile?.length > 4) {
            setErrors((prevErrors: any) => ({
                    ...prevErrors,
                    mobile: phoneNumberObj?.isValid() ? '' : 'Please enter a valid phone number',
                }));
            }
            setData((prevData: any) => ({
                ...prevData,
                mobile: phoneNumberObj?.number.slice(1) ?? '',
            }));
        };

        const handleArrayChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            const updatedSocialMedia = [...data.social_media];
            updatedSocialMedia[index] = { ...updatedSocialMedia[index], url: value };
            setData((prevData: any) => ({
                ...prevData,
                social_media: updatedSocialMedia,
            }));
        };
    
    useEffect(() => {
        setData((prevData:any) => ({
        ...prevData,
        image: files.length > 0 ? files[0] : '',
      }));
    }, [files]);

    useEffect(() => {    
        setData((prevData:any) => ({
        ...prevData,
        tax_card: documentFiles[0] ? documentFiles[0] : '',
      }));
    }, [documentFiles]);


    const handleSubmit = async() => {
        setErrors({
               // Main Data
        first_name: "",
        email: "",
        password: "",
        mobile: "",
        image:"",
        status:"",
        // General Data
        hiring_title: "",
        country_id: "",
        city_id:"",
        company_size:"",
        founded_year:'',
        about:"",
        // Pdf
        tax_card:"",

        // Social Info
        social_media:[
            {
                platform:"",
                url:""
            }
        ],
        // Industry
        industries:"",
        })
        try{
            setLoading(true);
            const newData = {...data, social_media: data?.social_media?.filter((sm:any) => sm?.url !== ''),status: data?.status ? 1 : 0};
            let formData = new FormData();
            
            await editCompanyValidation.validate(data, { abortEarly: false });
            if(typeof newData?.tax_card ==="string"){
                delete newData?.tax_card;
            }
            if(typeof newData?.image ==="string"){
                delete newData?.image;
            }
            formData = appendToFormData(formData, newData);
            const NewArray = data?.social_media?.filter((sm:any) => sm?.url !== '');
            if(NewArray&&NewArray?.length > 0){
                formData = appendToFormData(formData, { social_media: NewArray });
            }else{
                formData.delete('social_media');
            }
            // formData.append('_method','PATCH') 
            axiosInstance.post(`/company/update-profile`,formData).then((res)=>{
                window.localStorage.setItem('user',JSON.stringify({type:'company',...res?.data?.data}))
                toast.success('Edit Successfully',{id:'add-companies'});
            }).catch((error)=> {
                toast.error(error?.response?.data?.msg,{id:'add-companies'})
            })
            }catch (err: any) {
                if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleSubmitUserProfile = async() => {
        setErrors({})
        let formData = new FormData();
         try{
            setLoading(true);
            await userSchemaForProfile.validate(data, { abortEarly: false });
            if(typeof data?.image ==="string"){
                delete data?.image;
            }
            formData = appendToFormData(formData, data);
                axiosInstance.post('/update-general-data',formData,{
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                }).then((res)=>{
                    axiosInstance.get('/user-profile').then((res) => {
                    setData({
                        first_name: res?.data?.data?.first_name,
                        last_name: res?.data?.data?.last_name,
                        job_title: res?.data?.data?.seeker?.job_title,
                        birth_day: res?.data?.data?.seeker?.birth_day,
                        gender: res?.data?.data?.seeker?.gender,
                        mobile: res?.data?.data?.mobile,
                        nationality_id: res?.data?.data?.seeker?.nationality_id,
                        country_id: res?.data?.data?.seeker?.country_id,
                        city_id: res?.data?.data?.seeker?.city_id,
                        image: res?.data?.data?.image,
                        type: res?.data?.data?.type
                    })
                dispatch(setUserData({
                     first_name: res?.data?.data?.first_name,
                    last_name: res?.data?.data?.last_name,
                    job_title: res?.data?.data?.seeker?.job_title,
                    birth_day: res?.data?.data?.seeker?.birth_day,
                    gender: res?.data?.data?.seeker?.gender,
                    mobile: res?.data?.data?.mobile,
                    nationality_id: res?.data?.data?.seeker?.nationality_id,
                    country_id: res?.data?.data?.seeker?.country_id,
                    city_id: res?.data?.data?.seeker?.city_id,
                    image: res?.data?.data?.image,
                    type: res?.data?.data?.type
                }))
                    toast.success('Edit Successfully')
                    return res?.data?.data
                })
                return res
            }).catch((error)=> {
                toast.error(error?.response?.data?.msg,{id:'add-country'})
                toast.error('Failed to update profile')
                return error
            })
         }catch (err: any) {
                if (err.inner) {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            }
            }finally {
            setLoading(false);
        }

    }

    const deleteImage = () => {
        axiosInstance.post('/delete-image').then(() => {
            axiosInstance.get('/user-profile').then((res) => {
                    setData({
                        first_name: res?.data?.data?.first_name,
                        last_name: res?.data?.data?.last_name,
                        job_title: res?.data?.data?.seeker?.job_title,
                        birth_day: res?.data?.data?.seeker?.birth_day,
                        gender: res?.data?.data?.seeker?.gender,
                        mobile: res?.data?.data?.mobile,
                        nationality_id: res?.data?.data?.seeker?.nationality_id,
                        country_id: res?.data?.data?.seeker?.country_id,
                        city_id: res?.data?.data?.seeker?.city_id,
                        image: res?.data?.data?.image,
                        type: res?.data?.data?.type
                    })
                    toast.success('Deleted Successfully')   
                    return res?.data?.data
                }).catch((error) => {
                    toast.error(error?.response?.data?.msg,{id:'add-companies'})
                    toast.error('Failed to update profile')
                    return error
                })
        })
    }
    useEffect(()=>{
        if(company?.email && localStorage.getItem('user')?.includes('company')){
            const defaultPlatforms = [
                { platform: "linkedin", url: "" },
                { platform: "facebook", url: "" },
                { platform: "snapchat", url: "" },
                { platform: "youtube", url: "" },
                { platform: "instagram", url: "" },
                { platform: "website", url: "" },
            ];
            const existingSocialMedia = company?.social_media?.map((sm: any) => ({
                platform: sm.platform.toLowerCase(),
                url: sm.url
            })) || [];
            
            const filledSocialMedia = [
                ...existingSocialMedia,
            ...defaultPlatforms.filter(dp => !existingSocialMedia.some((sm:any) => sm.platform === dp.platform))
            ];
            setFiles([company?.image])
            setDocumentFiles([company?.company_info?.tax_card])
            setData({
                first_name:company.name || "",
                mobile:company.mobile || "",
                status: company?.status|| 0,
                email:company?.email || "",
                hiring_title:company?.company_info.hiring_title || "",
                founded_year:company?.company_info.founded_year || "",
                about:company?.company_info.about || "",
                city_id:company?.company_info.city || "",
                country_id:company?.company_info.country || "",
                company_size:company?.company_info.company_size || "",
                industry:company?.industries?.map((i:any) => +(i.id)) || "",
                social_media:filledSocialMedia
            })
        }
    },[company])
    
    useEffect(() => {
        if (data?.country_id) {
            axiosInstance.get(`/get-cities-by-country-id/${data?.country_id}`).then((res) => {
                setCities(res.data.data)
            })
        }
    }, [data?.country_id])
    const handleDocumentFilesChange = (newFiles: File[]) => {
        setDocumentFiles(newFiles);
    }; 
    return {
        data,cities,countries,
        errors,handleDocumentFilesChange,
        setData,industries,handleInputChange,
        handleSubmit,handleChangeNumber,handleArrayChange,deleteImage,
        loading,handleFilesChange,files,documentFiles,nationalties,handleSubmitUserProfile
    };
}