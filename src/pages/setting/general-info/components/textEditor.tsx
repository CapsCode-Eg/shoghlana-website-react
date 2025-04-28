import { useEffect, useState } from 'react';


interface TextEditorProps {
    value?: string;
    disabled?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange: (content: any) => void;
    error?: string;
    label?: string;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, onChange, error = false, label }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className='h-fit'>
            {label && (
                <h1 className='text-[16px] text-[#0E4E5D] font-medium mb-[7px]'>
                    {label} :
                </h1>
            )}
            <div
                className={`w-full h-[15vh] rtl rounded-lg overflow-hidden`}
            >
                <textarea className={`p-3 rounded-lg resize-none w-full h-[15vh]  ${error ? 'border-2 border-red-500' : 'border border-gray-300'
                    }`} title='New Text' value={value} onChange={onChange} name="" id=""></textarea>
            </div>
            {error && <span className='text-md text-red-500 font-bold end-3'>{error}</span>}
        </div>
    );
};

export default TextEditor;
