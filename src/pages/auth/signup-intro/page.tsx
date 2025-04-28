
import { useState } from "react";
import Logo from "../../../components/logo/logo";
import ProgressBar from "../../../components/signUp/progressBar/progressBar";
import SelfInformation from "../../../components/signUp/selfInformation";
import YourEducation from "../../../components/signUp/yourEducation";
import YourExperience from "../../../components/signUp/yourExperience";
import YourExperties from "../../../components/signUp/yourExperties";
import CareerInteresting from "../../../components/signUp/careerInteresting";

export default function SignUpIntro() {
    const [step, setStep] = useState(0);
    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);
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
                    <SelfInformation handleNext={handleNext} />
                )
            }
            {
                step === 1 && (
                    <YourEducation handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 2 && (
                    <YourExperience handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 3 && (
                    <YourExperties handleNext={handleNext} handleBack={handleBack} />
                )
            }
            {
                step === 4 && (
                    <CareerInteresting handleBack={handleBack} />
                )
            }
        </div>
    )
}