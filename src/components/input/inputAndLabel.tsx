import React, { useState } from 'react';
import { FaEyeSlash } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';

type InputAndLabelProps = {
    label?: string;
    error?: string;
    width?: string;
    placeholder?: string;
    icon?: React.ReactNode;
    see?: boolean;
    normalChange?: boolean;
    isLogin?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setData?: React.Dispatch<React.SetStateAction<any>>;
    type?: React.ComponentProps<'input'>['type'];
} & React.ComponentProps<'input'>;

export default function InputAndLabel({
    label,
    error,
    width = 'w-full',
    placeholder,
    icon,
    isLogin,
    setData,
    see = false,
    type,
    normalChange = false,
    ...props
}: InputAndLabelProps) {
    const [visible, setVisible] = useState(true);
    const [typeInput, setTypeInput] = useState(type);

    const handleVisible = () => {
        setTypeInput(typeInput === 'password' ? 'text' : 'password');
        setVisible(!visible);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-expressions
        setData && setData((prevData: any) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <div
            className={`flex flex-col relative font-semibold dark:text-white ${width}`}
        >
            <div className='flex flex-row'>
                <label
                    id={label}
                    htmlFor={label}
                    className={`text-[13.45px] ${isLogin ? "" : "mb-1"} text-[#84818A]`}
                >
                    {label}
                </label>
            </div>
            <div className='relative w-[100%]'>
                <input
                    title={label}
                    placeholder={placeholder}
                    id={label}
                    {...props}
                    onChange={!normalChange ? handleOnChange : props.onChange}
                    type={typeInput || type}
                    className={`${icon ? 'px-12' : ''
                        }
                        text-[12px]
                        bg-white
                        placeholder:text-[12px]
                        text-[#333] py-1  outline-none ${error ? 'border-red-500' : isLogin ? 'border-[#1f1f1f]' : 'border-gray-200'
                        } w-full h-[40px] px-2 ${isLogin ? "border-b-[1px]" : " border-[1px] rounded-md"}`}
                />
                {icon && (
                    <div
                        className={`absolute  left-2
                            } top-1/2 text-[#D6D6D6] transform mx-3 -translate-y-1/2 text-2xl`}
                    >
                        {icon}
                    </div>
                )}
                {see && (
                    <button
                        title='See Password'
                        type='button'
                        aria-label={`see ${label}`}
                        onClick={handleVisible}
                        className={`absolute z-50 right-3 ${error ? 'top-[22px]' : 'top-1/2'
                            } -translate-y-1/2 text-2xl`}
                    >
                        {visible ? (
                            <FaEyeSlash className='text-[#84818A]' />
                        ) : (
                            <IoEyeSharp className='text-[#84818A]' />
                        )}
                    </button>
                )}
                {error && <span className='text-red-500 text-sm font-normal'>{error}</span>}
            </div>
        </div>
    );
}
