import { useEffect, useState } from "react";

const ToggleSwitch = ({
    defaultChecked = false,
    onChange,
    disabled = false,
    label,
    error,
    size = "default",
    colorTheme = "blue"
}: { error?: string, defaultChecked?: boolean, onChange?: (checked: boolean) => void, disabled?: boolean, label?: string, size?: "small" | "default" | "large", colorTheme?: "blue" | "green" | "purple" }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [isChecked, setIsChecked] = useState<any>(defaultChecked);

    useEffect(() => {
        setIsChecked(defaultChecked)
    }, [defaultChecked])
    const handleToggle = () => {
        if (!disabled) {
            const newState = !isChecked;
            setIsChecked(newState);
            onChange?.(newState);
        }
    };

    const sizeClasses = {
        small: "w-8 h-4",
        default: "w-12 h-6",
        large: "w-16 h-8"
    };

    const toggleSize = {
        small: "h-3 w-3",
        default: "h-5 w-5",
        large: "h-7 w-7"
    };

    const translateX = {
        small: isChecked ? "translate-x-4" : "translate-x-0",
        default: isChecked ? "translate-x-6" : "translate-x-0",
        large: isChecked ? "translate-x-8" : "translate-x-0"
    };

    const colorVariants = {
        blue: "bg-blue-600",
        green: "bg-green-600",
        purple: "bg-purple-600",
        red: "bg-red-600"
    };

    return (
        <div className="flex items-center gap-5">
            <div className="flex flex-row text-[#0E4E5D]">
                {label && (<label
                    id={label}
                    htmlFor={label}
                    className={`mb-[6px] text-[#0E4E5D] font-medium text-base flex flex-row items-center dark:text-shadow_blue `}
                >
                    {label && <span className="ms-2">{`${label}`}</span>}
                    <div className="ms-1"> : </div>
                </label>)}

            </div>
            <button
                id="toggle"
                onClick={handleToggle}
                disabled={disabled}
                className={`
                    ${sizeClasses[size]}
                    relative
                    rounded-full
                    transition-colors
                    duration-300
                    ease-in-out
                    focus:outline-none
                    focus:ring-2
                    focus:ring-offset-2
                    focus:ring-blue-500
                    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                    ${isChecked ? colorVariants[colorTheme] : "bg-gray-200"}
                `}
            >
                <span className="sr-only">{isChecked ? "On" : "Off"}</span>
                <div
                    className={`
                        ${toggleSize[size]}
                        ${translateX[size]}
                        bg-white
                        rounded-full
                        shadow-md
                        transform
                        transition-transform
                        duration-300
                        ease-in-out
                    `}
                />
            </button>
            {error && <span className="ps-3 pt-2  font-semibold text-[#F55157]">{error}</span>}
        </div >
    );
};

export default ToggleSwitch;