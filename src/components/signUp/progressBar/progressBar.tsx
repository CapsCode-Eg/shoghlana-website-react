
const steps = [
    "About you",
    "Education",
    "Experience",
    "Expertise",
    "Career Interesting",
];

export default function ProgressBar({ currentStep }: { currentStep: number }) {
    const progress = ((currentStep) / 4) * 100;

    return (
        <div className="flex items-center -mt-10 justify-center h-full w-full py-4">
            <div className="w-[75%] -ms-4 sm:w-[517px] h-[10px] bg-[#C6C6C6] relative rounded-full">
                <div
                    className="bg-main h-[10px] transition-all duration-500 rounded-full"
                    style={{ width: `${progress}%` }}
                />
                {
                    steps.map((step, index) => {
                        const position = (index / (steps.length - 1)) * 100

                        return (
                            <div key={index}
                                style={{ left: `${position}%`, transform: "translateX(-50%)", top: "-15px" }}
                                className={`absolute ms-3 transition-all duration-500 flex flex-col items-center justify-center gap-2`}>
                                <div className={`relative top-0 left-0 h-[40px] w-[40px] ${index <= currentStep ? "bg-gradient-to-r from-[#4285F4] to-[#0055D9]" : "bg-[#C6C6C6] "} rounded-full flex flex-row items-center justify-center`}>
                                    {
                                        index >= currentStep && <div className={`top-0 left-0 h-[24px] w-[24px] ${index === currentStep ? "bg-main border-[4px] border-white" : index < currentStep ? "bg-main" : "bg-white"} rounded-full`} />

                                    }
                                    {
                                        index < currentStep && (
                                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clip-path="url(#clip0_3_11947)">
                                                    <path d="M6.50009 10.9186L4.18676 8.60522C3.92676 8.34522 3.50676 8.34522 3.24676 8.60522C2.98676 8.86522 2.98676 9.28522 3.24676 9.54522L6.03342 12.3319C6.29342 12.5919 6.71342 12.5919 6.97342 12.3319L14.0268 5.27855C14.2868 5.01855 14.2868 4.59855 14.0268 4.33855C13.7668 4.07855 13.3468 4.07855 13.0868 4.33855L6.50009 10.9186Z" fill="white" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_3_11947">
                                                        <rect width="16" height="16" fill="white" transform="translate(0.5 0.138672)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        )
                                    }
                                </div>
                                <span className="text-nowrap text-center text-[10px] sm:text-[12px] text-white">{step}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

{/*  */ }
