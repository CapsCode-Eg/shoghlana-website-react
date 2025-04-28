/* eslint-disable @typescript-eslint/no-unused-vars */
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';
import './style.css';
export default function InputPhone({
    width,
    error,
    inWidth,
    label,
    placeholder,
    inContact = false,
    ...props
}: {
    width: string;
    inWidth: string;
    placeholder?: string;
    label: string;
    error: string;
    inContact?: boolean
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
} & React.ComponentProps<any>) {
    return (
        <>
            <div className={`flex ${width} flex-col relative font-medium`}>
                <div className='flex flex-row w-fit'>
                    <label
                        htmlFor='phone'
                        className={`text-[13.45px] text-[#84818A]`}
                    >
                        {label}
                    </label>
                </div>
                <div className='relative'>
                    <PhoneInput
                        className={`
                        ${error ? 'border-[#E11A0B] bg-[#E11A0B]/[14%]' : inContact ? "border-transparent !bg-[#F5F5F5]" : 'border- !bg-white'}
                        dark:text-white

                        ps-1
                        mt-0.5                     
                        rounded-[8px] border-[1px]
                        h-[42px] input-phone-number
                        w-[100%] align-middle items-center
                        border-textColor
                        `}
                        placeholder={placeholder}
                        countrySelectorStyleProps={{
                            required: true,
                            className: 'dark:!text-white',
                        }}
                        dialCodePreviewStyleProps={{
                            required: true,
                            className: '!bg-#0D0D0D',
                        }}
                        inputProps={{
                            required: true,
                            className:
                                `bg-opacity-50 text-gray-950 block border-transparent border-gray-700 h-[42px] w-[100%] ps-3 shadow-sm focus:border-0 focus:ring focus:ring-gray-200 !bg-transparent`,
                        }}
                        defaultCountry="tr"
                        {...props}
                    />
                    {error && <div className='!text-sm mt-1  text-red-500 w-full'>{error}</div>}
                </div>
            </div>
        </>
    );
}
