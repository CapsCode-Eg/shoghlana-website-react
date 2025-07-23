import { useNavigate } from "react-router";
import NavbarTwo from "../../components/common/navbarTwo/navbarTwo";
import { DocumentUpload } from "../setting/general-info/components/documentUpload";
import { useState } from "react";
import { toast } from "sonner";
import axiosInstance from "../../utils/axiosInstance";

export default function Grantee() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<any>({})
    const handleSubmit = () => {
        if (formData?.form2 && formData?.form6) {
            const form = new FormData();
            form.append('form6', formData?.form6)
            form.append('form2', formData?.form2)
            axiosInstance.post('/company/send-grantee', form).then(() => {
                toast.success('Documents sent successfully')
                navigate(-1)
            }).catch((error) => {
                toast.error(error?.response?.data?.msg, { id: 'add-country' })
                toast.error('Something went wrong')
            })
        } else {
            toast.error('Please upload both documents')
        }
    }

    const handleFileUpload = (file: File, name: string) => {
        setFormData((prev) => ({ ...prev, [name]: file[0] }))
    };

    return (
        <div className='flex flex-col max-w-screen min-h-screen overflow-hidden pb-4'>
            <NavbarTwo />
            <div className="w-[98%] xl:w-[80%] mx-auto mt-[20px] xl:mt-[54px] pb-8 flex flex-col bg-white rounded-t-[25px] rounded-b-xl shadow-md overflow-hidden">
                <div className="p-6 relative w-full h-[257px] z-[2] rounded-t-[25px] overflow-hidden flex items-center justify-center">
                    <img src={'/assets/linesBlue.png'} alt='background' className={`absolute top-0 left-0 object-cover w-full h-full`} />
                    <span className="text-main text-[35px] md:text-[50px] font-bold">Shoghlana</span>
                </div>
                <div className="flex flex-col gap-2 p-3">
                    <span className='font-[700] text-[28px] '>Grantee</span>


                    <div className="mt-4 flex flex-col gap-4">
                        <span className="text-[#131313] text-[22px] font-bold">Upload From 6</span>
                        <DocumentUpload onFilesChange={(files: any) => handleFileUpload(files, 'form6')} />
                    </div>
                    <div className="mt-4 flex flex-col gap-4">
                        <span className="text-[#131313] text-[22px] font-bold">Upload From 2</span>
                        <DocumentUpload onFilesChange={(files: any) => handleFileUpload(files, 'form2')} />
                    </div>
                    <div className='flex flex-row items-center w-full justify-end sm:justify-center gap-4 mt-12 mb-4'>
                        <button type='button' onClick={() => navigate(-1)} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-black border-[1px] border-[#D9D9D9]'>Back</button>
                        <button type='button' onClick={handleSubmit} className='w-[120px] sm:w-[249px] h-[45px] rounded-[8px] flex flex-col items-center justify-center text-[20px] font-medium text-white bg-main'>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
