
import Logo from "../../../components/logo/logo";
import ProgressBar from "../../../components/signUp/progressBar/progressBar";
import SelfInformation from "../../../components/signUp/selfInformation";
import YourEducation from "../../../components/signUp/yourEducation";
import YourExperience from "../../../components/signUp/yourExperience";
import YourExperties from "../../../components/signUp/yourExperties";
import CareerInteresting from "../../../components/signUp/careerInteresting";
import { useSignUpIntro } from "./hooks/useSignUpIntro";


export default function SignUpIntro() {
    const { step, handleNext, handleBack, countries, nationalties, skills, cities, job_category, formData, setFormData, years, errors, loading, fetchData } = useSignUpIntro();
    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            <div className="flex flex-row justify-center items-center h-[91px] w-screen">
                <Logo />
            </div>
            <div className="flex relative flex-row justify-center items-start h-[271px] bg-gradient-to-r from-[#0055D9] via-[#002D73] to-[#0145AE] rounded-b-[21px]">
                <ProgressBar currentStep={step} />
            </div>
            {
                step === 0 && (
                    <SelfInformation errors={errors} formData={formData} nationalties={nationalties} countries={countries} cities={cities} setData={setFormData} handleNext={handleNext} />
                )
            }
            {
                step === 1 && (
                    <YourEducation errors={errors} formData={formData} years={years} setData={setFormData} handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 2 && (
                    <YourExperience errors={errors} formData={formData} job_category={job_category} years={years} setData={setFormData} handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 3 && (
                    <YourExperties errors={errors} formData={formData} skills={skills} setData={setFormData} handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 4 && (
                    <CareerInteresting loading={loading} errors={errors} formData={formData} handleSubmit={fetchData} setData={setFormData} handleBack={handleBack} />
                )
            }
        </div>
    )
}