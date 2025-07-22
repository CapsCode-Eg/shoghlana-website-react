
import { useState, DragEvent, ChangeEvent } from 'react';
import { Upload, File, X, AlertCircle } from 'lucide-react';
import { Link } from 'react-router';

interface FileUploadProps {
    onFilesChange?: (files: File[]) => void;
    maxFileSize?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    oldFiles?: any;
    accept?: string;
    label?: string;
    multiple?: boolean;
    disabled?: boolean;
    error?: string
}

export function FileUpload({
    onFilesChange,
    oldFiles,
    maxFileSize = 20 * 1024 * 1024, // 20MB default
    accept,
    multiple = true,
    disabled = false,
    label,
    error,
}: FileUploadProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        const validFiles = droppedFiles.filter(file => file.size <= maxFileSize);

        if (!multiple && validFiles.length > 0) {
            const newFiles = [validFiles[0]];
            setFiles(newFiles);
            onFilesChange?.(newFiles);
        } else {
            setFiles(prev => {
                const newFiles = [...prev, ...validFiles];
                onFilesChange?.(newFiles);
                return newFiles;
            });
        }
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files)
                .filter(file => file.size <= maxFileSize);

            if (!multiple && selectedFiles.length > 0) {
                const newFiles = [selectedFiles[0]];
                setFiles(newFiles);
                onFilesChange?.(newFiles);
            } else {
                setFiles(prev => {
                    const newFiles = [...prev, ...selectedFiles];
                    onFilesChange?.(newFiles);
                    return newFiles;
                });
            }
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => {
            const newFiles = prev.filter((_, i) => i !== index);
            onFilesChange?.(newFiles);
            return newFiles;
        });
    };
    return (
        <div className="w-full space-y-4">
            <span className='mb-[6px] text-[#0E4E5D] font-medium text-base flex flex-row items-center dark:text-shadow_blue'>{label}</span>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
          border-2 border-dashed rounded-lg p-8
          flex flex-col items-center justify-center
          transition-colors duration-200
          ${isDragging
                        ? 'border-blue-500 bg-blue-50' : error
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-300 hover:border-gray-400'
                    }
        `}
            >
                <Upload className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600 text-center mb-1">
                    Drag and drop files here, or
                </p>
                <label className="cursor-pointer">
                    <span className=" text-main px-4 rounded-lg transition-colors">
                        Browse Files
                    </span>
                    <input
                        type="file"
                        disabled={disabled}
                        className="hidden"
                        onChange={handleFileInput}
                        multiple={multiple}
                        accept={accept}
                    />
                </label>
                <p className="text-sm text-gray-500 mt-2">
                    Max file size: {Math.round(maxFileSize / 1024 / 1024)}MB
                </p>
            </div>
            {(error) && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p className="text-sm">{error}</p>
                </div>
            )}
            {
                files.length === 0 && oldFiles && oldFiles[0] !== '' && oldFiles?.length > 0 &&
                (
                    <div className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg text-[#0E4E5D] font-semibold mb-3">Uploaded Files</h3>
                        <div className="space-y-2">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {oldFiles.map((file: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between bg-gray-50 p-3 rounded"
                                >
                                    <Link to={file} target="_blank" className="flex items-center space-x-3">
                                        <img src={file} className="w-10 h-10 rounded" alt="" />
                                        <span className="text-sm text-gray-700">Company Logo</span>
                                    </Link>
                                    <button
                                        title='Click'
                                        disabled={disabled}
                                        onClick={() => removeFile(index)}
                                        className="text-gray-500 hover:text-red-500 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
            {files.length > 0 && (
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-lg font-semibold mb-3">Uploaded Files</h3>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 p-3 rounded"
                            >
                                <div className="flex items-center space-x-3">
                                    <File className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-700">{file.name}</span>
                                </div>
                                <button
                                    title='Click'
                                    type='button'
                                    disabled={disabled}
                                    onClick={() => removeFile(index)}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}