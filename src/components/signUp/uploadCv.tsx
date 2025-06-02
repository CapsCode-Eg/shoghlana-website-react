import { useState, useRef, useEffect } from 'react';
import { File as FileIcon } from 'lucide-react';

export function DocumentUpload({ setFile, file }: {
    setFile?: (file: File) => void,
    file?: File | null
}) {
    const [fileName, setFileName] = useState<string | null>(null);
    const [, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (file) {
            console.log(file)
            setFileName(file.name);
        }
    }, [file]);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && validateFile(droppedFile)) {
            handleFileUpload(droppedFile);
        }
    };

    const validateFile = (file: File) => {
        const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!validTypes.includes(file.type)) {
            alert('Only PDF or Word documents are allowed');
            return false;
        }
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            alert('File size should be less than 10MB');
            return false;
        }
        return true;
    };

    const handleFileUpload = (file: File) => {
        setFileName(file.name);
        if (setFile) {
            setFile(file);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && validateFile(selectedFile)) {
            handleFileUpload(selectedFile);
        }
    };

    return (
        <div className="space-y-4 w-full hover:cursor-pointer">
            <div className='flex flex-row items-center gap-2'>
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="17.0721" cy="16.9725" r="16.2124" fill="white" stroke="#CBD0DC" strokeWidth="0.704885" />
                    <path d="M14.0052 21.9309H12.7082C10.7222 21.789 9.83057 20.2624 9.83057 18.9046C9.83057 17.5468 10.7222 16.0134 12.6745 15.8783C12.9514 15.8512 13.1946 16.0674 13.2149 16.3511C13.2351 16.6281 13.0258 16.8713 12.742 16.8915C11.4315 16.9861 10.8438 17.9723 10.8438 18.9113C10.8438 19.8503 11.4315 20.8365 12.742 20.9311H14.0052C14.2822 20.9311 14.5119 21.1608 14.5119 21.4377C14.5119 21.7147 14.2822 21.9309 14.0052 21.9309Z" fill="#292D32" />
                    <path d="M20.2265 21.9306C20.213 21.9306 20.2062 21.9306 20.1927 21.9306C19.9157 21.9306 19.6591 21.7009 19.6591 21.4239C19.6591 21.1335 19.8752 20.9173 20.1589 20.9173C20.9898 20.9173 21.7329 20.6268 22.3138 20.1067C23.3676 19.188 23.4352 17.864 23.1515 16.9318C22.8677 16.0063 22.0774 14.9458 20.6993 14.7769C20.4764 14.7499 20.3008 14.581 20.2602 14.3581C19.99 12.7368 19.1186 11.6155 17.7946 11.2102C16.4301 10.7846 14.8358 11.2034 13.8428 12.2437C12.8769 13.2502 12.6539 14.662 13.2146 16.2157C13.3092 16.4792 13.1741 16.7696 12.9107 16.8642C12.6472 16.9588 12.3567 16.8237 12.2622 16.5602C11.5799 14.6553 11.8906 12.8314 13.1133 11.5479C14.363 10.2374 16.3693 9.71727 18.0919 10.2442C19.6726 10.7305 20.7871 12.0343 21.1924 13.8447C22.5705 14.1554 23.6784 15.2025 24.1174 16.6481C24.5971 18.222 24.1647 19.8432 22.9826 20.87C22.2328 21.5455 21.2533 21.9306 20.2265 21.9306Z" fill="#292D32" />
                    <path d="M17.0722 23.9169C15.7144 23.9169 14.4445 23.1941 13.7487 22.0254C13.6744 21.9106 13.6001 21.7755 13.5393 21.6269C13.3096 21.1472 13.188 20.6001 13.188 20.0326C13.188 17.8913 14.9308 16.1484 17.0722 16.1484C19.2136 16.1484 20.9564 17.8913 20.9564 20.0326C20.9564 20.6068 20.8348 21.1472 20.5916 21.6471C20.5376 21.7755 20.4633 21.9106 20.3822 22.0389C19.7 23.1941 18.43 23.9169 17.0722 23.9169ZM17.0722 17.1617C15.4915 17.1617 14.2013 18.4519 14.2013 20.0326C14.2013 20.4515 14.2891 20.8433 14.458 21.2013C14.512 21.3161 14.5593 21.4107 14.6133 21.4985C15.1267 22.3699 16.0657 22.9036 17.0654 22.9036C18.0652 22.9036 19.0042 22.3699 19.5108 21.512C19.5716 21.4107 19.6257 21.3161 19.6662 21.2216C19.8486 20.85 19.9364 20.4582 19.9364 20.0394C19.9431 18.4519 18.6529 17.1617 17.0722 17.1617Z" fill="#292D32" />
                    <path d="M16.6869 21.208C16.5586 21.208 16.4302 21.1607 16.3289 21.0594L15.6601 20.3906C15.4642 20.1947 15.4642 19.8705 15.6601 19.6746C15.856 19.4787 16.1803 19.4787 16.3762 19.6746L16.7004 19.9988L17.7812 18.999C17.9906 18.8099 18.3081 18.8234 18.4973 19.0261C18.6864 19.2287 18.6729 19.553 18.4703 19.7421L17.0314 21.0729C16.9301 21.1607 16.8085 21.208 16.6869 21.208Z" fill="#292D32" />
                </svg>
                <div className='flex flex-col'>
                    <span className='font-medium text-[12px] text-[#292D32]'>Upload your CV</span>
                    <h3 className="font-medium text-[10px] text-[#A9ACB4]">Select and upload the files of your choice</h3>
                </div>
            </div>
            <div
                className="relative border-2 border-dashed bg-white w-full rounded-[8px] p-8 transition-colors border-[#CBD0DC]"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <input
                    title='Upload Document'
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf, .doc, .docx"
                    onChange={handleFileChange}
                />

                <div className="flex flex-col items-center justify-center space-y-2">
                    {fileName ? (
                        <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md shadow-sm">
                            <FileIcon className="w-6 h-6 text-blue-500" />
                            <span className="text-sm font-medium text-black">{fileName}</span>
                        </div>
                    ) : (
                        <FileIcon className="w-12 h-12 text-gray-400" />
                    )}
                    <div className="text-center">
                        <p className="text-sm font-[400] text-black mt-[8px]">Drag your document here or <span className='text-[#018AAF]'>browse</span></p>
                        <p className="text-xs text-gray-500 mt-[8px]">Only PDF or Word documents (Max 10MB)</p>
                    </div>
                </div>
            </div>
        </div>
    );
}